import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  headers: vi.fn(),
  redirect: vi.fn(),
  revalidatePath: vi.fn(),
  requireOwnerSession: vi.fn(),
  createDraftWork: vi.fn(),
  updateDraftWork: vi.fn(),
  publishWork: vi.fn(),
  unpublishWork: vi.fn(),
}));

vi.mock("next/headers", () => ({ headers: mocks.headers }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("../../../../auth/server", () => ({ requireOwnerSession: mocks.requireOwnerSession }));
vi.mock("../../../../content/admin-work", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../../content/admin-work")>();
  return {
    ...actual,
    createDraftWork: mocks.createDraftWork,
    updateDraftWork: mocks.updateDraftWork,
    publishWork: mocks.publishWork,
    unpublishWork: mocks.unpublishWork,
  };
});

import { AdminWorkError } from "../../../../content/admin-work";
import {
  createDraftAction,
  publishWorkAction,
  unpublishWorkAction,
  updateDraftAction,
} from "./actions";

class RedirectSignal extends Error {
  constructor(readonly path: string) {
    super(`redirect:${path}`);
  }
}

function validCreateForm(): FormData {
  const form = new FormData();
  form.set("slug", "editorial-work");
  form.set("title", "Editorial Work");
  form.set("summary", "A bounded editorial work item used to prove owner publishing.");
  form.set("category", "PRODUCT_DOMAIN");
  form.set("collection", "WORK");
  form.set("featuredRank", "1");
  form.set("currentRank", "");
  form.set("repositoryReferences", "[]");
  form.set("sections", "[]");
  form.set("evidence", "[]");
  form.set("technologies", "[]");
  form.set("externalLinks", "[]");
  return form;
}

function unreadablePayload(): FormData {
  return new Proxy(new FormData(), {
    get(target, property, receiver) {
      if (property === "get") throw new Error("payload was read before authorization");
      return Reflect.get(target, property, receiver);
    },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.headers.mockResolvedValue(new Headers({ origin: "https://phat.picmao.com" }));
  mocks.redirect.mockImplementation((path: string) => {
    throw new RedirectSignal(path);
  });
});

describe("owner work actions", () => {
  it.each([
    ["create", createDraftAction, mocks.createDraftWork],
    ["update", updateDraftAction, mocks.updateDraftWork],
    ["publish", publishWorkAction, mocks.publishWork],
    ["unpublish", unpublishWorkAction, mocks.unpublishWork],
  ])("rejects anonymous %s before reading payload or mutating Mongo", async (_label, action, mutation) => {
    mocks.requireOwnerSession.mockRejectedValueOnce(new Error("Owner authorization required."));

    await expect(action(unreadablePayload())).rejects.toMatchObject({ path: "/admin/sign-in" });

    expect(mocks.requireOwnerSession).toHaveBeenCalledTimes(1);
    expect(mutation).not.toHaveBeenCalled();
  });

  it("creates a draft only after the accepted owner authorization gate", async () => {
    mocks.requireOwnerSession.mockResolvedValueOnce({ user: { id: "owner" } });
    mocks.createDraftWork.mockResolvedValueOnce({ slug: "editorial-work" });

    await expect(createDraftAction(validCreateForm())).rejects.toMatchObject({
      path: "/admin/work/editorial-work",
    });

    expect(mocks.requireOwnerSession).toHaveBeenCalledTimes(1);
    expect(mocks.createDraftWork).toHaveBeenCalledWith(
      expect.objectContaining({ slug: "editorial-work" }),
      expect.any(Date),
    );
    expect(mocks.createDraftWork.mock.calls[0][0]).not.toHaveProperty("publicationStatus");
    expect(mocks.createDraftWork.mock.calls[0][0]).not.toHaveProperty("publishedAt");
    expect(mocks.requireOwnerSession.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.createDraftWork.mock.invocationCallOrder[0],
    );
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/admin/work");
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/work/editorial-work");
  });

  it("maps duplicate slug and unexpected failures to bounded public error codes", async () => {
    mocks.requireOwnerSession.mockResolvedValue({ user: { id: "owner" } });
    mocks.createDraftWork.mockRejectedValueOnce(
      new AdminWorkError("DUPLICATE_SLUG", "database-specific duplicate detail"),
    );

    await expect(createDraftAction(validCreateForm())).rejects.toMatchObject({
      path: "/admin/work/new?error=duplicate-slug",
    });

    mocks.createDraftWork.mockRejectedValueOnce(new Error("mongodb://secret-host/raw failure"));
    await expect(createDraftAction(validCreateForm())).rejects.toMatchObject({
      path: "/admin/work/new?error=invalid",
    });

    for (const call of mocks.redirect.mock.calls) {
      expect(String(call[0])).not.toMatch(/mongodb|secret-host|database-specific/i);
    }
  });
});
