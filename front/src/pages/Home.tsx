import httpFront from "./httpFront";
import { User } from "../typets"
import headerImg from "../img/header.jpg";
import React, { useState, useEffect } from 'react';
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const [ user, setUser ] = useState<User | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
        try {
            const Auth = await httpFront.get("http://localhost:5000/");
            setUser(Auth.data);
            navigate('/payment');
            
            }catch(error){
                console.log("Not Authenticated");
            }
        })();
    });

    const LogoutUser =async () => {
        await httpFront.post("http://localhost:5000/logout");
        navigate('/');
    }

    return   (
        <div className="conteiner">
            {user != null ? (
                <div className="w-full bg-white">
                <h2 className="text-3xl">Please wait a moment.</h2>
                <button onClick={LogoutUser} className="bg-red-400 hover:bg-red-300 text-white rounded px-4 py-2 m-4">Logout</button>
                </div>
            ) :(
                <div className="bg-[#212f7a]">
                <div className="w-full flex justify-center">
                
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/2">
                <h1 className="text-4xl text-white font-bold">Welcome HouseKeeping App.</h1>
                <h2 className="text-2xl text-white">Useful items for a better household life</h2>
                <p className="w-[32rem] text-gray-200 text-xl mx-12 my-5 text-left">This is an app I created for a CS50 assignment for a course offered at Harvard University.
It allows for easy income/expense management, viewing, updating, and deleting of income/expense history, and uploading of data in csv files tailored to this app.</p>
                <a href="/login"><button className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 w-24 m-4 text-bold">Sign In</button></a>
                <a href="register"><button className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 w-24 m-4 text-bold">Sing Up</button></a>
                </div>
                <div className="md:w-1/2">
                <img src={headerImg} alt="header-image"/>
                </div>
                </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default LandingPage;