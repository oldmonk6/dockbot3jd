import { useState } from "react"
import { Loader } from "./loader";
import { data, useParams } from "react-router-dom";
import { use } from "react";
import axios from "axios";



export function Upload(){
  
  
  const [files,setfiles]=useState(null);
  const [uploading,setuploading]=useState(false);
  const [results,setresults]=useState(null);
  const handleFileChange=(e)=>{
    const selectedFile=e.target.files[0];
    if(selectedFile){
      setfiles(selectedFile)
    }
    setresults(null);
  }
  const handleUpload = async () => {
    
   if(!files)return alert("Please select a file")
    setuploading(true);

    const formData = new FormData();
  
    formData.append('files', files);
    console.log(formData.getAll('files'))
   
    
   

    try {
      
      const response = await axios.post(`http://127.0.0.1:3001/api/v1/document/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data',
          Authorization:"Bearer "+localStorage.getItem("token")  }
      }
      );
      console.log(response)
      
      
      setresults(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
      setresults('Failed to analyze the documents.');
    } finally {
      setuploading(false);
    }
  };
  return <div className="w-screen">
    <div className=" h-screen flex flex-col justify-center">
      <div className=" flex justify-center bg-slate-300 h-[80%]">
       <div className=" w-[50%] bg-slate-300 h-[80%]">
        <div  className="flex justify-center">Upload Document</div>
        <div className="bg-slate-400 h-[100%]">results: {JSON.stringify(results, null, 2)}</div>
        <div className="py-6 flex justify-around"><input className=" rounded-md"  type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        multiple
        onChange={handleFileChange} />
         <button onClick={handleUpload} className="bg-violet-400 p-4 rounded-md text-white">
        {uploading ? 'Uploading...' : 'Upload & Analyze'}
        </button>
        {uploading && <Loader/>}
        </div>
       
        </div>
      </div>
      </div>
    </div>
}