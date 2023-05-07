import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { If, Then } from 'react-if';
import Navbar from '../components/Navbar';

function Home() {
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
            <Navbar />
            <div className="w-full h-screen flex justify-center items-center">
                <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg">
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
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={logoutHandler}
                            className="text-xl font-medium text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;
