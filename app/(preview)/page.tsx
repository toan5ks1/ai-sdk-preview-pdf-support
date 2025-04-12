"use client";

import { useState } from "react";
import { JDInput } from "@/components/jd/jd-input";
import { ResumeInput } from "@/components/resume/resume-input";
import Footer from "@/components/layout/footer";
import { ScoreResultExtended } from "@/lib/types";
import ResumeOverview from "@/components/resume/resume-overview";

export interface ResultsList {
  [key: string]: ScoreResultExtended;
}

export default function ChatWithFiles() {
  const [jd, setJd] = useState("");
  const [results, setResults] = useState<ResultsList>({});

  return (
    <div className="flex sm:flex-row flex-col justify-center p-4 gap-4">
      <div className="flex sm:max-w-md flex-col gap-4">
        <JDInput value={jd} onChange={setJd} />
        <ResumeInput setResults={setResults} jd={jd} />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {Object.entries(results).map(([key, result]) => {
          return <ResumeOverview key={key} name={key} result={result} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
