import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Score } from "@/lib/schemas";
import { Separator } from "@radix-ui/react-separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ResumeScore = ({ score }: { score: Score }) => {
  return (
    <Card className="rounded-2xl shadow-md">
      <Accordion
        collapsible
        type="single"
        className="w-full"
        defaultValue="score"
      >
        <AccordionItem value="score" className="border-b-0">
          <AccordionTrigger>
            <CardTitle className="px-4">Score Result</CardTitle>
          </AccordionTrigger>
          <AccordionContent>
            {/* Score Section */}
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
                  <ul className="list-disc list-inside text-green-500">
                    {score.strengths.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {score.weaknesses?.length ? (
                <div>
                  <strong>Weaknesses:</strong>
                  <ul className="list-disc list-inside text-red-500">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
