import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudyContent } from "./content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.visible)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Sohm Dubey`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !project.visible) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
