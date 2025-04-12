import React, { Dispatch, SetStateAction, useState } from "react";
import { FileUp, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { textItemsToText } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { experimental_useObject as useObject } from "ai/react";
import { resumeScoreResultSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { ScoreResultStatus } from "@/lib/types";
import { ResultsList } from "@/app/(preview)/page";

interface ResumeInputProps {
  jd: string;
  setResults: Dispatch<SetStateAction<ResultsList>>;
}

export const ResumeInput = ({ jd, setResults }: ResumeInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { submit, isLoading } = useObject({
    api: "/api/score-cv",
    schema: resumeScoreResultSchema,
    initialValue: undefined,
    onFinish: ({ object }) => {
      if (object) {
        console.log(object);
        const { fileName, data } = object;
        setResults((pre) => ({
          ...pre,
          [fileName]: {
            status: "success",
            data,
          },
        }));
      }
    },
    onError: (error) => {
      toast.error("Failed to score CV. Please try again.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isDragging) {
      toast.error(
        "Safari does not support drag & drop. Please use the file picker."
      );
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
    }

    setFiles(validFiles);
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFiles = {} as ResultsList;
    files.forEach((file) => {
      allFiles[file.name] = {
        status: "idle" as ScoreResultStatus,
      };
    });

    setResults(allFiles);

    files.forEach(async (file) => {
      const dataUrl = URL.createObjectURL(file);
      const textItems = await readPdf(dataUrl);
      const rawText = textItemsToText(textItems);

      setResults((pre) => ({
        ...pre,
        [file.name]: {
          status: "processing",
        },
      }));
      submit({ fileName: file.name, jd, cv: rawText });
    });
  };

  const clearPDF = () => {
    setFiles([]);
  };

  return (
    <div
      className="w-full flex justify-center"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragExit={() => setIsDragging(false)}
      onDragEnd={() => setIsDragging(false)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        console.log(e.dataTransfer.files);
        handleFileChange({
          target: { files: e.dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop files here</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(PDFs only)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="w-full h-full border-0 sm:border sm:h-fit">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="rounded-full bg-primary/10 p-2">
              <FileUp className="h-6 w-6" />
            </div>
            <Plus className="h-4 w-4" />
            <div className="rounded-full bg-primary/10 p-2">
              <Loader2 className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              PDF Resume Parser
            </CardTitle>
            <CardDescription className="text-base">
              Upload a PDF to generate an interactive resume based on its
              content using the <Link href="https://sdk.vercel.ai">AI SDK</Link>{" "}
              and{" "}
              <Link href="https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai">
                Deepseek&apos;s Chat
              </Link>
              .
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitWithFiles} className="space-y-4">
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors hover:border-muted-foreground/50`}
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground text-center">
                {files.length > 0 ? (
                  files.map((file) => {
                    return (
                      <p
                        key={file.name}
                        className="font-medium text-foreground"
                      >
                        {file.name}
                      </p>
                    );
                  })
                ) : (
                  <span>Drop your PDF here or click to browse.</span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={files.length === 0 || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing Resume...</span>
                </span>
              ) : (
                "Parse Resume"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
