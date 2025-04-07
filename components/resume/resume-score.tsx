import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Score } from "@/lib/schemas";
import { Separator } from "@radix-ui/react-separator";

export const ResumeScore = ({ score }: { score: Score }) => {
  return (
    <div className="grid gap-4 md:grid-cols-1 px-4">
      {/* Score Section */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Score Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Total Score:</strong> {score.totalScore} / 100
          </div>
          {score.skillScore !== undefined && (
            <div>
              <strong>Skill:</strong> {score.skillScore}
            </div>
          )}
          {score.experienceScore !== undefined && (
            <div>
              <strong>Experience:</strong> {score.experienceScore}
            </div>
          )}
          {score.educationScore !== undefined && (
            <div>
              <strong>Education:</strong> {score.educationScore}
            </div>
          )}
          {score.languageScore !== undefined && (
            <div>
              <strong>Language:</strong> {score.languageScore}
            </div>
          )}
          {score.reasoning && (
            <>
              <Separator />
              <div>
                <strong>Reasoning:</strong>
                <p>{score.reasoning}</p>
              </div>
            </>
          )}
          {score.strengths?.length ? (
            <div>
              <strong>Strengths:</strong>
              <ul className="list-disc list-inside text-green-600">
                {score.strengths.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {score.weaknesses?.length ? (
            <div>
              <strong>Weaknesses:</strong>
              <ul className="list-disc list-inside text-red-600">
                {score.weaknesses.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {score.notes && (
            <div>
              <strong>Notes:</strong>
              <p>{score.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
