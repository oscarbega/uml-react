/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react"

const ClassNode = ({data}:any) => {
    return(
        <>
        <Handle position={Position.Bottom} type={"source"} style={{display:'none'}}></Handle>
        <div className="w-72 font-sans bg-white/10 backdrop-blur-sm flex flex-col gap-1 transition-all rounded-md shadow-sm p-2">
            {data.className}
            
            <div>
                {data.attributes && data.attributes.length>0 &&
                <div className="flex flex-col gap-1 font-thin">
                    <hr />
                    {data.attributes.map((attr:any,index:number)=>(<div key={index}>{attr}</div>))}
                </div>
                }
            </div>
        </div>
        <Handle position={Position.Top} type={"target"} style={{display:'none'}}></Handle>
        </>
    )
}
export default ClassNode