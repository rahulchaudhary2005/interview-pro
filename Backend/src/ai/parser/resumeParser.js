const TECH_SKILLS = [

  "javascript",
  "typescript",
  "react",
  "nextjs",
  "node",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "python",
  "django",
  "flask",
  "java",
  "spring boot",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "redis",
  "graphql",
  "langchain",
  "langgraph",
  "rag",
  "machine learning",
  "deep learning",
  "tensorflow",
  "pytorch",
  "system design",
  "dsa",
  "data structures",
  "algorithms",
  "socket.io",
  "tailwind",
  "scss",
  "html",
  "css",
  "git",
  "github",
  "rest api",
  "microservices",
  "jwt",
  "ci/cd",
  "linux",
];



export const extractSkillsFromResume =
  (resumeText = "") => {

    const normalizedText =
      resumeText.toLowerCase();

    const extractedSkills =
      TECH_SKILLS.filter(
        (skill) =>
          normalizedText.includes(
            skill.toLowerCase()
          )
      );

    console.log(
      "EXTRACTED SKILLS:",
      extractedSkills
    );

    return [
      ...new Set(
        extractedSkills
      ),
    ];
  };