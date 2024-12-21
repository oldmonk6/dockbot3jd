import { useNavigate } from "react-router-dom"
import { Navbar2 } from "./navabar2"

export function HomePage(){
    const navigate=useNavigate()
    return <div className="w-screen">
    <div><Navbar2/></div>
    <div className="w-screen mt-3" >
      <div className="flex justify-center">
       <h1>Welcome to docbot</h1>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-around">
            <div className="flex justify-center"> <p className="text-3xl font-semibold">Upload yur document</p>   </div> 
                <div className="flex justify-center"><button onClick={()=>{
                   navigate("/upload")
                }}>Click her to Upload</button></div>
            </div>
            <div className="flex flex-col justify-around">
            <div className="flex justify-center"> <p className="text-3xl font-semibold">Chat with the Bot</p></div> 
                <div className="flex justify-center"><button onClick={()=>{
                   navigate("/chat")
                }}>Click her to start</button></div>
            </div>
       </div>
    </div>
 </div>
   

}