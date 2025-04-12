"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { resumeScoreSchema, ScoreResult } from "@/lib/schemas";
import { toast } from "sonner";
import { ResumePreview } from "@/components/resume/resume-view";
import { JDInput } from "@/components/jd/jd-input";
import { ResumeInput } from "@/components/resume/resume-input";
import Footer from "@/components/layout/footer";
import { ResumeScore } from "@/components/resume/resume-score";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ScoreResultExtended {
  status: "Idle" | "Success" | "Error";
  name: string;
  data: ScoreResult;
}

export default function ChatWithFiles() {
  // const [title, setTitle] = useState<string>();
  // const [rawText, setRawText] = useState<string>();
  const [jd, setJd] = useState("");
  const [results, setResults] = useState<ScoreResultExtended[]>([]);

  const { submit, isLoading } = useObject({
    api: "/api/score-cv",
    schema: resumeScoreSchema,
    initialValue: undefined,
    onFinish: ({ object }) => {
      if (object) {
        setResults((pre) => [
          ...pre,
          {
            name: object.resume.contact?.name ?? "ANONYMOUS",
            status: "Success",
            data: object,
          },
        ]);
      }
    },
    onError: (error) => {
      toast.error("Failed to score CV. Please try again.");
    },
  });

  return (
    <div className="flex justify-center py-6 gap-4">
      <div className="flex flex-col gap-4 min-w-fit">
        <JDInput value={jd} onChange={setJd} isSubmitting={isLoading} />
        <ResumeInput isLoading={isLoading} submit={submit} jd={jd} />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {results.map((result, index) => {
          return (
            <Card key={index} className="flex flex-col gap-4 p-4">
              <div className="flex gap-2">
                <h2>{result.data.resume.contact?.name}</h2>
                <Badge>{result.status}</Badge>
                <Badge>Total Score: {result.data.score.totalScore} / 100</Badge>
              </div>
              {result?.data.score && <ResumeScore score={result?.data.score} />}
              {result?.data.resume && (
                <ResumePreview
                  title={"CV Title"}
                  resume={result?.data.resume}
                />
              )}
            </Card>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
