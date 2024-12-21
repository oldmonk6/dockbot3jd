import { Link } from "react-router-dom"



export function Subheading({label,link,to}){
    return <div className="flex justify-center gap-2">
        <p>{label}</p>
        <Link to={to} className="pointer underline pl-1 cursor-pointer">{link}</Link>
    </div>

}