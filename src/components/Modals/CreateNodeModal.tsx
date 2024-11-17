/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

const CreateNodeModal = ({ onClose, onAddNode }:any) =>{
    const modal = useRef<HTMLDivElement>(null)
    const clickable = useRef<HTMLDivElement>(null)
    const [className, setClassName] = useState("");
    const [clikEvent, setClickEvent] = useState<React.MouseEvent<HTMLDivElement> | null>();

    const handleAddNode = () => {
        if (className.trim()) {
            //onAddNode(className);
            modal.current?.classList.toggle('hidden')
            clickable.current?.classList.toggle('hidden')
        }
    };
    useEffect(() => {
        if(clikEvent){
            onAddNode(className,clikEvent)
        }
    }, [clikEvent])
    
    return(
        <div className="absolute w-screen h-screen top-0 left-0 z-20 font-sans bg-black/30">
            <div id="createClassModal" ref={modal} className="w-3/5 flex flex-col gap-4 items-center relative text-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 shadow-lg rounded-lg shadow-black/20 p-8 backdrop-blur-md" >
                <div>
                    <h1 className="text-4xl w-72  font-bold">
                        Create Class
                    </h1>
                    <hr className="border-b-white w-72 mt-2"/>
                </div>
                <div className="flex flex-col text-lg gap-2 w-72">
                    Class name:
                    <input type="text" className="rounded text-base p-2 text-black bg-white/75"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                     />
                    <button className="bg-teal-500 hover:bg-teal-600 transition-all p-2 text-base rounded-md font-bold" onClick={handleAddNode}> Add Class</button>
                </div>
            <button className="w-6 h-6 absolute top-4 right-4 fill-white transition-all hover:rotate-90 hover:fill-white/90" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                </svg>
            </button>
            </div>
            <div ref={clickable} className="w-full relative h-full hidden" onClick={(event)=>setClickEvent(event)}>
                <div className="text-3xl text-white font-sans font-semibold shadow-lg  bg-white/20 rounded relative top-7 left-1/2 -translate-x-1/2 w-fit py-6 px-16 backdrop-blur-md">Click to position your class</div>
            </div>
        </div>
    )
}
export default CreateNodeModal