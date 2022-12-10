import React, { useState } from 'react';
import httpFront from './httpFront';

const Register : React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const NewUser = async () => {
        console.log(email, password);
        try{
            const Auth = await httpFront.post('http://logalhost:5000/register',{
            email,
            password,
        });
        if(Auth.status === 200){
            window.location.href= '/';
        }
        }catch(error: any){
            console.log(error.response.status);
        };           
   };

    return   (
        <div className='container mx-auto my-4'>
            <h1 className="text-xl">Sign Up Your Account.</h1>
            <div className='flex justify-center m-10'>
            <form className='w-full max-w-sm '>
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>Email</label>
                </div>
                <div className="md:w-2/3">
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="" 
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    />
                </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>Password</label>
                </div>
                <div className="md:w-2/3">
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="" 
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    />
                </div>
                </div>
                <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                <button type="button" onClick={() => NewUser()} className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 m-4">Submit</button>
                </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Register;