import { resumeSchema } from "@/lib/schemas";
import { deepseek } from "@ai-sdk/deepseek";
import { generateObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { content } = await req.json();

  const result = await generateObject({
    model: deepseek("deepseek-chat"),
    messages: [
      {
        role: "system",
        content: `
You are a resume parser. Your job is to extract structured data from a resume document. Return the data as a JSON object with the following fields:

- profile: string
- skills: array of strings
- education: array of objects { degree, school, startDate, endDate, description }
- workExperience: array of objects { title, company, startDate, endDate, description }
- projects: array of objects { title, description, technologies }
- certifications: array of objects { name, issuer, date }
- languages: array of strings
- contact: object with { name, email, phone, location, linkedin }

If a field is not found, return null or an empty array.

Do not return any explanations. Only return a valid JSON object.
`.trim(),
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Parse this resume document:\n\n${content}`,
          },
        ],
      },
    ],
    schema: resumeSchema,
  });

  return result.toJsonResponse();
}
