import {
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  Position,
  useInternalNode,
  useReactFlow,
} from "@xyflow/react";
import { DragEvent, FC, useEffect, useState } from "react";
import { getEdgeParams, getPathMidpoint } from "../utils";

export const CustomEdge: FC<
  EdgeProps<
    Edge<{
      sourceMultiplicity: string;
      targetMultiplicity: string;
      sourceRole: string;
      targetRole: string;
      type: "association" | "inheritance" | "realization"|"generalization"|"aggregation"|"composition"|"dependency"|"one way association";
      midpointX?: number;
      midpointY?: number;
      midPointEntry?:Position;
      midPointExit?:Position;
    }>
  >
> = ({ id, source, target, data,selected}) => {
  const {setEdges,screenToFlowPosition,} = useReactFlow();
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const [isgrabbing,setIsgrabbing] = useState(false)
  const [selectedState,setSelectedState] = useState(selected)
  useEffect(() => {
    setSelectedState(selected)
 
  }, [selected])
  
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );
  
  
  const [edgePath] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });
  
  const midpoint = getPathMidpoint(edgePath)
  const [posState,setPosState] = useState({
    midpointX: midpoint.x,
    midpointY: midpoint.y,
  })
  
  const [firstHalf] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: data?.midPointEntry || midpoint.entryPos,
    targetX: posState.midpointX,
    targetY: posState.midpointY,
  })
  const [secondHalf] = getSmoothStepPath({
    sourceX: posState.midpointX,
    sourceY: posState.midpointY,
    sourcePosition: midpoint.exitPos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  })
  
  const getPathKind = () => {
    switch (data?.type) {
      case "association":
        return {
          strokedash: "1",
          marker: null,
        };
        break;
      case "dependency":
      case "realization":
        return {
          strokedash: "10,10",
        };
        break;
      default:
        break;
    }
  };
  const getMarkerPos = (pos: string) => {
    switch (pos) {
      case "top":
        return "translate(-50%,-100%)";
        break;
      case "bottom":
        return "translate(-50%,0%)";
        break;
      case "left":
        return "translate(-100%,-50%)";
        break;
      case "right":
        return "translate(0%,-50%)";
        break;
      default:
        break;
    }
  };
  const getMarkerRotation = (pos: string) => {
    switch (pos) {
      case "top":
        return "";
        break;
      case "bottom":
        return "rotate(180deg)";
        break;
      case "left":
        return "rotate(270deg)";
        break;
      case "right":
        return "rotate(-270deg)";
        break;
      default:
        break;
    }
  };
  const getLabelPos = (pos: string) => {
    switch (pos) {
      case "top":
        return "translate(-150%,-100%)";
        break;
      case "bottom":
        return "translate(-150%,0%)";
        break;
      case "left":
        return "translate(-150%,-100%)";
        break;
      case "right":
        return "translate(50%,-100%)";
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsgrabbing(true);
  
    const handleMouseMove = (moveEvent: MouseEvent) => {
      
      const pos = screenToFlowPosition({
        x: moveEvent.clientX,
        y: moveEvent.clientY,
      });
      console.log(moveEvent.x)
      setPosState((prev) => ({
        midpointX:prev.midpointX + moveEvent.movementX*0.5,
        midpointY: prev.midpointY + moveEvent.movementY*0.5,
      }));
  
      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.id === id) {
            const newEdge = { ...edge };
            if (edge.data) {
              newEdge.data = {
                ...edge.data,
                midPointX: posState.midpointX,
                midPointY: posState.midpointY,
                midPointEntry: midpoint.entryPos,
                midPointExit: midpoint.exitPos,
              };
            }
            return newEdge;
          } else {
            return edge;
          }
        })
      );
    };
  
    const handleMouseUp = () => {
      setIsgrabbing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <path
        id={id}
        className={` fill-none ${selected?'stroke-teal-400 animate-pulse':'stroke-gray-200'}`}
        d={firstHalf}
        markerWidth={"20"}
        markerHeight={"20"}
        style={{
          strokeWidth: "2px",
          strokeLinecap: "round",
          strokeDasharray: getPathKind()?.strokedash,
        }}
      ></path>
      <path
        id={id}
        className={` fill-none ${selected?'stroke-teal-400 animate-pulse':'stroke-gray-200'}`}
        d={secondHalf}
        markerWidth={"20"}
        markerHeight={"20"}
        style={{
          strokeWidth: "2px",
          strokeLinecap: "round",
          strokeDasharray: getPathKind()?.strokedash,
        }}
      ></path>
      <EdgeLabelRenderer>
        <div 
        className="w-2 h-2 z-50 bg-white rounded-full cursor-pointer focus:!cursor-move pointer-events-auto draggable" 
        onMouseDown={(e)=>handleDragStart(e)}
        style={{
          display: `${selectedState?'block':'none'}`,
          transform: `translate(-50%,-50%) translate(${posState.midpointX}px,${posState.midpointY}px)`,
          position: "absolute",
        }}
        ></div>
        
        <div
          className="font-sans text-white"
          style={{
            transform: `${getLabelPos(sourcePos)} translate(${sx}px,${sy}px)`,
            position: "absolute",
          }}
        >
          {data?.sourceMultiplicity}
        </div>
        <div
          className="font-sans text-white"
          style={{
            transform: `${getLabelPos(targetPos)} translate(${tx}px,${ty}px)`,
            position: "absolute",
          }}
        >
          {data?.targetMultiplicity}
        </div>
        <div className="font-sans text-white"></div>
        <div className="font-sans text-white"></div>

        <div className="marker w-10 stroke-white fill-[#5a6678]" style={{
            transform: `${getMarkerPos(targetPos)} translate(${tx}px,${ty}px) ${getMarkerRotation(targetPos)}`,
            position: "absolute",
          }}>
          <svg
            version="1.1"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m32.019 61.265 20.972-1e-6 34.953 1e-6c3.8608 0 5.4257 2.7105 3.4953 6.054l-27.962 48.432c-1.9304 3.3435-5.0602 3.3435-6.9906 0l-27.962-48.432c-1.9304-3.3435-0.3655-6.054 3.4953-6.054z"
                display={data?.type=="generalization"||data?.type=="realization"?'auto':'none'}
                strokeWidth="5"
              />
              <path
                d="m82.165 98.002-20.391 19.344a2.5765 2.5765 180 0 1-3.5463 0l-20.391-19.344"
                display={data?.type=="dependency"||data?.type=="one way association"?'auto':'none'}
                strokeLinecap="round"
                fill="transparent"
                stroke-width="5"
              />
              <path
                d="m57.075 18.406-23.398 43.602a11.526 11.526 90 0 0 0 10.9l23.398 43.602a3.3193 3.3193 0 0 0 5.8496 0l23.398-43.602a11.526 11.526 90 0 0 0-10.9l-23.398-43.602a3.3193 3.3193 0 0 0-5.8496 0z"
                display={data?.type=="composition"?'auto':'none'}
                className="fill-gray-300"
                strokeLinecap="round"
                strokeWidth="5"
              />
            </g>
            <path
              d="m57.075 17.462-23.398 43.602a11.526 11.526 90 0 0 0 10.9l23.398 43.602a3.3193 3.3193 0 0 0 5.8496 0l23.398-43.602a11.526 11.526 90 0 0 0-10.9l-23.398-43.602a3.3193 3.3193 0 0 0-5.8496 0z"
              display={data?.type=="aggregation"?'auto':'none'}
              strokeLinecap="round"
              strokeWidth="5"
            />
          </svg>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
