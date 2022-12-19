import Forms from './Forms';
import IncomExpense from './IncomeExpense';
import { Payments } from '../typets';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import httpFront from './httpFront';
import Upload from './Upload';
 

export const Payment: React.FC = () => {
    const [data, getData] = useState<Payments[]>([]);
    const [show, setShow] = useState<string | null>(null);
    const location = useLocation();
    
    const navigate = useNavigate();
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            await httpFront.get('http://localhost:5000/payment'
            ).then((response) => {
                const data = response.data;
                getData(data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const openModal = () => {
        setShow(show);
        navigate("/payment/:id");
    }
    const LogoutUser =async () => {
        await httpFront.post("http://localhost:5000/logout");
        navigate('/');
    }
    
    return   (
        <main className='container mx-auto my-4'>
        <h1 className="text-3xl">Current Balance</h1>
        <IncomExpense />
        <Forms />
        <Upload />   
        <section className="m-10">
        <h3 className="text-3xl block">Payments List</h3>
            <table className="table table-auto table-bordered mx-auto">

                <thead>
                    <tr>
                        <th className='border px-4 py-2'>Earning</th>
                        <th className='border px-4 py-2'>Time</th>
                        <th className='border px-4 py-2'>Cash</th>
                        <th className='border px-4 py-2'>item</th>
                        <th className='border px-4 py-2'>Delete</th>
                        <th className='border px-4 py-2'>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((index, value) => (
                        <tr key={value}>
                            <td className='border px-4 py-2'> {index.earning} </td>
                            <td className='border px-4 py-2'> {index.time}</td>
                            <td className='border px-4 py-2'> {index.cash.toLocaleString()}</td>
                            <td className='border px-4 py-2'> {index.item}</td>
                            <td className='border px-4 py-2'>
                            <Link to={`/payment/delete/${index.id}`} state={{ background : location }} >
                                <button
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                
                                </Link>
                                <Outlet />
                            </td>
                            <td className='border px-4 py-2'>
                            <Link to={`/payment/update/${index.id}`} state={{ background : location }} >
                            <button
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Update
                            </button>
                            </Link>
                            <Outlet />   
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={LogoutUser} className="bg-red-400 hover:bg-red-300 text-white rounded px-4 py-2 m-4">Logout</button>
        </section>
        </main>

    )
};


export default Payment;

