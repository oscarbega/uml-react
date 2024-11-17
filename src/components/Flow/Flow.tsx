/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactFlow, Background, Controls,Node, useReactFlow } from "@xyflow/react";
import { useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import CreateNodeModal from "../Modals/CreateNodeModal";
import ClassNode from "./nodes/ClassNode";
import { NodesContext } from "../../state/nodesState";
import { CustomEdge } from "./edges/CustomEdge";

const Flow = ({onSelectNode,onSelectEdge=()=>{}}:any) => {
    const nodeTypes = useMemo(()=>({classNode: ClassNode}),[])
    const edgeTypes = useMemo(()=>({customEdge: CustomEdge}),[])
    const {nodes,setNodes,OnNodeChange,edges,OnEdgeChange} = useContext(NodesContext)
    
    const { screenToFlowPosition } = useReactFlow();
    const [isModalOpen,setIsModalOpen] = useState(false)


    const addNode = ( className:string,event:React.MouseEvent) =>{
        const newNode:Node = {
            id:Math.random().toString(),
            position:screenToFlowPosition({
                x:event.clientX,
                y:event.clientY
            }),
            type:'classNode',
            data:{
                className:className,
                attributes:[],
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setNodes((nodes:any)=>nodes.concat(newNode))
        setIsModalOpen(false)
    }

    const handleNodeClick = (_: any,node: any)=> {
        onSelectEdge(null)
        onSelectNode(node)
    };
    const handleEdgeClick = (_: any,node: any)=> {
        onSelectNode(null)
        onSelectEdge(node)
        console.log(_)
    };

    return(<div style={{width:'100%'}}>
        <ReactFlow
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            edges={edges}
            onEdgesChange={OnEdgeChange}
            nodes={nodes}
            onNodeClick={handleNodeClick}
            onNodesChange={OnNodeChange}
            onDragOver={(e)=>(e.preventDefault)}
            onEdgeClick={handleEdgeClick}
            snapToGrid={false}
        >
            <Background ></Background>
            <Controls></Controls>
        <button className="absolute bottom-4 right-16 z-30 w-16 h-16 rounded-full font-sans font-semibold bg-teal-500 text-white" onClick={()=>setIsModalOpen(true)}>add</button>
        </ReactFlow>

        {isModalOpen && createPortal(
            <CreateNodeModal 
                onClose={()=>setIsModalOpen(false)}
                onAddNode={addNode}
            />,
            document.body)}
    </div>)
}

export default Flow
