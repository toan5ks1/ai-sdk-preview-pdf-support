import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Resume } from "@/lib/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = { title?: string; resume: Resume };

export const ResumePreview: React.FC<Props> = ({ resume, title }) => {
  if (!resume) return null;

  return (
    <Card className="rounded-2xl shadow-md">
      <Accordion
        collapsible
        type="single"
        className="w-full"
        defaultValue="resume"
      >
        <AccordionItem value="resume" className="border-b-0">
          <AccordionTrigger>
            <CardTitle className="px-4">Parsed Resume</CardTitle>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="profile">
                  <AccordionTrigger>Profile</AccordionTrigger>
                  <AccordionContent>{resume.profile || "N/A"}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="skills">
                  <AccordionTrigger>Skills</AccordionTrigger>
                  <AccordionContent>
                    {resume.skills?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, i) =>
                          skill ? <Badge key={i}>{skill}</Badge> : null
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="education">
                  <AccordionTrigger>Education</AccordionTrigger>
                  <AccordionContent>
                    {resume.education?.length
                      ? resume.education.map((edu, i) => (
                          <div key={i} className="mb-4">
                            <div className="font-semibold">{edu?.degree}</div>
                            <div>{edu?.school}</div>
                            <div className="text-sm text-muted-foreground">
                              {edu?.startDate} - {edu?.endDate}
                            </div>
                            <p>{edu?.description}</p>
                            <Separator className="my-2" />
                          </div>
                        ))
                      : "N/A"}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="workExperience">
                  <AccordionTrigger>Work Experience</AccordionTrigger>
                  <AccordionContent>
                    {resume.workExperience?.length
                      ? resume.workExperience.map((job, i) => (
                          <div key={i} className="mb-4">
                            <div className="font-semibold">
                              {job?.title} @ {job?.company}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {job?.startDate} - {job?.endDate}
                            </div>
                            <p>{job?.description}</p>
                            <Separator className="my-2" />
                          </div>
                        ))
                      : "N/A"}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="projects">
                  <AccordionTrigger>Projects</AccordionTrigger>
                  <AccordionContent>
                    {resume.projects?.length
                      ? resume.projects.map((proj, i) => (
                          <div key={i} className="mb-4">
                            <div className="font-semibold">{proj?.title}</div>
                            <p>{proj?.description}</p>
                            <div className="text-sm text-muted-foreground">
                              {proj?.technologies}
                            </div>
                            <Separator className="my-2" />
                          </div>
                        ))
                      : "N/A"}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="certifications">
                  <AccordionTrigger>Certifications</AccordionTrigger>
                  <AccordionContent>
                    {resume.certifications?.length
                      ? resume.certifications.map((cert, i) => (
                          <div key={i} className="mb-2">
                            <div>
                              {cert?.name} – {cert?.issuer}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {cert?.date}
                            </div>
                          </div>
                        ))
                      : "N/A"}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="languages">
                  <AccordionTrigger>Languages</AccordionTrigger>
                  <AccordionContent>
                    {resume.languages?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {resume.languages.map((lang, i) =>
                          lang ? <Badge key={i}>{lang}</Badge> : null
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="contact">
                  <AccordionTrigger>Contact</AccordionTrigger>
                  <AccordionContent>
                    {resume.contact ? (
                      <div className="space-y-1">
                        <div>
                          <strong>Name:</strong> {resume.contact.name}
                        </div>
                        <div>
                          <strong>Email:</strong> {resume.contact.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {resume.contact.phone}
                        </div>
                        <div>
                          <strong>Location:</strong> {resume.contact.location}
                        </div>
                        <div>
                          <strong>LinkedIn:</strong> {resume.contact.linkedin}
                        </div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
