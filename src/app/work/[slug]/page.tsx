import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkCaseStudy } from "@/components/public/work-case-study";
import { getWorkBySlug, listWork } from "@/content/queries";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listWork()).map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return {
      title: "Work",
      description: "Engineering work from Nguyen Tien Phat.",
    };
  }

  return {
    title: work.title,
    description: work.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <WorkCaseStudy work={work} />;
}
