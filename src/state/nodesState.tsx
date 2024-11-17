/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// state/nodesContext.js
import { useEdgesState, useNodesState } from '@xyflow/react';
import { createContext, useContext, useState } from 'react';

export const NodesContext = createContext({
  nodes:[],
  setNodes:(nodes: any)=>{},
  OnNodeChange:(node: any)=>{},
  edges:[],
  setEdges:(edges: any)=>{},
  OnEdgeChange:(node: any)=>{},
  selectedNode: null,
  setSelectedNode:(node: any)=>{},
  selectedEdge: null,
  setSelectedEdge:(node: any)=>{}
});

export const NodesProvider = ({ children }:any) => {
  const [nodes,setNodes,OnNodeChange] = useNodesState([]);
  const [edges,setEdges,OnEdgeChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  return (
    <NodesContext.Provider
      value={{
        nodes,
        setNodes,
        OnNodeChange,
        selectedNode,
        setSelectedNode,
        edges,
        OnEdgeChange,
        setEdges,
        selectedEdge,
        setSelectedEdge
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => useContext(NodesContext);
