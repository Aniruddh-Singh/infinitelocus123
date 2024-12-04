import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const password = useRef(null);
    const name = useRef(null);
    const email = useRef(null);
    const [errMessage, setErrMessage] = useState(null);
    const [isSignForm, setIsSignForm] = useState(true);
    const navigate = useNavigate();

    const toggleSignForm = () => {
        setIsSignForm(!isSignForm);
    };

    const handleButton = async () => {
        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;
        const nameValue = name.current?.value;

        if (!emailValue || !passwordValue || (!isSignForm && !nameValue)) {
            setErrMessage("All fields must be filled.");
            return;
        }

        try {
            if (isSignForm) {
                console.log("email:",emailValue)
                console.log("password:",passwordValue)
                const res = await axios.post("http://localhost:8000/api/v1/users/login", {
                    email: emailValue,
                    password: passwordValue,
                  });
                  const user = {
                    email: emailValue,
                    fullName: nameValue,
                  };
                  console.log("values after signin",res)
            } else {
                console.log("email:",emailValue)
                console.log("password:",passwordValue)
                const res = await axios.post("http://localhost:8000/api/v1/users/register", {
                    email: emailValue,
                    password: passwordValue,
                    fullName: nameValue,
                  });
                  const user = {
                    email: emailValue,
                    fullName: nameValue,
                  };
                  console.log("values after registration",res)
            }

            navigate("/main");
        } catch (error) {
            setErrMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <div className="p-12 bg-black w-[90%] md:w-3/12 my-36 mx-auto text-white right-0 left-0 rounded-lg bg-opacity-80">
                <h1 className="font-900 text-4xl py-4">
                    {isSignForm ? "Sign in" : "Sign up"}
                </h1>

                {!isSignForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Name"
                        className="p-3 my-4 w-full bg-gray-800 rounded-lg"
                    />
                )}
                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="p-3 my-4 w-full bg-gray-800 rounded-lg"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-3 my-4 w-full bg-gray-800 rounded-lg"
                />
                <p className="text-red-500">{errMessage}</p>
                <button
                    className="bg-red-700 p-3 my-6 w-full rounded-lg"
                    onClick={handleButton}
                >
                    {isSignForm ? "Sign in" : "Sign up"}
                </button>
                <p className="cursor-pointer" onClick={toggleSignForm}>
                    {isSignForm ? "New to Infinite Locus? Sign up now" : "Already a registered user? Sign in now"}
                </p>
            </div>
        </div>
    );
};

export default Login;
