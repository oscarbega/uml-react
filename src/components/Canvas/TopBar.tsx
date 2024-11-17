const TopBar = ()=>{
    return(
        <div className="bg-teal-500 z-10 absolute top-0 left-0 shadow-md  w-full py-2 flex justify-between px-6 items-center font-sans  text-white font-medium">
            <div className="flex gap-4">
                <div>File</div>
                <div>Options</div>
            </div>
            <div>
                User
            </div>
        </div>
    )
}

export default TopBar