import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../context/userContext";
import useLogout from "../hooks/logoutUser";

const Navbar = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const logout = useLogout();
    const navigate = useNavigate();


    return (
        <div className="flex items-center text-white bg-blue-600 font-medium  justify-between bg-primary py-3">
            <Link to="/">
                <h2 className="md:text-2xl text-lg ml-2">Personal Blogging App</h2>
            </Link>
            <div className="flex items-center gap-1 mr-1">
                {user ? (
                    <>
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="dropdown-toggle"
                                className="hidden peer"
                                checked={isOpen}
                                readOnly
                            />

                            <label
                                htmlFor="dropdown-toggle"
                                className=" text-white text-center rounded-lg cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <img src="/dropdown.svg" width="20px" height="20px" alt="" />
                            </label>

                            <div className="absolute w-28 -left-5 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg hidden peer-checked:block">
                                <Link
                                    to="/"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Add Blog
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                        <p className=" md:block hidden md:text-sm  uppercase">
                            {`Welcome ${user.name.toUpperCase()} !`}
                        </p>

                        <button
                            onClick={logout}
                            className="hover:cursor-pointer text-sm md:text-base border px-3 py-1 rounded-md"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to={"/login"}>
                        <p className="hover:cursor-pointer border px-3 py-1 rounded-md">
                            Login
                        </p>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
