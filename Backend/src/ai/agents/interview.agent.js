// import { generateInterviewQuestions } from '../chains/interview.chain.js';
// import { retrieveContext } from '../rag/retriever.js';

// export const interviewAgent = async ({
//   resume,
//   jd,
//   role,
//   level,
// }) => {
//   const context = await retrieveContext(jd);

//   const response = await generateInterviewQuestions({
//     resume,
//     jd,
//     role,
//     level,
//     context,
//   });

//   return {
//     success: true,
//     role,
//     level,
//     questions: response,
//   };
// };

import {
  generateInterviewChain,
} from "../chains/interview.chain.js";

export async function interviewAgent({
  resume,
  jd,
  role,
  level,
}) {

  const result =
    await generateInterviewChain({
      resume,
      jd,
      role,
      level,
    });

  return result;
}