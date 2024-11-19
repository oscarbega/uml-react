import { useEffect, useState } from "react"

import { NodeSideBar } from "./sidebar/NodeSidebar";
import { EdgeSideBar } from "./sidebar/EdgeSideBar";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SideBar = ({selectedNode,selectedEdge}:any) => {
    
    const [display,setDisplay] = useState('')

    useEffect(()=>{
        if(selectedEdge)
        setDisplay('edge')
    },[selectedEdge])
    useEffect(() => {
        if(selectedNode)
        setDisplay('node')
      }, [selectedNode])


    return(
        <div className="z-0 w-80 h-screen shadow-md pt-10 shadow-slate-800  bg-slate-500 text-slate-200">
            {selectedNode && display=="node" &&
                <NodeSideBar selectedNode={selectedNode}></NodeSideBar>
            }
            {selectedEdge && display=="edge" &&
                <EdgeSideBar selectedEdge={selectedEdge}></EdgeSideBar>

            }
        </div>
    )
}


export default SideBar