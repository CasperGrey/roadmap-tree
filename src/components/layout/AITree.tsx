import React from 'react';

// Define the type for a tree node
interface TreeNode {
    id: number;
    label: string;
    children?: TreeNode[];
}

// Define the props for the AITree component
interface AITreeProps {
    data: TreeNode[];
    onAddNode: (node: TreeNode) => void;
    onNodeAdd: (nodeId: number) => void;
}

const AITree: React.FC<AITreeProps> = ({ data, onAddNode, onNodeAdd }) => {
    // Recursive function to render tree nodes
    const renderTree = (nodes: TreeNode[]) => {
        return nodes.map((node) => (
            <li key={node.id} className="mb-2">
                <div
                    onClick={() => onNodeAdd(node.id)}
                    className="cursor-pointer hover:underline text-blue-500"
                >
                    {node.label}
                </div>
                {node.children && node.children.length > 0 && (
                    <ul className="ml-4">{renderTree(node.children)}</ul>
                )}
            </li>
        ));
    };

    return (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold text-center mb-4">AI Roadmap Tree</h2>
            <ul>{renderTree(data)}</ul>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() =>
                        onAddNode({
                            id: data.length + 1,
                            label: `Node ${data.length + 1}`,
                            children: [],
                        })
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    Add New Node
                </button>
            </div>
        </div>
    );
};

export default AITree;
