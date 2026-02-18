import type { Metadata } from "next";
import { WorkPageContent } from "./work-content";

export const metadata: Metadata = {
  title: "Sohm Dubey | Work",
  description:
    "All projects spanning product design, embedded systems, computer vision, and spatial computing.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
