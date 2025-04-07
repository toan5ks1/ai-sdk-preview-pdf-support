"use client";

import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { resumeSchema, resumeScoreSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { ResumePreview } from "@/components/resume/resume-view";
import { JDInput } from "@/components/jd/jd-input";
import { ResumeInput } from "@/components/resume/resume-input";
import Footer from "@/components/layout/footer";
import { ResumeScore } from "@/components/resume/resume-score";

export default function ChatWithFiles() {
  // const [title, setTitle] = useState<string>();
  // const [rawText, setRawText] = useState<string>();
  const [jd, setJd] = useState("");

  const {
    submit,
    object: result,
    isLoading,
  } = useObject({
    api: "/api/score-cv",
    schema: resumeScoreSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to score CV. Please try again.");
    },
  });

  return (
    <div className="flex justify-center py-6">
      <div className="flex flex-col gap-4 min-w-fit">
        <JDInput value={jd} onChange={setJd} isSubmitting={isLoading} />
        <ResumeInput isLoading={isLoading} submit={submit} jd={jd} />
      </div>

      <div className="flex flex-col gap-4">
        {result?.score && <ResumeScore score={result?.score} />}
        {result?.resume && (
          <ResumePreview title={"CV Title"} resume={result?.resume} />
        )}
      </div>
      <Footer />
    </div>
  );
}
