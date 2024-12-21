import { useNavigate } from "react-router-dom"

export function Navbar2() {
    const navigate=useNavigate();
  return <div className="flex justify-between items-center text-white bg-[#272626] rounded-s-sm p-3 ">
    <div className="p-4 text-2xl ml-3">
        DOCBOT
    </div>
    <div className="p-4 text-2xl ml-3">
        <button onClick={()=>{
            localStorage.removeItem("token")
            navigate("/");
            
        }}>Logout</button>
    </div>
  </div>
}