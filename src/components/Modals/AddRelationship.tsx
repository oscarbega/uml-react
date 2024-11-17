/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edge, useNodes } from "@xyflow/react"
import { useContext, useState } from "react"
import { NodesContext } from "../../state/nodesState"

export const AddRelationship = ({activeNodeId,onclose}:{activeNodeId:string,onclose:()=>unknown}) =>{
    const [activeNode,setActiveNode] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nodes = useNodes()
    const [formState,setFormState] = useState({
      targetId: null,
      relationshipType: "association",
      originMultiplicity: "",
      targetMultiplicity: "",
      originRole:"",
      targetRole:"",
    })

    const {edges,setEdges} = useContext(NodesContext)

    const createEdge = () => {
      if (!activeNode) return;

      const edge: Edge = {
        id: Math.random().toString(),
        source: activeNodeId,
        target: activeNode,
        data: {
          sourceMultiplicity: formState.originMultiplicity,
          targetMultiplicity: formState.targetMultiplicity,
          sourceRole: formState.originRole,
          targetRole: formState.targetRole,
          type: formState.relationshipType,
        },
        type: "customEdge",
        deletable: true,
      };
      setEdges(edges.concat(edge));
      onclose();
    };

    return (
      <div className="absolute w-screen h-screen top-0 left-0 z-20 font-sans bg-black/30">
        <div className="w-3/5 flex flex-col gap-4 items-center relative text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  shadow-lg rounded-lg shadow-black/20 p-8 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:rounded-lg before:bg-white/10 before:backdrop-blur-md">
        <button className="w-6 h-6 absolute top-9 right-9 fill-white transition-all hover:rotate-90 hover:fill-white/90" onClick={onclose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                </svg>
            </button>
          <div className="w-5/6 flex flex-col relative gap-4">
            <div className="text-4xl font-bold">
              <h1>Add Relationship</h1>
              <hr className="border-b-white w-full mt-2" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Select destiny node:</div>
                <div className="flex flex-wrap gap-2">
                  {nodes.map((node) => (
                    <button
                      className={`transition-all px-4 rounded-md py-1 font-semibold ${
                        activeNode == node.id
                          ? "bg-teal-500 hover:bg-teal-700"
                          : "bg-black/20 hover:bg-black/40"
                      }  `}
                      onClick={() => setActiveNode(node.id)}
                    >
                      {node.data.className as string}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Select relationship type:</div>
                <Select
                  width="w-72"
                  options={[
                    "association",
                    "one way association",
                    "aggregation",
                    "composition",
                    "generalization",
                    "dependency",
                    "realization",
                  ]}
                  onSelect={(opt) => setFormState((prev:any)=>({...prev,relationshipType:opt}))}
                ></Select>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Select multiplicity:</div>
                <div className="w-72 grid grid-cols-9 gap-y-1 font-thin">
                  <div className="col-span-4">Origin:</div>
                  <div className="col-start-6 col-span-4">Destiny:</div>
                  <div className="col-span-4">
                    <Select
                      options={["none", "1", "0..1", "*", "0..*", "1..*"]}
                      width="w-full"
                      onSelect={(opt) => setFormState((prev:any)=>({...prev,originMultiplicity:opt}))}
                    ></Select>
                  </div>
                  <div className="col-start-6 col-span-4">
                    <Select
                      options={["none", "1", "0..1", "*", "0..*", "1..*"]}
                      width="w-full"
                      onSelect={(opt) => setFormState((prev:any)=>({...prev,targetMultiplicity:opt}))}
                    ></Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Select roles:</div>
                <div className="w-72 grid grid-cols-9 gap-y-1 font-thin">
                  <div className="col-span-4">Origin:</div>
                  <div className="col-start-6 col-span-4">Destiny:</div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      className="w-full py-1 px-4 rounded bg-black/20"
                      onChange={(e)=>setFormState((prev:any)=>({...prev,originRole:e.target.value}))}
                    />
                  </div>
                  <div className="col-start-6 col-span-4">
                    <input
                      type="text"
                      className="w-full py-1 px-4 rounded bg-black/20"
                      onChange={(e)=>setFormState((prev:any)=>({...prev,targetRole:e.target.value}))}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={()=>createEdge()} className="px-4 py-2 flex items-center transition-all gap-2 rounded-lg font-semibold m-4 w-fit group bg-teal-500">
                  Add Relationship
                  <div className="w-4 fill-white group-hover:animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

const Select = ({options,width,onSelect}:{options:string[],width:string|'w-72',onSelect:(opt:string)=>unknown}) =>{
    const [displayed, setDisplayed] = useState(false)
    const [selected, setselected] = useState(options[0])
    const handleSelect = (opt:string) =>{
        setselected(opt);
        setDisplayed(false);
        onSelect(opt);
    }
    return (
      <div className={`${width?width:'w-72'}  relative font-light`}>
        <div
          onClick={() => setDisplayed(!displayed)}
          className={`w-full py-1 px-4 tarnsition-all capitalize cursor-pointer bg-black/20  ${
            displayed ? "rounded-t" : "rounded"
          } text-white font-sans`}
        >
          {selected}
        </div>
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-2 transition-all fill-white ${
            displayed ? "rotate-90" : ""
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
        {displayed && (
          <div className="absolute visible z-30 flex flex-col top-full w-full   ">
            <div className="px-4 py-1 pb-3 flex flex-col gap-1 before:w-full before:h-full before:absolute before:top-[-1px] before:left-0 before:z-[-1] rounded-b before:bg-black/40 before:rounded-b before:backdrop-blur-md">
                {options.map((opt:string) => (
                  <div className="transition-all hover:font-normal cursor-pointer" onClick={()=>handleSelect(opt)}>{opt}</div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
}