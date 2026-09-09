export const generateDynamicRoadmap = (

  roleTitle,

  missingSkills,

  techStack
) => {

  const roadmap = [];

  /* =========================================
     AI ENGINEER
  ========================================= */

  if (
    roleTitle
      ?.toLowerCase()
      .includes("ai")
  ) {

    roadmap.push(

      "Master Deep Learning fundamentals",

      "Build RAG-based AI systems",

      "Learn Vector Databases",

      "Practice LangChain & LangGraph",

      "Deploy AI pipelines on AWS"
    );
  }

  /* =========================================
     FRONTEND
  ========================================= */

  if (
    techStack.frontend
      ?.length
  ) {

    roadmap.push(

      "Master React architecture",

      "Learn performance optimization",

      "Build scalable UI systems"
    );
  }

  /* =========================================
     DEVOPS
  ========================================= */

  if (
    techStack.devops
      ?.length
  ) {

    roadmap.push(

      "Learn Docker deeply",

      "Understand Kubernetes",

      "Build CI/CD pipelines"
    );
  }

  /* =========================================
     MISSING SKILLS
  ========================================= */

  missingSkills.forEach(
    (skill) => {

      roadmap.push(
        `Learn ${skill}`
      );
    }
  );

  /* =========================================
     UNIQUE
  ========================================= */

  return [
    ...new Set(roadmap)
  ];
};