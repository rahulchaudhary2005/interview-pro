import {
  HfInference,
} from "@huggingface/inference";



const hf =
  new HfInference(

    process.env
      .HUGGINGFACE_API_KEY
  );



/* =========================================
   HF GENERATION
========================================= */

export async function
  generateHFResponse(
    prompt
  ) {

  try {

    const response =
      await hf.chatCompletion({

        model:
          "HuggingFaceH4/zephyr-7b-beta",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        max_tokens: 1200,

        temperature: 0.3,
      });



    return response
      .choices?.[0]
      ?.message
      ?.content || "";

  } catch (error) {

    console.log(
      "HF ERROR:",
      error.message
    );

    throw error;
  }
}