import React, { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Link } from "@/components/ui/link";
import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { getProgress, textItemsToText } from "@/lib/utils";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface ResumeInputProps {
  isLoading: boolean;
  submit: (input: any) => void;
  jd: string;
}

interface ResumeFile {
  file: File;
  status: "idle" | "processing" | "success" | "error";
  message?: string;
}

export const ResumeInput = ({ isLoading, submit, jd }: ResumeInputProps) => {
  const [files, setFiles] = useState<ResumeFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const updated: ResumeFile[] = validFiles.map((file) => ({
      file,
      status: "idle",
    }));

    setFiles(updated);
  };

  // const encodeFileAsBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };
  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await Promise.all(
      files.map(async (item) => {
        const dataUrl = URL.createObjectURL(item.file);
        const textItems = await readPdf(dataUrl);
        const rawText = textItemsToText(textItems);
        submit({ jd, cv: rawText });
        return item.file.name;
      })
    );
    setIsSubmitting(false);
  };

  const clearPDF = () => {
    setFiles([]);
  };

  const progress = isLoading ? 50 : 100;

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
      <Card className="w-full max-w-md h-full border-0 sm:border sm:h-fit">
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
                        key={file.file.name}
                        className="font-medium text-foreground"
                      >
                        {file.file.name}
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
              disabled={files.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Parsing Resume...</span>
                </span>
              ) : (
                "Parse Resume"
              )}
            </Button>
          </form>
        </CardContent>
        {isSubmitting && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="w-full space-y-2">
              <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isSubmitting ? "bg-yellow-500/50 animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                  {isSubmitting
                    ? `Generating resume ...`
                    : "Analyzing PDF content"}
                </span>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
