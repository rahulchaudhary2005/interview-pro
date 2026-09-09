import { evaluateAnswerChain } from "../chains/interview.chain.js";

export async function evaluateInterviewAnswer({
  question,
  answer,
}) {

  const evaluation =
    await evaluateAnswerChain({
      question,
      answer,
    });

  return evaluation;
}