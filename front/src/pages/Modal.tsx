import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Payments } from '../typets';
import httpFront from './httpFront';


const Modal: React.FC = () => {
  const [data, getData] = useState<Payments>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/payment');
  };

  const deleteAction = async () => {
    try{
        await httpFront.delete('http://localhost:5000/payment/Delete/'+ id,
    ).then((response) => {
        const data = response.data;
        getData(data);
        window.location.href = '/payment';


    })}catch(error) {
        console.log(error);
      };
    }
    
return (
    <>
    <div className="modal-overlay">
      <div  className="modal-box">    
          <h3 className="text-left text-xl mx-10">Do you really want to delete?</h3>
          <p className="text-left text-xl mx-10">Once deleted, it cannot be restored. Please check the impact on already registered users and operate with caution.</p>
         <div className="md:flex md:items-center mx-15 my-4">
                      <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => deleteAction()}>
                      Delete
                      </button>
                      <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleClose}>
                      not Delete
                      </button>
                    </div>                
                  </div>
                </div>
    </>
)
  }
export default Modal;