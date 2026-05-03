const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

const bookmarkSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.string(),
});

async function recommendMetaData(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: buildBookmarkPrompt(content),
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(bookmarkSchema),
      thinkingConfig: {
        thinkingBudget: 0,
      },
      maxOutputTokens: 200,
      temperature: 0.2,
    },
  });

  return JSON.parse(response.text);
}

function buildBookmarkPrompt(content) {
  return `You are a bookmark assistant.

Based on this website content, return:
1. A clear short title
2. A short description under 160 characters
3. Exactly 3 useful tags, tags always start upper case.

Webpage title:
${content.title}

Headings:
${content.headings.join(", ")}

Content:
${content.content}`;
}

module.exports = {
  recommendMetaData,
};
