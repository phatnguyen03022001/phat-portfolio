"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { requireOwnerSession } from "../../../../auth/server";
import {
  AdminWorkError,
  createDraftWork,
  parseCreateWorkForm,
  parseUpdateWorkForm,
  publishWork,
  unpublishWork,
  updateDraftWork,
} from "../../../../content/admin-work";
import { workItemSchema } from "../../../../content/model";

async function requireActionOwner(): Promise<void> {
  try {
    await requireOwnerSession(new Headers(await headers()));
  } catch {
    redirect("/admin/sign-in");
  }
}

function formSlug(formData: FormData): string {
  const value = formData.get("slug");
  return workItemSchema.shape.slug.parse(typeof value === "string" ? value.trim() : "");
}

function errorCode(error: unknown): "duplicate-slug" | "invalid" {
  return error instanceof AdminWorkError && error.code === "DUPLICATE_SLUG"
    ? "duplicate-slug"
    : "invalid";
}

function revalidateWork(slug: string): void {
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${slug}`);
  revalidatePath("/admin/work");
  revalidatePath(`/admin/work/${slug}`);
}

export async function createDraftAction(formData: FormData): Promise<void> {
  await requireActionOwner();
  let slug: string;

  try {
    const work = await createDraftWork(parseCreateWorkForm(formData), new Date());
    slug = work.slug;
  } catch (error) {
    redirect(`/admin/work/new?error=${errorCode(error)}`);
  }

  revalidateWork(slug);
  redirect(`/admin/work/${slug}`);
}

export async function updateDraftAction(formData: FormData): Promise<void> {
  await requireActionOwner();
  let slug = "";

  try {
    slug = formSlug(formData);
    const work = await updateDraftWork(slug, parseUpdateWorkForm(formData), new Date());
    slug = work.slug;
  } catch {
    const destination = slug ? `/admin/work/${slug}` : "/admin/work";
    redirect(`${destination}?error=invalid`);
  }

  revalidateWork(slug);
  redirect(`/admin/work/${slug}?saved=1`);
}

export async function publishWorkAction(formData: FormData): Promise<void> {
  await requireActionOwner();
  let slug = "";

  try {
    slug = formSlug(formData);
    const work = await publishWork(slug, new Date());
    slug = work.slug;
  } catch {
    const destination = slug ? `/admin/work/${slug}` : "/admin/work";
    redirect(`${destination}?error=invalid`);
  }

  revalidateWork(slug);
  redirect(`/admin/work/${slug}?published=1`);
}

export async function unpublishWorkAction(formData: FormData): Promise<void> {
  await requireActionOwner();
  let slug = "";

  try {
    slug = formSlug(formData);
    const work = await unpublishWork(slug, new Date());
    slug = work.slug;
  } catch {
    const destination = slug ? `/admin/work/${slug}` : "/admin/work";
    redirect(`${destination}?error=invalid`);
  }

  revalidateWork(slug);
  redirect(`/admin/work/${slug}?unpublished=1`);
}
