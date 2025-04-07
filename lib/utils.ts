import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { TextItem } from "./types";
import { Resume } from "./schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Server side object deep clone util using JSON serialization.
 * Not efficient for large objects but good enough for most use cases.
 *
 * Client side can simply use structuredClone.
 */
export const deepClone = <T extends { [key: string]: any }>(object: T) =>
  JSON.parse(JSON.stringify(object)) as T;

export const textItemsToText = (
  textItems: TextItem[],
  options?: {
    groupByLine?: boolean;
  }
): string => {
  const { groupByLine = true } = options || {};

  if (!groupByLine) {
    return textItems.map((item) => item.text).join(" ");
  }

  // Group by y-position to preserve lines (rounded to avoid float inconsistencies)
  const groupedByY = _.groupBy(textItems, (item) => Math.round(item.y));

  // Sort by y descending (PDF origin is bottom-left)
  const sortedYGroups = Object.entries(groupedByY).sort(
    ([yA], [yB]) => Number(yB) - Number(yA)
  );

  const lines = sortedYGroups.map(([_, lineItems]) =>
    lineItems
      .sort((a, b) => a.x - b.x)
      .map((i) => i.text)
      .join(" ")
  );

  return lines.join("\n");
};

export const getProgress = (resume: Resume): number => {
  const fields = [
    resume.profile,
    resume.skills,
    resume.education,
    resume.workExperience,
    resume.projects,
    resume.certifications,
    resume.languages,
    resume.contact?.name,
    resume.contact?.email,
    resume.contact?.phone,
    resume.contact?.location,
    resume.contact?.linkedin,
  ];

  const filledFields = fields.filter(Boolean).length;
  const totalFields = fields.length;

  return (filledFields / totalFields) * 100;
};
