import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');

    //Validation
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    });

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', PasswordConfirmation);

        await axios
            .post('http://127.0.0.1:8000/api/auth/register', formData)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.log(error.response.data);
                setValidation(error.response.data);
            });
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-slate-800  to-slate-500 p-4 flex items-center justify-center">
            <div className="bg-white py-6 px-10 sm:max-w-md w-full rounded-md">
                <div className="sm:text-3xl text-2xl text-center text-slate-900 font-bold mb-8">
                    Register
                </div>
                <form
                    onSubmit={registerHandler}
                    className="flex flex-col gap-3"
                >
                    <div>
                        <input
                            name="name"
                            type="text"
                            className="focus:outline-none border w-full p-3 rounded-md border-slate-400 placeholder-gray-500"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {validation.name && (
                            <small className="text-red-800">
                                {validation.name[0]}
                            </small>
                        )}
                    </div>

                    <div>
                        <input
                            name="username"
                            type="text"
                            className="focus:outline-none border w-full p-3 rounded-md border-slate-400 placeholder-gray-500"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {validation.username && (
                            <small className="text-red-800">
                                {validation.username[0]}
                            </small>
                        )}
                    </div>

                    <div>
                        <input
                            name="email"
                            type="text"
                            className="focus:outline-none border w-full p-3 rounded-md border-slate-400 placeholder-gray-500"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {validation.email && (
                        <small className="text-red-800">
                            {validation.email[0]}
                        </small>
                    )}
                    <div>
                        <input
                            name="password"
                            type="password"
                            className="focus:outline-none border w-full p-3 rounded-md border-slate-400 placeholder-gray-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {validation.password && (
                        <small className="text-red-800">
                            {validation.password[0]}
                        </small>
                    )}
                    <div>
                        <input
                            name="password_confirmation"
                            type="password"
                            className="focus:outline-none border w-full p-3 rounded-md border-slate-400 placeholder-gray-500"
                            placeholder="Password Confirmation"
                            id="password_confirmation"
                            value={PasswordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />
                    </div>
                    <div className="flex justify-center my-6">
                        <button
                            type="submit"
                            className="rounded-md p-3 w-full  bg-gradient-to-r from-slate-500  to-slate-800 text-white text-md font-semibold"
                        >
                            Create Account
                        </button>
                    </div>
                    <div className="flex justify-center ">
                        <p className="text-gray-500">
                            Already have an acount?{' '}
                        </p>
                        <a href="/login" className="text-sky-600 pl-2">
                            {' '}
                            Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;
