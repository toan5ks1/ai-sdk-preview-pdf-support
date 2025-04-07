import React from "react";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { VercelIcon, GitIcon } from "@/components/icons";

const Footer = () => {
  return (
    <motion.div
      className="flex flex-row gap-4 items-center justify-between fixed bottom-2 right-4 text-xs "
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <NextLink
        target="_blank"
        href="https://github.com/vercel-labs/ai-sdk-preview-pdf-support"
        className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
      >
        <GitIcon />
        View Source Code
      </NextLink>

      <NextLink
        target="_blank"
        href="https://vercel.com/templates/next.js/ai-quiz-generator"
        className="flex flex-row gap-2 items-center bg-zinc-900 px-2 py-1.5 rounded-md text-zinc-50 hover:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
      >
        <VercelIcon size={14} />
        Deploy with Vercel
      </NextLink>
    </motion.div>
  );
};

export default Footer;
