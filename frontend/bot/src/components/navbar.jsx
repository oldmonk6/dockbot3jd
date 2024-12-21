import { useNavigate } from "react-router-dom"

export function Navbar(){
    const navigate=useNavigate()
    return <div className="bg-black">
        <div className="flex justify-between items-center">
            <div className="text-3xl p-3 text-white rounded-md">Welcome</div>
            <div className="flex justify-around gap-4 p-4">
                <div><button className="text-xl border-2 border-solid border-black p-3 text-white  rounded-md  " onClick={()=>{
                    navigate("/signup")
                }}>Signup</button></div>
                <div className="text-xl border-2 border-solid border-black p-3 text-white  rounded-md" onClick={()=>{
                    navigate("/signin")
                }}><button>Signin</button></div>
            </div>
        </div>
    </div>
}