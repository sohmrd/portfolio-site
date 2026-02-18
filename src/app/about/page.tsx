import type { Metadata } from "next";
import { AboutPageContent } from "./about-content";

export const metadata: Metadata = {
  title: "Sohm Dubey | About",
  description:
    "Georgia Tech senior dual-majoring in Industrial Design and Computer Science. Creative technologist building at the intersection of physical product design and real software engineering.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
