import { Link } from "react-router-dom";

export function Lowheading({label,buttontext,to}){
    return <div className="py-2 text-sm flex justify-center">
        <p>
            {label}
        </p>
        <Link  className="pointer underline pl-1 cursor-pointer" to={to}>{buttontext}</Link>
    </div>

}