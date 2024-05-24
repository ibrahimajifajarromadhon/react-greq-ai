import { Groq } from "groq-sdk";

const GROG_API = import.meta.env.VITE_GROQ;

const groq = new Groq({
  apiKey: GROG_API,
  dangerouslyAllowBrowser: true,
});

export const requestToGroqAi = async (content) => {
  const reply = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content
      },
    ],
    model: "llama3-8b-8192",
  });

  return reply.choices[0].message.content;
};