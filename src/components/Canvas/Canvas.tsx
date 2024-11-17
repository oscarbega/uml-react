import { useContext } from "react"
import Flow from "../Flow/Flow"
import SideBar from "./Sidebar"
import TopBar from "./TopBar"
import { NodesContext } from "../../state/nodesState"

const Canvas = () =>{
    const {selectedNode, setSelectedNode,selectedEdge, setSelectedEdge} = useContext(NodesContext)
    return(
        <div className="canvas h-screen bg-slate-600">
            <TopBar></TopBar>
            <div className="flex flex-grow w-screen absolute top-0 left-0">
                <SideBar selectedNode={selectedNode} selectedEdge={selectedEdge}></SideBar>
                <Flow onSelectNode={setSelectedNode} onSelectEdge={setSelectedEdge}></Flow>
            </div>
        </div>
    )
}
export default Canvas