"use client";

import React, { useState } from "react";
import { ResumePreview } from "@/components/resume/resume-view";
import { ResumeScore } from "@/components/resume/resume-score";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ScoreResultExtended } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, ScanText, Target } from "lucide-react";

interface ResumeOverviewProps {
  name: string;
  result: ScoreResultExtended;
}

const ResumeOverview = ({ name, result }: ResumeOverviewProps) => {
  const [selectedToggles, setSelectedToggles] = useState<string[]>([]);

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center items-start justify-between">
        <div className="flex gap-2 items-center">
          <h2>{name}</h2>
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={selectedToggles}
            onValueChange={(value) => setSelectedToggles(value)}
          >
            <ToggleGroupItem value="analyzing" aria-label="Toggle analyzing">
              <Target className="h-4 w-4" />
              <span className="sm:inline hidden">Show analyzing</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="resume" aria-label="Toggle resume">
              <ScanText className="h-4 w-4" />
              <span className="sm:inline hidden">Show resume</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex gap-2 items-center">
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
      </div>
      {selectedToggles.includes("analyzing") && result?.data?.score && (
        <ResumeScore score={result?.data.score} />
      )}
      {selectedToggles.includes("resume") && result?.data?.resume && (
        <ResumePreview resume={result?.data.resume} />
      )}
    </Card>
  );
};

export default ResumeOverview;
