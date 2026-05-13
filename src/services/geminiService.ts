import { GoogleGenAI } from "@google/genai";
import trafficData from "../data/traffic_laws.json";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are DriveLegal, an AI road safety legal assistant.
Answer traffic law and challan questions accurately using the provided dataset.
Be concise, beginner-friendly, and safety-focused.
Never hallucinate laws.
If uncertain, clearly say the information may vary by jurisdiction.
Show warning disclaimer: "This is informational and not official legal advice." at the end of every message.`;

interface Law {
  id: string;
  violation: string;
  fine: string;
  section: string;
  details: string;
  states: string[];
  recommendation: string;
}

export const searchLaws = (query: string): Law[] => {
  const normalizedQuery = query.toLowerCase();
  return trafficData.laws.filter(law => 
    law.violation.toLowerCase().includes(normalizedQuery) ||
    law.details.toLowerCase().includes(normalizedQuery) ||
    law.section.toLowerCase().includes(normalizedQuery)
  );
};

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const matchedLaws = searchLaws(message);
  
  let contextualPrompt = message;
  if (matchedLaws.length > 0) {
    const lawDetails = matchedLaws.map(law => 
      `Violation: ${law.violation}
      Fine: ${law.fine}
      Section: ${law.section}
      Details: ${law.details}
      Safety Recommendation: ${law.recommendation}`
    ).join('\n\n');
    
    contextualPrompt = `User Query: ${message}
    
    Matching traffic rules found in my local dataset:
    ${lawDetails}
    
    Please answer the user query based on these matching rules. Be factual and safe. If the user query is broader, you can provide general guidance too.`;
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
      history: history.length > 0 ? history : undefined,
    });

    const response = await chat.sendMessage({ message: contextualPrompt });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please try again later. \n\n*This is informational and not official legal advice.*";
  }
};
