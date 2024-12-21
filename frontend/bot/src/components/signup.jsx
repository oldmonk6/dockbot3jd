import { useState } from "react";
import { Button } from "../subcomponents/button";
import { Heading } from "../subcomponents/heading";
import { Input } from "../subcomponents/input";
import { Subheading } from "../subcomponents/subheading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signup(){
    const [postinputs,setpostinputs]=useState({
       email:"",
        password:"",
        
    })
    const navigate=useNavigate()
    return <div className=" h-screen grid md:grid-cols-2">
        <div className="bg-slate-100 flex justify-center">
            <div className="flex flex-col justify-center w-full items-center font-mono whitespace-normal">
                <div className="  min-w-[85%] min-h-[80%] max-sm:min-w-[90%] flex flex-col justify-around rounded-md border-solid border-2 border-gray-700">
                    <Heading label={"Create an account"}/>
                    <Subheading label={"Already have an account?"} link={"login"} to={"/signin"}/>
                    
                    <Input label={"email"} onchange={(e)=>{setpostinputs({
                            ...postinputs,
                            email:e.target.value
                        })
                        
                    }}/>
                    <Input label={"password"} onchange={(e)=>{
                        setpostinputs({
                            ...postinputs,
                            password:e.target.value
                        })
                        
                    }}/>
                    <Button label={"sign up"} onclick={async ()=>{
                       const response =await axios.post(`${BACKEND_URL}/api/v1/user/register`,postinputs)
                       const jwt=response.data.token;
                       localStorage.setItem("token",jwt)
                       navigate("/homepage");


                    }}/>
                
        </div>
        </div>
        </div>
        <div className="bg-slate-300 flex justify-center  max-md:hidden ">
            <div className=" flex flex-col w-full justify-center ">
                <div className="max-w-[100%] flex flex-col justify-center items-center">
              <p className="text-3xl text-center font-bold font-mono">"the customer service I received was exceptional.the support team went above and beyond to address my concerns"</p>
              <div className="max-w-[50%] text-xl font-semibold text-left mt-2">
                Julies Winfield
              </div>
              <div className="max-w-[50%] text-sm font-light text-left text-slate-400">
               CEO| Acme corp
              </div>
              </div>
            </div>
        </div>
  
    </div>
}