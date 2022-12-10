import Forms from './Forms';
import IncomExpense from './IncomeExpense';
import { useNavigate } from 'react-router-dom';
import { Payments } from '../typets';
import React, { useState, useEffect } from 'react';
import httpFront from './httpFront';
import Modal from 'react-modal';
import Modal2 from 'react-modal';
 

export const Payment: React.FC = () => {
    const [data, getData] = useState<Payments[]>([]);
    const [show, setShow] = useState<String>("");
    const [editUser, setEditUser] = useState("");
    const [earning, setEarning] = useState<string>("");
    const [item, setItem] = useState<string>("");
    const [cash, setCash] = useState("");
    const [time, setTime] = useState("");

    const navigate = useNavigate()
    
    
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
    const openModle = (name: string) => setShow(name);
    
    const closeModle = () => setShow("");

    const updateAction = async (id: string) => {
        try{
            await httpFront.put('http://localhost:5000/payment/'+ id, {
                earning,
                time,
                item,
                cash
        }).then((response) => {
            const data = response.data;
            getData(data);
            console.log('earning => ' + JSON.stringify(data.earning));
            console.log('time => ' + JSON.stringify(data.time));
            console.log('cash => ' + JSON.stringify(data.cash));
            console.log('item => ' + JSON.stringify(data.item));
            console.log('status');
            window.location.href= '/payment';

        })}catch(error) {
            console.log(error);
          };
        }

    const deleteAction = async (id: string) => {
        try{
            await httpFront.delete('http://localhost:5000/payment/'+ id,
        ).then((response) => {
            const data = response.data;
            getData(data);
            window.location.href= '/payment';

        })}catch(error) {
            console.log(error);
          };
        }

    return   (
        <main className='container mx-auto my-4'>
        <h1 className="text-xl">Current Balance</h1>
        <IncomExpense />
        <Forms />    
        <section className="flex justify-center m-10">
            <table className="table able-auto table-bordered">

                <thead>
                    <tr>
                        <th className='border px-4 py-2'>ID</th>
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
                            <td className='border px-4 py-2'>{index.id}</td>
                            <td className='border px-4 py-2'> {index.earning} </td>
                            <td className='border px-4 py-2'> {index.time}</td>
                            <td className='border px-4 py-2'> {index.cash.toLocaleString()}</td>
                            <td className='border px-4 py-2'> {index.item}</td>
                            <td className='border px-4 py-2'>
                                {/*<Modal show={show} setShow={setShow} />*/}
                                <button
                                    key={index.id}
                                    onClick={() => openModle("0")}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <Modal
                                isOpen={(show === "0")}
                                onRequestClose={(closeModle)}
                                ariaHideApp={false}
                                shouldCloseOnEsc={true}
                                shouldCloseOnOverlayClick={true}
                                className="Modal"
                                overlayClassName="Overlay"
                                id={index.id}
                                >
                                <div id="overlay" onClick={closeModle}>
                                <div className="container mx-auto px-5 pb-5 bg-white m-10" id="modalcontent" onClick={(e) => e.stopPropagation()}>
                                <h3 className="">Do you really want to delete?</h3>
                                <p>Once deleted, it cannot be restored. Please check the impact on already registered users and operate with caution.</p>
                                <div className="md:flex md:items-center">
                                <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => deleteAction(index.id)}>
                                Delete
                                </button>
                                <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={closeModle}>
                                not Delete
                                </button>
                                </div>
                                </div>
                                </div>
                                </Modal> 
                                </td>
                                <td className='border px-4 py-2'>                   
                                <button
                                    key={index.id}
                                    onClick={() => openModle("1")}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Update
                                </button>
                                <Modal2
                                isOpen={(show === "1")}
                                onRequestClose={closeModle}
                                ariaHideApp={false}
                                id={index.id}
                                className="Modal"
                                overlayClassName="Overlay"
                                >
                                <div id="overlay" onClick={closeModle}>
                                <div className="container mx-auto px-10 pb-10 bg-white m-10" id="modalcontent" onClick={(e) => e.stopPropagation()}>
                                <form className='w-full max-w-sm'>
                                
                                <div className='block'>
                                <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>Earning</label>
                                <input 
                                    type="text" 
                                    placeholder={index.earning}
                                    value={earning} 
                                    onChange={(e) => setEarning(e.target.value)} 
                                    id="" 
                                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                />
                                </div>
                                <div className='block'>
                                <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>Time</label>
                                <input 
                                    type="date"
                                    placeholder={index.time} 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    id="" 
                                    min="2017-04-01T00:00" max="2025-12-31T23:59"
                                    className='number bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                    />
                               </div>
                               <div className='block'>
                                <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>cash</label>
                                    <input 
                                    type="number" 
                                    value={cash} 
                                    onChange={(e) => setCash(e.target.value)} 
                                    id="" 
                                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                    />
                                    </div>
                                    <div className='block'>
                                <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>Item</label>
                                        <input 
                                        type="text" 
                                        placeholder={index.item}
                                        value={item} 
                                        onChange={(e) => setItem(e.target.value)} 
                                        id="" 
                                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                        />
                                    </div>
                                    <div className="md:flex md:items-center">
                                    <div className="md:w-1/2">
                                    <button type="button" onClick={() => updateAction(index.id)} className="bg-green-400 hover:bg-green-300 text-white rounded px-4 py-2 m-4">
                                        Updated
                                    </button>
                                    </div>
                                    <div className="md:w-1/2">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={closeModle}>
                                    not Update 
                                    </button>
                                    </div>
                                    </div>
                                    </form>
                                </div>
                                </div>
                                </Modal2>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
        </main>

    )
};


export default Payment;

