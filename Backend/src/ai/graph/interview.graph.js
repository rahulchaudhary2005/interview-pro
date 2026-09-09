import { StateGraph } from "@langchain/langgraph";

import {
  interviewAgent,
} from "../agents/interview.agent.js";

const workflow = new StateGraph({
  channels: {
    resume: null,
    jd: null,
    role: null,
    level: null,
    output: null,
  },
});



/**
 * =========================================
 * QUESTION GENERATION NODE
 * =========================================
 */

workflow.addNode(
  "generateInterview",
  async (state) => {

    const output =
      await interviewAgent({
        resume: state.resume,
        jd: state.jd,
        role: state.role,
        level: state.level,
      });

    return {
      ...state,
      output,
    };
  }
);

workflow.setEntryPoint(
  "generateInterview"
);

export const interviewGraph =
  workflow.compile();