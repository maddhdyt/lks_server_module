import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Container from '../components/Container';
import Form from '../components/Form';
import Fab from '../components/Fab';

function CreatePoll() {
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
                <Header>Create New Poll</Header>
                <Form>
                    <div className="flex flex-col gap-2">
                        <Form.Item label="Title">
                            <Form.Input></Form.Input>
                        </Form.Item>
                        <Form.Item label="Description">
                            <Form.Textarea></Form.Textarea>
                        </Form.Item>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Form.Item label="Option 1">
                            <Form.Input></Form.Input>
                        </Form.Item>
                        <Form.Item label="Option 2">
                            <Form.Input></Form.Input>
                        </Form.Item>
                        <div className="flex justify-end mt-2">
                            <button className="w-fit relative right-0 px-3 py-2 text-sm text-white rounded-md bg-blue-700 flex items-center gap-1">
                                Add Option
                            </button>
                        </div>
                    </div>
                </Form>
                <Fab text="Post Polling" name="send" />
            </Container>
        </>
    );
}
export default CreatePoll;
