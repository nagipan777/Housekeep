import React, { useState } from 'react';
import httpFront from './httpFront';


const Upload = (): JSX.Element => {
    const [file, setFile] = useState<File | null>(null);
  
  const handleFileImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
  };
};
 const handleSubmit = async() =>{
    const formData = new FormData();
    if (!file){
      return
    }
    formData.append('file', file);
  
    await httpFront.post('http://localhost:5000/payment/upload',
     formData,
    ).then((response) => {
      console.log(response.data);
      window.location.href = '/payment';
    }).catch((error) =>{
        console.error(error.data.message);
        })
    }
return (
<section className="w-full mx-auto">
<h2 className="text-3xl block m-3">or, import csv file</h2>
<form className='align-center'>
  <div className="md-4 w-[32rem] flex justify-center mx-auto">
  <div className="w-3/4">
    <input 
      type="file"
      accept=".csv"
      name="file"
      id="file_input"
      onChange={handleFileImportChange}
      className="fblock w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-500 focus:outline-none focus:border-transparent text-sm rounded-lg"
    />
  </div>
  <div className="w-1/4">
    <button type="submit" onClick={handleSubmit} disabled={!file}
    className="bg-gray-600 hover:bg-gray-400 text-white rounded px-5 py-1">
    Upload</button>
  </div>
  </div>
  </form>
  <div className="md-4 w-[32rem]  mx-auto">
  <p className="mt-1 text-left text-sm text-gray-500 dark:text-gray-300">CSV File only.</p>
  </div>

</section>


)

};

export default Upload;