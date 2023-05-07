import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
    const [user, setUser] = useState({});

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

    // const logoutHandler = async () => {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     await axios.post('http://127.0.0.1:8000/api/auth/logout').then(() => {
    //         localStorage.removeItem('token');

    //         navigate('/login');
    //     });
    // };

    if (user.role == 0) {
        navigate('/home');
    }
    return (
        <>
            <Navbar>
                {/* <Navbar.Button onClick={logoutHandler}>Logout</Navbar.Button> */}
                <Navbar.Title>YukPilih | Dashboard</Navbar.Title>
                <div className="flex items-center gap-10">
                    <Navbar.Menu>
                        <Navbar.Item
                            text="Home"
                            className="nav-active"
                        ></Navbar.Item>
                        <Navbar.Item text="Poll List"></Navbar.Item>
                    </Navbar.Menu>
                    <Navbar.Control></Navbar.Control>
                </div>
            </Navbar>
            <div className="w-full flex justify-center items-center">
                <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mt-64">
                    <div>
                        <h2 className="text-gray-800 text-3xl font-semibold">
                            Hello {user.name}
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae dolores deserunt ea doloremque natus
                            error, rerum quas odio quaerat nam ex commodi hic,
                            suscipit in a veritatis pariatur minus consequuntur!
                        </p>
                    </div>
                    <div className="flex justify-end mt-4"></div>
                </div>
            </div>
        </>
    );
}
export default Dashboard;
