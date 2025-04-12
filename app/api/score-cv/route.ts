import { resumeScoreSchema } from "@/lib/schemas";
import { deepseek } from "@ai-sdk/deepseek";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { jd, cv, fileName } = await req.json();

  const result = await generateObject({
    model: deepseek("deepseek-chat"),
    messages: [
      {
        role: "system",
        content: `You are an expert career advisor specialized in resume evaluation. Your task is to:
1. Extract structured resume data according to the required schema
2. Score the resume against the job description objectively
3. Return results in EXACTLY this format:
{
  "resume": { /* structured resume data */ },
  "score": { /* structured score data */ }
}

### Extraction Rules:
- Omit null/empty fields from the resume structure
- Preserve all original resume content (don't paraphrase)
- Maintain field names exactly as in the schema

### Scoring Guidelines:
1. Skills (30% weight):
   - Match between resume skills and JD requirements
   - Include both hard and soft skills

2. Experience (40% weight):
   - Relevance of past roles to JD
   - Years of experience in required areas
   - Notable achievements matching JD needs

3. Education (20% weight):
   - Degree relevance to JD
   - Prestige/recognition of institutions
   - Special certifications mentioned in JD

4. Languages (10% weight):
   - Only if specified in JD

### Output Requirements:
- education, workExperience, projects, certifications must be arrays 
- If a field is not found, return null or an empty array
- All scores must be integers between 0-100
- "reasoning" must explain score calculations
- "strengths/weaknesses" must be specific and actionable
- Never invent information not in the resume

Provide your evaluation in the exact specified format without deviation.`,
      },
      {
        role: "user",
        content: [
          { type: "text", text: `JOB DESCRIPTION:\n ${jd}` },
          {
            type: "text",
            text: `
CANDIDATE RESUME:\n${cv}`,
          },
        ],
      },
    ],
    schema: resumeScoreSchema,
  });

  return NextResponse.json({ fileName, data: result.object });
}
