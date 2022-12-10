import httpFront from "./httpFront";
import { User } from "../typets"
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
        <div>
            <h1 className="text-xl">Welcome React Application.</h1>
            {user != null ? (
                <div>
                <h2>logged in</h2>
                <h3>ID: { user.id }</h3>
                <h3>Email: { user.email }</h3>
                <button onClick={LogoutUser} className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 m-4">Logout</button>
                </div>
            ) :(
                <div>
                <h2>You are not logged in</h2>
                <div>
                <a href="/login"><button className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 w-24 m-4">login</button></a>
                <a href="register"><button className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 w-24 m-4">register</button></a>
                </div>
                </div>
            )}
        </div>
    )
}

export default LandingPage;