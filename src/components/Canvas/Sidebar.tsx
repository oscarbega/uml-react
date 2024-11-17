import { useContext, useEffect, useState } from "react"
import { NodesContext } from "../../state/nodesState"
import { createPortal } from "react-dom";
import { AddRelationship } from "../Modals/AddRelationship";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SideBar = ({selectedNode,selectedEdge}:any) => {
    const [name, setname] = useState('')
    const [display,setDisplay] = useState('')
    const [attributes, setAttributes] = useState(new Array<string>)
    const {setNodes} = useContext(NodesContext)

    useEffect(()=>{
        setDisplay('edge')
    },[selectedEdge])
    useEffect(() => {
        setDisplay('node')
        if(selectedNode?.data?.className){
            setname(selectedNode?.data?.className)
            setAttributes(selectedNode?.data?.attributes)
        }
      }, [selectedNode])

    useEffect(() => {
      setNodes((nds:any)=>nds.map((node:any)=>{
        if(node.id===selectedNode.id){
            return {...node, data:{...node.data, className:name}}
        }
        return node;
      }))
    }, [name])

    useEffect(() => {
        setNodes((nds:any)=>nds.map((node:any)=>{
          if(node.id===selectedNode.id){
              return {...node, data:{...node.data, attributes:attributes}}
          }
          return node;
        }))
    }, [attributes])
    
    const changeAttributes = (key:number, value:string) =>{
        setAttributes((atrs)=>atrs.map((attr, index) =>
            index === key ? value : attr
        ))
    }
    const addAtribute=()=>{
        setAttributes((atrs)=>[...atrs,'new attribute'])
    }
    return(
        <div className="z-0 w-80 h-screen shadow-md pt-10 shadow-slate-800  bg-slate-500 text-slate-200">
            {selectedNode && display=="node" &&
            <>
                
                <div className="p-2 px-6 font-sans flex flex-col gap-1">
                    <input className="text-lg font-semibold bg-transparent text-slate-50 py-2" value={name} onChange={(e)=>setname(e.target.value)}></input>
                    <hr className="border-slate-400 pt-2"/>
                    <div className="text-md">Attributes:</div>
                    <div className=" flex flex-col gap-1 text-sm mb-2 font-light">
                        {attributes && attributes.length>0 &&
                        <>
                        {attributes.map((attr:any, index:number)=>(
                            <input className="list-item pl-2 p-1 rounded bg-transparent transition-all hover:bg-black/10 focus:bg-black/10" key={index} value={attr} onChange={(e)=>changeAttributes(index,e.target.value)}>
                            </input>
                        ))}
                        </>
                        }
                        <div className="w-full text-end flex justify-end gap-2 items-center py-2">
                            <button className="flex gap-2 items-center" onClick={addAtribute}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 fill-slate-400" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                                </svg>
                                add item
                            </button>
                        </div>
                    </div>
                    <hr className="border-slate-400 pt-2"/>
                    <AddRelationshipButton selectedNode={selectedNode.id}/>
                </div>
            </>
            }
        </div>
    )
}

const AddRelationshipButton = ({selectedNode}:{selectedNode:string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add relationship</button>
      {isModalOpen &&
        createPortal(<AddRelationship activeNodeId={selectedNode} onclose={()=>setIsModalOpen(false)}></AddRelationship>, document.body)}
    </>
  );
};

export default SideBar