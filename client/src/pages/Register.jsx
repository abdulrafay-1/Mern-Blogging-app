import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { instance } from "../utils/axiosIstance";

const Register = () => {
    const [loading, setLoading] = useState(false)

    const email = useRef()
    const name = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await instance.post(`user`, {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            })
            console.log(data)
            toast.success('Register Successfull !', {
                autoClose: 2500,
                pauseOnHover: false,
                pauseOnFocusLoss: false
            })
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <ToastContainer />
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center">
                    <div className="text-blue-600 text-4xl font-bold">
                        <span>🌊</span> {/* Add a logo or icon */}
                    </div>
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Create your account
                </h2>
                <form className="mt-8 space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            ref={name}
                            minLength={3}
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            ref={email}
                            pattern='[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}'
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            ref={password}
                            minLength={6}
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 disabled:opacity-75 focus:ring-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
