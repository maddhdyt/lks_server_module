import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Container from '../components/Container';
import PollCard from '../components/PollCard';

function PollList() {
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
                <Navbar.Title>YukPilih</Navbar.Title>
                <div className="flex items-center gap-10">
                    <Navbar.Menu>
                        <Navbar.Item
                            href="/dashboard"
                            text="Dashboard"
                        ></Navbar.Item>
                        <Navbar.Item
                            href="/poll"
                            text="Poll List"
                            className="nav-active"
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
                <Header>Poll List</Header>
                <div className="mt-10 grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                    <PollCard title="Polling Title 1" deadline="23-09-2023" />
                    <PollCard title="Polling Title 2" deadline="23-09-2023" />
                    <PollCard title="Polling Title 3" deadline="23-09-2023" />
                    <PollCard title="Polling Title 4" deadline="23-09-2023" />
                    <PollCard title="Polling Title 5" deadline="23-09-2023" />
                    <PollCard title="Polling Title 6" deadline="23-09-2023" />
                </div>
            </Container>
        </>
    );
}
export default PollList;
