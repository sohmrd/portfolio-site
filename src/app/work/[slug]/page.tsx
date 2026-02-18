import { notFound } from "next/navigation";
import { getProject, getNextProject, projects } from "@/content/projects";
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
    title: `Sohm Dubey | ${project.title}`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !project.visible) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return <CaseStudyContent project={project} nextProject={nextProject} />;
}
