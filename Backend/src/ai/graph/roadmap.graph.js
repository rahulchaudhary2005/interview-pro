import { StateGraph } from '@langchain/langgraph';
import { roadmapAgent } from '../agents/roadmap.agent.js';

const graph = new StateGraph({
  channels: {
    role: null,
    roadmap: null,
  },
});

graph.addNode('roadmapGenerator', async (state) => {
  const roadmap = await roadmapAgent({
    role: state.role,
    experience: 'Beginner',
  });

  return {
    ...state,
    roadmap,
  };
});

graph.setEntryPoint('roadmapGenerator');

export const roadmapGraph = graph.compile();