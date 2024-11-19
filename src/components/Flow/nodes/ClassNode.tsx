/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react"
import "./classNode.css"

const ClassNode = ({data}:any) => {
    return(
        <>
        <Handle position={Position.Bottom} type={"source"} style={{display:'none'}}></Handle>
        <div className="custom-node--wrapper">
            <div className="custom-node ">
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
        </div>
        <Handle position={Position.Top} type={"target"} style={{display:'none'}}></Handle>
        </>
    )
}
export default ClassNode