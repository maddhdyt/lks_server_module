import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Validation
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    });

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);

        await axios
            .post('http://127.0.0.1:8000/api/auth/login', formData)
            .then((response) => {
                console.log(response.data.access_token);
                localStorage.setItem('token', response.data.access_token);
                navigate('/home');
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
                    Login
                </div>
                <form onSubmit={loginHandler} className="flex flex-col gap-3">
                    {validation.error && (
                        <div className="border border-red-700 px-4 py-3 rounded-lg  w-full bg-red-200">
                            <small className="text-red-800">
                                {validation.error}
                            </small>
                        </div>
                    )}
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

                    <div className="flex justify-center my-6">
                        <button
                            type="submit"
                            className="rounded-md p-3 w-full  bg-gradient-to-r from-slate-500  to-slate-800 text-white text-md font-semibold"
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="flex justify-center ">
                        <p className="text-gray-500">
                            Dont have an acount yet?{' '}
                        </p>
                        <a href="/login" className="text-sky-600 pl-2">
                            {' '}
                            Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;
