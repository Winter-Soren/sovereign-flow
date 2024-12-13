'use server';

import { db } from '@/lib/db';

export const onCreateNodesEdges = async (flowId: string, nodes: string, edges: string, flowPath: string) => {
	try {
		const flow = await db.workflows.update({
			where: {
				id: flowId
			},
			data: {
				nodes,
				edges,
				flowPath: flowPath
			}
		});

		if (flow) return { message: 'flow saved' };
	} catch (error) {
		console.error('Error updating nodes and edges in onCreateNodesEdges:', error);
		return { message: 'failed to save flow' };
	}
};

export const onFlowPublish = async (workflowId: string, state: boolean) => {
	try {
		const published = await db.workflows.update({
			where: {
				id: workflowId
			},
			data: {
				publish: state
			}
		});

		if (published.publish) return 'Workflow published';
		return 'Workflow unpublished';
	} catch (error) {
		console.error('Error publishing workflow in onFlowPublished:', error);
		return 'Failed to publish workflow';
	}
};
