import { roadmapChain } from '../chains/roadmap.chain.js';

export const roadmapAgent = async ({ role, experience }) => {
  const result = await roadmapChain.invoke({
    role,
    experience,
  });

  return {
    success: true,
    roadmap: result.content,
  };
};