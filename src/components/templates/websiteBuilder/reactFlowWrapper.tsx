import React, { useMemo } from 'react'
import { useCallback } from 'react';
import ReactFlow, { Handle, Position, Background, Controls } from 'reactflow';
import BuilderContainer from './builderContainer';
import 'reactflow/dist/style.css';
const rfStyle = {
    backgroundColor: '#B8CEFF',
};

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }) {
    const { builderState, activeDeviceType } = data
    return (
        <BuilderContainer builderState={builderState} activeDeviceType={activeDeviceType} />
    );
}

function ReactFlowWrapper({ builderState, activeDeviceType }) {

    const rfStyle = {
        backgroundColor: '#B8CEFF',
    };


    const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
    const nodes = [
        {
            selected: true,
            id: 'node-1',
            type: 'textUpdater',
            position: { x: 0, y: 0 },
            data: { builderState, activeDeviceType },
        },
    ];
    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={[]}
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={{
                    background: "dee1ec"
                }}
            >
                <Controls />
                <Background variant="dots" gap={12} size={10} color='purple' />
            </ReactFlow>
        </>
    )
}

export default ReactFlowWrapper