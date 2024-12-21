export function Input({label,onchange}){
    return <div className="flex flex-col gap-1 ml-28 mt-6 max-sm:ml-20 max-md:ml-24">
        <label htmlFor="username" className="capitalize text-lg font-semibold">{label}</label>
       <div> <input type="text" name="username" id="username" onChange={onchange} className="min-w-[75%] max-sm:min-w-[70%] rounded-md pt-2 pb-2 outline-none border-solid border-2 border-gray-300 shadow-lg" placeholder="username"/></div>
    </div>
}
