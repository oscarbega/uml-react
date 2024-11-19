/* eslint-disable @typescript-eslint/no-explicit-any */

import { useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react"

export const EdgeSideBar = ({selectedEdge}:any)=>{
    const [selectedEdgeState,setSelectedEdgeState] = useState(selectedEdge);
    const {setEdges} = useReactFlow()

    useEffect(()=>{
        setEdges(edges=>edges.map(edge=>{
            if(edge.id === selectedEdgeState.id){
                return selectedEdgeState
            }else{
                return edge
            }
        }))
    },[selectedEdgeState])

    const recalculateEdge = (_:any) =>{
        setSelectedEdgeState((prev: any) => ({
            ...prev,
            data: {
              ...prev.data,
              midPointX: null,
              midPointY: null,
              midPointEntry: null,
              midPointExit: null,
            },
          }));
    }

    const handleSourceMultiplicityChange = (newValue: string) => {
      setSelectedEdgeState((prev: any) => ({
        ...prev,
        data: {
          ...prev.data,
          sourceMultiplicity: newValue,
        },
      }));
    };

    const handleTargetMultiplicityChange = (newValue: string) => {
      setSelectedEdgeState((prev: any) => ({
        ...prev,
        data: {
          ...prev.data,
          targetMultiplicity: newValue,
        },
      }));
    };

    const handleTypeChange = (newValue:string) => {
        setSelectedEdgeState((prev: any) => ({
          ...prev,
          data: {
            ...prev.data,
            type: newValue,
          },
        }));
        
    }

    return (
      <>
        <div className="p-2 px-6 font-sans flex flex-col gap-1 text-white">
          <div className="text-2xl font-semibold text-slate-50">Edge</div>
          <hr className="border-slate-400 pt-2" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-md">Edge type:</div>
              <Select
                width="w-full"
                options={[
                  "association",
                  "one way association",
                  "aggregation",
                  "composition",
                  "generalization",
                  "dependency",
                  "realization",
                ]}
                selectedInput={selectedEdgeState.data.type}
                onSelect={handleTypeChange}
              ></Select>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-md">Multiplicity:</div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div className="text-sm font-thin">source:</div>
                <div className="text-sm font-thin">target:</div>
                <Select
                  width="w-full"
                  options={["none", "1", "0..1", "*", "0..*", "1..*"]}
                  onSelect={handleSourceMultiplicityChange}
                  selectedInput={selectedEdgeState.data.sourceMultiplicity}
                ></Select>
                <Select
                  width="w-full"
                  options={["none", "1", "0..1", "*", "0..*", "1..*"]}
                  selectedInput={selectedEdgeState.data.targetMultiplicity}
                  onSelect={handleTargetMultiplicityChange}
                ></Select>
              </div>
            </div>
          </div>
          <hr className="border-slate-400 mt-2 pt-2" />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded bg-black/20 hover:bg-black/40 transition-all w-full text-sm p-1">
                Rotate Midpoint
              </button>
              <button onClick={recalculateEdge} className="rounded bg-black/20 hover:bg-black/40 transition-all w-full text-sm p-1">
                Recalculate Edge
              </button>
            </div>
            <button className="rounded flex justify-center items-center gap-4 bg-teal-500 font-semibold hover:bg-teal-600 transition-all w-full fill-white text-sm p-2">
              Remove Edge
              <svg
                className="h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
}

const Select = ({options,width,onSelect,selectedInput=null}:{options:string[],width:string|'w-72',onSelect:(opt:string)=>unknown,selectedInput?:any}) =>{
    const [displayed, setDisplayed] = useState(false)
    const [selected, setselected] = useState(selectedInput||options[0])
    const handleSelect = (opt:string) =>{
        setselected(opt);
        setDisplayed(false);
        onSelect(opt);
    }
    return (
      <div className={`${width?width:'w-72'}  relative font-light text-sm`}>
        <div
          onClick={() => setDisplayed(!displayed)}
          className={`w-full py-1 px-4 text-ellipsis line-clamp-1  tarnsition-all capitalize cursor-pointer bg-black/20  ${
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