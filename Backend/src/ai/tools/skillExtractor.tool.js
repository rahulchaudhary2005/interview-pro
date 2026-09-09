/* =========================================
   SKILL DATABASE
========================================= */

const TECH_SKILLS = {

  frontend: [
    "react",
    "next.js",
    "vue",
    "angular",
    "javascript",
    "typescript",
    "html",
    "css",
    "tailwind",
    "vite",
  ],

  backend: [
    "node.js",
    "express",
    "fastapi",
    "django",
    "spring boot",
    "java",
    "python",
    "golang",
  ],

  database: [
    "mongodb",
    "postgresql",
    "mysql",
    "redis",
    "vector db",
    "pinecone",
    "chroma",
  ],

  devops: [
    "docker",
    "kubernetes",
    "ci/cd",
    "jenkins",
    "github actions",
  ],

  cloud: [
    "aws",
    "gcp",
    "azure",
    "vercel",
  ],

  ai: [
    "langchain",
    "langgraph",
    "rag",
    "llm",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "huggingface",
    "gemini",
    "openai",
  ],
};

/* =========================================
   EXTRACTOR
========================================= */

export const extractSkills =
  (text) => {

    const lowerText =
      text.toLowerCase();

    const result = {

      frontend: [],
      backend: [],
      database: [],
      devops: [],
      cloud: [],
      ai: [],
    };

    Object.entries(
      TECH_SKILLS
    ).forEach(

      ([category, skills]) => {

        skills.forEach((skill) => {

          if (
            lowerText.includes(
              skill.toLowerCase()
            )
          ) {

            result[
              category
            ].push(skill);
          }
        });
      }
    );

    return result;
  };