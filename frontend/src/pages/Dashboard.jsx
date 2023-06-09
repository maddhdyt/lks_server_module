import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Container from '../components/Container';
import Card from '../components/Card';
import Fab from '../components/Fab';

function Dashboard() {
    const [user, setUser] = useState({});
    const [openProfile, setOpenProfile] = useState(false);

    const navigate = useNavigate();

    //token
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios
            .post('http://127.0.0.1:8000/api/auth/me')
            .then((responses) => {
                setUser(responses.data);
            });
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        fetchData();
    }, []);

    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post('http://127.0.0.1:8000/api/auth/logout').then(() => {
            localStorage.removeItem('token');

            navigate('/login');
        });
    };

    if (user.role == 0) {
        navigate('/home');
    }

    // Show

    return (
        <>
            <Navbar>
                {/* <Navbar.Button onClick={logoutHandler}>Logout</Navbar.Button> */}
                <Navbar.Title>YukPilih</Navbar.Title>
                <div className="flex items-center gap-10">
                    <Navbar.Menu>
                        <Navbar.Item
                            text="Dashboard"
                            className="nav-active"
                        ></Navbar.Item>
                        <Navbar.Item
                            href="/poll"
                            text="Poll List"
                        ></Navbar.Item>
                    </Navbar.Menu>
                    <Navbar.Control
                        onClick={() => setOpenProfile((prev) => !prev)}
                    >
                        {openProfile && (
                            <Navbar.Dropdown
                                onClick={logoutHandler}
                            ></Navbar.Dropdown>
                        )}
                    </Navbar.Control>
                </div>
            </Navbar>
            <Container>
                <Header>Dashboard</Header>
                <div className="grid grid-cols-3 gap-3 mt-10">
                    <Card title="Total Polling" count="60" />
                    <Card title="Berlangsung" count="60" />
                    <Card title="Selesai" count="60" />
                </div>
                <Fab href="/create-poll" text="Create New Poll" name="plus" />
            </Container>
        </>
    );
}
export default Dashboard;
