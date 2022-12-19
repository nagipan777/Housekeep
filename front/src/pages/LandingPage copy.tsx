import httpFront from "./httpFront";
import { User } from "../typets"
import headerImg from "../img/header.jpg";
import React, { useState, useEffect } from 'react';


const LandingPage: React.FC = () => {
    const [ user, setUser ] = useState<User | null>(null);
    useEffect(() => {
        (async () => {
        try {
            const Auth = await httpFront.get("http://localhost:5000/@me");
            setUser(Auth.data);
            }catch(error){
                console.log("Not Authenticated");
            }
        })();
    });

    const LogoutUser =async () => {
        await httpFront.post("http://localhost:5000/logout");
        window.location.href= '/';
    }

    return   (
        <div className="conteiner bg-[#212f7a]">
            {user != null ? (
                <div className="w-full">
                <h2>logged in</h2>
                <h3>ID: { user.id }</h3>
                <h3>Email: { user.email }</h3>
                <button onClick={LogoutUser} className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 m-4">Logout</button>
                </div>
            ) :(
                <div className="w-full flex justify-center">
                
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/2">
                <h1 className="text-4xl text-white font-bold">Welcome HouseKeeping App.</h1>
                <h2 className="text-2xl text-white">Useful items for a better household life</h2>
                <p className="w-[32rem] text-gray-200 text-xl mx-12 my-5 text-left">This is an app I created for a CS50 assignment for a course offered at Harvard University.
It allows for easy income/expense management, viewing, updating, and deleting of income/expense history, and uploading of data in csv files tailored to this app.</p>
                <a href="/login"><button className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 w-24 m-4">login</button></a>
                <a href="register"><button className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 w-24 m-4">register</button></a>
                </div>
                <div className="md:w-1/2">
                <img src={headerImg}/>
                </div>
                </div>
                </div>
            )}
        </div>
    )
}

export default LandingPage;