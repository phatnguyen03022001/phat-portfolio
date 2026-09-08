import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkCaseStudy } from "@/components/public/work-case-study";
import { getPublishedWorkBySlug } from "@/content/queries";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getPublishedWorkBySlug(slug);

  if (!work) {
    return {
      title: "Work",
      description: "Published engineering work from Nguyen Tien Phat.",
    };
  }

  return {
    title: work.title,
    description: work.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getPublishedWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <WorkCaseStudy work={work} />;
}
