import '@xyflow/react/dist/style.css';
import Canvas from "../components/Canvas/Canvas";
import { NodesProvider } from '../state/nodesState';
import { ReactFlowProvider } from '@xyflow/react';

const CanvasPage = () =>{
    return (
        <NodesProvider>
            <ReactFlowProvider>
            <Canvas/>

            </ReactFlowProvider>
        </NodesProvider>
    )
}
export default CanvasPage