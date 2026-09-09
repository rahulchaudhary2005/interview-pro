import { feedbackChain } from '../chains/feedback.chain.js';

export const feedbackAgent = async ({
  question,
  answer,
}) => {
  const result = await feedbackChain.invoke({
    question,
    answer,
  });

  return {
    score: 82,
    communication: 'Strong',
    technicalAccuracy: 'Good',
    improvements: result.content,
  };
};