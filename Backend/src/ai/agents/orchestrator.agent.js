import { resumeAgent } from './resume.agent.js';
import { jdAgent } from './jd.agent.js';
import { roadmapAgent } from './roadmap.agent.js';
import { interviewAgent } from './interview.agent.js';

export const orchestratorAgent = async ({
  resume,
  jd,
  role,
}) => {
  const resumeAnalysis = await resumeAgent(resume);

  const jdAnalysis = await jdAgent(jd);

  const roadmap = await roadmapAgent({
    role,
    experience: 'Intermediate',
  });

  const interview = await interviewAgent({
    resume,
    jd,
    role,
    level: 'Medium',
  });

  return {
    resumeAnalysis,
    jdAnalysis,
    roadmap,
    interview,
  };
};