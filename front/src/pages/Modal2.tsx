import { stringify } from "querystring";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Payments } from '../typets';
import httpFront from './httpFront';


const Modal: React.FC = () => {
  const [data, getData] = useState<Payments>();
  const { id } = useParams<{ id: string }>();
  const [earning, setEarning] = useState("");
  const [cash, setCash] = useState("");
  const [time, setTime] = useState(""); 
  const [item, setItem] = useState("");
  const navigate = useNavigate();

  console.log(id);

  const handleClose = () => {
    navigate('/payment');
  };

  useEffect(() => {
    fetchData();
}, []);

async function fetchData() {
  try {
      await httpFront.get('http://localhost:5000/payment/update/' + id
      ).then((response) => {
          const data = response.data;
          getData(data);
      });
  } catch (error) {
      console.log(error);
  }
}; 
  const updateAction = async () => {
  try {
    await httpFront.put('http://localhost:5000/payment/update/' + id, {
        earning,
        time,
        cash,
        item
    }).then((response) => {
       console.log(response);
       window.location.href = '/payment';
    });
} catch (error) {
    console.log(error);
};
};
    
return (
    <div className="modal-overlay">
        <div className="container mx-auto px-10 pb-10 bg-white m-10 modal-box2">
        <h3 className="text-3xl my-5">Update Payment Data</h3>
        {data && (
            <form className='w-full max-w-sm mx-auto'>
                <div className='block'>
                    <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>Earning</label>
                    <input
                        type="text"
                        key={id}
                        placeholder={data.earning}
                        value={earning}
                        onChange={(e) => setEarning(e.target.value)}
                        id=""
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
                </div>
                <div className='block'>
                    <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>Time</label>
                    <input
                        type="date"
                        key={id}
                        placeholder={data.time}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        id=""
                        min="2017-04-01T00:00" max="2025-12-31T23:59"
                        className='number bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
                </div>
                <div className='block'>
                    <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>cash</label>
                    <input
                        type="number"
                        key={id}
                        placeholder={String(data.cash)}
                        value={cash}
                        onChange={(e) => setCash(e.target.value)}
                        id=""
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
                </div>
                <div className='block'>
                    <label className='block text-gray-500 mb-1 md:mb-0 pr-4" for="inline-full-name'>Item</label>
                    <input
                        type="text"
                        key={id}
                        placeholder={data.item}
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        id=""
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/2">
                        <button type="button" 
                        onClick={() => updateAction()} 
                        className="bg-green-400 hover:bg-green-300 text-white rounded px-4 py-2 m-4">
                            Updated
                        </button>
                    </div>
                    <div className="md:w-1/2">
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleClose}>
                            not Update 
                        </button>
                    </div>
                </div>
            </form>)}         
        </div>
    </div>
    )
}
export default Modal;