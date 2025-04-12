"use client";

import { useState } from "react";
import { ResumePreview } from "@/components/resume/resume-view";
import { JDInput } from "@/components/jd/jd-input";
import { ResumeInput } from "@/components/resume/resume-input";
import Footer from "@/components/layout/footer";
import { ResumeScore } from "@/components/resume/resume-score";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScoreResultExtended } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";

export interface ResultsList {
  [key: string]: ScoreResultExtended;
}

export default function ChatWithFiles() {
  const [jd, setJd] = useState("");
  const [results, setResults] = useState<ResultsList>({});

  return (
    <div className="flex justify-center py-6 gap-4">
      <div className="flex flex-col gap-4 min-w-fit">
        <JDInput value={jd} onChange={setJd} />
        <ResumeInput setResults={setResults} jd={jd} />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {Object.entries(results).map(([key, result]) => {
          return (
            <Card key={key} className="flex gap-4 p-4">
              <div className="flex gap-2">
                <h2>{key}</h2>
                <Badge className="flex items-center gap-1">
                  {capitalizeFirstLetter(result.status)}
                  <div
                    className={`h-2 w-2 rounded-full ${
                      result.status === "processing"
                        ? "bg-yellow-500 animate-pulse"
                        : result.status === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </Badge>
                <Badge>
                  Total Score: {result.data?.score.totalScore ?? "N/A"} / 100
                </Badge>
              </div>
              {result?.data?.score && (
                <ResumeScore score={result?.data.score} />
              )}
              {result?.data?.resume && (
                <ResumePreview resume={result?.data.resume} />
              )}
            </Card>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
