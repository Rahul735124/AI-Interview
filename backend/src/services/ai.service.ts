import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const analyzeResumeContent = async (resumeText: string) => {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
    Analyze the following resume text and provide a structured JSON response. Do NOT include markdown formatting like \`\`\`json in your response, just return the raw JSON object.

    Resume Text:
    ${resumeText}

    Expected JSON structure:
    {
      "parsedData": {
        "skills": ["skill1", "skill2"],
        "experience": ["company1", "company2"],
        "education": ["degree1"]
      },
      "aiFeedback": {
        "score": 85,
        "missingSkills": ["React Query", "Docker"],
        "grammarSuggestions": ["Fix line 3 typo"],
        "atsCompatibility": 80,
        "improvementSuggestions": ["Add more metrics", "Use stronger action verbs"]
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const responseText = response.text || '{}';
    // Clean up potential markdown formatting if the model still outputs it
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};

export const interactWithAI = async (messages: { role: string; content: string }[]) => {
  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'ai' ? 'model' : msg.role === 'system' ? 'user' : msg.role,
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages as any,
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    return "I'm having trouble connecting right now. Let's pause for a moment.";
  }
};
