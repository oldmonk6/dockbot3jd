export function Button({label,onclick}){
    return <div className="  flex justify-center capitalize"><button onClick={onclick} className="bg-black min-w-[80%] text-white p-4 mt-8 rounded-md">{label}</button></div>
}