import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../context/userContext';
import { instance } from '../utils/axiosIstance';

const Login = () => {
    const [loading, setLoading] = useState(false)

    const { setUser } = useUser()

    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}loginuser`, {
                email: email.current.value,
                password: password.current.value
            },
                // can pass headers here
            )
            setUser({ ...data.user })
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("authTokens", JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }))
            toast.success('Login Successfull !', {
                autoClose: 2500,
                pauseOnHover: false,
                pauseOnFocusLoss: false
            })
            setTimeout(() => {
                navigate("/")
            }, 1000)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, {
                autoClose: 2500,
                pauseOnHover: false,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <ToastContainer />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className='text-gray-500 text-sm md:text-base text-center'>welcome to blogging app  📝</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={email}
                                    type="email"
                                    pattern='[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}'
                                    required
                                    // autoComplete="off"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    ref={password}
                                    type="password"
                                    required
                                    minLength="6"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center disabled:opacity-75 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div></div>
    )
}

export default Login