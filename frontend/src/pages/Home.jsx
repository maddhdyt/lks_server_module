import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { If, Then } from 'react-if';
import Navbar from '../components/Navbar';

function Home() {
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

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

    if (user.role == 1) {
        navigate('/dashboard');
    }

    return (
        <>
            <Navbar>
                {/* <Navbar.Button onClick={logoutHandler}>Logout</Navbar.Button> */}
                <Navbar.Title>YukPilih</Navbar.Title>
                <div className="flex items-center gap-10">
                    <Navbar.Menu>
                        <Navbar.Item
                            text="Home"
                            className="nav-active"
                        ></Navbar.Item>
                        <Navbar.Item text="Poll List"></Navbar.Item>
                        <Navbar.Item text="Poll History"></Navbar.Item>
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
            
        </>
    );
}
export default Home;
