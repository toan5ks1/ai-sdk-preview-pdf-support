import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths."
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on."
    ),
});

export type Question = z.infer<typeof questionSchema>;

export const questionsSchema = z.array(questionSchema).length(4);

const nullableString = z.string().optional().nullable();

export const resumeSchema = z.object({
  profile: nullableString,
  skills: z.array(z.string().optional()).optional().nullable(),
  education: z
    .array(
      z
        .object({
          degree: nullableString,
          school: nullableString,
          startDate: nullableString,
          endDate: nullableString,
          description: nullableString,
        })
        .optional()
    )
    .optional()
    .nullable(),
  workExperience: z
    .array(
      z
        .object({
          title: nullableString,
          company: nullableString,
          startDate: nullableString,
          endDate: nullableString, // <-- allow null
          description: nullableString, // <-- allow null
        })
        .optional()
    )
    .optional()
    .nullable(),
  projects: z
    .array(
      z
        .object({
          title: nullableString,
          description: nullableString,
          technologies: nullableString,
        })
        .optional()
    )
    .optional()
    .nullable(),
  certifications: z
    .array(
      z
        .object({
          name: nullableString,
          issuer: nullableString,
          date: nullableString,
        })
        .optional()
    )
    .optional()
    .nullable(),
  languages: z.array(z.string().optional()).optional().nullable(),
  contact: z
    .object({
      name: nullableString,
      email: nullableString,
      phone: nullableString,
      location: nullableString, // <-- allow null
      linkedin: nullableString,
    })
    .optional()
    .nullable(),
});

export type Resume = z.infer<typeof resumeSchema>;

export const scoreResultSchema = z.object({
  totalScore: z.number().min(0).max(100).optional(),
  skillScore: z.number().min(0).max(100).optional(),
  experienceScore: z.number().min(0).max(100).optional(),
  educationScore: z.number().min(0).max(100).optional(),
  languageScore: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  reasoning: z.string().optional(),
  strengths: z.array(z.string().optional()).optional(),
  weaknesses: z.array(z.string().optional()).optional(),
});

export type Score = z.infer<typeof scoreResultSchema>;

export const resumeScoreSchema = z.object({
  resume: resumeSchema,
  score: scoreResultSchema,
});

export const resumeScoreResultSchema = z.object({
  fileName: z.string(),
  data: resumeScoreSchema,
});
export type ScoreResult = z.infer<typeof resumeScoreSchema>;
