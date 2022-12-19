import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpFront from './httpFront';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] =useState(false);
    const [errormessage, getError] = useState(null);
    const navigate = useNavigate();

    const LogInUser = async () => {
       
        try{
            const Auth = await httpFront.post('http://localhost:5000/login',{   
            email,
            password,
        });
        if(Auth.status === 200){
            getError(null);
            setSuccess(true);
            setTimeout(() => {
            navigate("/payment");
              }, 3 * 1000);    
        }
        }catch(error: any){
            console.log(error.response.status);
            if (error.response.status === 401){
                getError(error.response.data.error);
            }else if(error.response.status === 409){
                getError(error.response.data.error);
            }
        };           
   };
    return   (
        <div className='container mx-auto my-4'>
            <h1 className="text-xl">Login Your Account.</h1>
            <div className='flex justify-center m-10'>
            <form className='w-full max-w-sm '>
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>Email</label>
                </div>
                <div className="md:w-2/3">
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email"
    
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
                    id="password" 
                    
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    />
                </div>
                </div>
                <div className="items-center">
                
        {success === true ? (
            <div className='md:items-center border-green-700 bg-green-200'>
                <p className='text-green-600 px-2.5 py-5'>Your successed This Account!</p>
            </div>
        ):(
            <div className='hidden'>
            </div>
        )}
        {errormessage != null ? (
            <div className='md:items-center border-red-700 bg-red-200'>
                <p className='text-red-600 px-2.5 py-5'>{errormessage}</p>
            </div>
        ):(
            <div className='hidden'>
            </div>
        )}
                </div>
                <div className="md:items-center">
                <button type="button" onClick={() => LogInUser()} className="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2 m-4">Submit</button>

                </div>
                
            </form>
            
        </div>
        
    </div>
    )
}

export default Login;