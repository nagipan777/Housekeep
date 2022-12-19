import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpFront from './httpFront';

const Forms: React.FC = () => {
    const [addrtype, _] = useState(["","income", "expense"])
    const [earning, setEarning] = useState<string>("");
    const [item, setItem] = useState<string>("");
    const [cash, setCash] = useState("");
    const [time, setTime] = useState("");


    const Add = addrtype.map(Add => Add)
    const handleAddrTypeChange = (e: any) => setEarning((addrtype[e.target.value]))
    const InsertPayment = async () => {
        console.log(earning,time, item, cash);
        try{
            const Auth = await httpFront.post('http://localhost:5000/payment',{   
            earning,
            time,
            item,
            cash
        });
        if(Auth.status === 200){
           window.location.href = '/payment';
        }
        }catch(error: any){
            console.log(error.response.status);
            if (error.response.status === 401){
                alert("Invalid Credential");
            }
        };           
   };

    return   (
        <div className='w-full justify-center m-5'>
        <h2 className="text-xl block m-3">Input your Payment.</h2>
        <div className='flex justify-center'> 
            <form className='w-full max-w-sm'>
            <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>Earning</label>
                </div>
                <div className="md:w-2/3">
                <select
                onChange={e => handleAddrTypeChange(e)} 
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                >
                 {
                    Add.map((address, key) => <option value={key} >
                    {address}
                    </option>)
                }
                </select>
                </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>Time</label>
                </div>
                <div className="md:w-2/3">
                <input 
                    type="date" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    id="" 
                    min="2017-04-01T00:00" max="2017-12-31T23:59"
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    />
                </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>cash</label>
                </div>
                <div className="md:w-2/3">
                <input 
                    type="number" 
                    value={cash} 
                    onChange={(e) => setCash(e.target.value)} 
                    id="" 
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    />
                </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                <div className="md:w-1/3">
                <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name'>Item</label>
                </div>
                <div className="md:w-2/3">
                <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => setItem(e.target.value)} 
                    id="" 
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    />
                </div>
                </div>
                <div className="md:flex md:items-center justify-center">
                <button type="button" onClick={() => InsertPayment()} 
                className="bg-gray-600 hover:bg-gray-400 text-white rounded px-4 py-2 m-4">Submit</button>
                </div>
            </form>
        </div>
        </div>
    );
};
export default Forms;