import {
  StateGraph
} from "@langchain/langgraph";

import {
  resumeAgent
} from "../agents/resume.agent.js";

import {
  jdAgent
} from "../agents/jd.agent.js";

import {
  roadmapAgent
} from "../agents/roadmap.agent.js";

const workflow =
  new StateGraph({

    channels: {
      resume: null,
      jd: null,
      resumeAnalysis: null,
      jdAnalysis: null,
      roadmap: null,
    },
  });

workflow.addNode(
  "resumeAnalysis",
  async (state) => {

    const result =
      await resumeAgent(
        state.resume
      );

    return {
      resumeAnalysis:
        result,
    };
  }
);

workflow.addNode(
  "jdAnalysis",
  async (state) => {

    const result =
      await jdAgent(
        state.jd
      );

    return {
      jdAnalysis:
        result,
    };
  }
);

workflow.addNode(
  "roadmap",
  async (state) => {

    const result =
      await roadmapAgent({

        role:
          state.jdAnalysis
            ?.roleTitle,

        experience:
          state.resumeAnalysis
            ?.experienceLevel,
      });

    return {
      roadmap: result,
    };
  }
);

workflow.setEntryPoint(
  "resumeAnalysis"
);

workflow.addEdge(
  "resumeAnalysis",
  "jdAnalysis"
);

workflow.addEdge(
  "jdAnalysis",
  "roadmap"
);

export const agentWorkflow =
  workflow.compile();