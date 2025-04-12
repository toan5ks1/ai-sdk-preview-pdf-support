import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUp, Plus, Loader2 } from "lucide-react";

type JDInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};

export const JDInput: React.FC<JDInputProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <Card className="w-full h-full border-0 sm:border sm:h-fit">
      <CardHeader className="text-center space-y-6">
        {/* <div className="mx-auto flex items-center justify-center space-x-2 text-muted-foreground">
          <div className="rounded-full bg-primary/10 p-2">
            <FileUp className="h-6 w-6" />
          </div>
          <Plus className="h-4 w-4" />
          <div className="rounded-full bg-primary/10 p-2">
            <Loader2 className="h-6 w-6" />
          </div>
        </div> */}
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Job Description</CardTitle>
          <CardDescription className="text-base">
            Upload a PDF or input job description
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste or write the job description here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px]"
          disabled={isSubmitting}
        />
      </CardContent>
    </Card>
  );
};
