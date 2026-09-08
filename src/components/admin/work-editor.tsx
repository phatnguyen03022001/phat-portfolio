import type { WorkItem } from "../../content/model";
import { workCategorySchema, workCollectionSchema } from "../../content/model";
import {
  createDraftAction,
  publishWorkAction,
  unpublishWorkAction,
  updateDraftAction,
} from "../../app/admin/(protected)/work/actions";

type WorkEditorProps =
  | { mode: "create"; work?: never }
  | { mode: "edit"; work: WorkItem };

function structured(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function EditableFields({ work }: { work?: WorkItem }) {
  return (
    <div className="admin-work-form__grid">
      <label>
        Title
        <input name="title" required maxLength={200} defaultValue={work?.title ?? ""} />
      </label>
      <label className="admin-work-form__wide">
        Summary
        <textarea name="summary" required maxLength={2000} rows={4} defaultValue={work?.summary ?? ""} />
      </label>
      <label>
        Category
        <select name="category" defaultValue={work?.category ?? "PRODUCT_DOMAIN"}>
          {workCategorySchema.options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label>
        Collection
        <select name="collection" defaultValue={work?.collection ?? "WORK"}>
          {workCollectionSchema.options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label>
        Featured rank
        <input name="featuredRank" type="number" min={0} max={999} defaultValue={work?.featuredRank ?? ""} />
      </label>
      <label>
        Current rank
        <input name="currentRank" type="number" min={0} max={999} defaultValue={work?.currentRank ?? ""} />
      </label>
      <StructuredField name="repositoryReferences" label="Repository references" value={work?.repositoryReferences ?? []} />
      <StructuredField name="sections" label="Case-study sections" value={work?.sections ?? []} rows={14} />
      <StructuredField name="evidence" label="Evidence records" value={work?.evidence ?? []} rows={14} />
      <StructuredField name="technologies" label="Technologies" value={work?.technologies ?? []} />
      <StructuredField name="externalLinks" label="External links" value={work?.externalLinks ?? []} />
    </div>
  );
}

function StructuredField({
  name,
  label,
  value,
  rows = 8,
}: {
  name: string;
  label: string;
  value: unknown;
  rows?: number;
}) {
  return (
    <label className="admin-work-form__wide">
      {label}
      <textarea name={name} rows={rows} defaultValue={structured(value)} spellCheck={false} />
      <span className="admin-field-help">Bounded JSON matching the existing WorkItem schema.</span>
    </label>
  );
}

function ReadOnlyWork({ work }: { work: WorkItem }) {
  return (
    <div className="admin-work-readonly">
      <dl>
        <div><dt>Slug</dt><dd>{work.slug}</dd></div>
        <div><dt>Title</dt><dd>{work.title}</dd></div>
        <div><dt>Summary</dt><dd>{work.summary}</dd></div>
        <div><dt>Category</dt><dd>{work.category}</dd></div>
        <div><dt>Collection</dt><dd>{work.collection}</dd></div>
        <div><dt>Published</dt><dd>{work.publishedAt?.toISOString() ?? "—"}</dd></div>
      </dl>
      <pre>{structured({
        featuredRank: work.featuredRank,
        currentRank: work.currentRank,
        repositoryReferences: work.repositoryReferences,
        sections: work.sections,
        evidence: work.evidence,
        technologies: work.technologies,
        externalLinks: work.externalLinks,
      })}</pre>
    </div>
  );
}

export function WorkEditor(props: WorkEditorProps) {
  if (props.mode === "create") {
    return (
      <form action={createDraftAction} className="admin-work-form">
        <label>
          Slug
          <input name="slug" required maxLength={160} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" />
          <span className="admin-field-help">Create-only public identifier. It cannot be renamed later.</span>
        </label>
        <EditableFields />
        <button className="admin-button" type="submit">Create draft</button>
      </form>
    );
  }

  const { work } = props;
  if (work.publicationStatus === "PUBLISHED") {
    return (
      <div className="admin-work-editor">
        <p className="admin-work-status"><strong>PUBLISHED</strong> — content is read-only until explicitly unpublished.</p>
        <ReadOnlyWork work={work} />
        <form action={unpublishWorkAction}>
          <input type="hidden" name="slug" value={work.slug} />
          <button className="admin-button admin-button--danger" type="submit">Unpublish</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-work-editor">
      <p className="admin-work-status"><strong>DRAFT</strong> — editable and absent from anonymous public queries.</p>
      <p className="admin-work-slug"><strong>Slug:</strong> {work.slug}</p>
      <form action={updateDraftAction} className="admin-work-form">
        <input type="hidden" name="slug" value={work.slug} />
        <EditableFields work={work} />
        <button className="admin-button" type="submit">Save draft</button>
      </form>
      <form action={publishWorkAction} className="admin-work-publish">
        <input type="hidden" name="slug" value={work.slug} />
        <button className="admin-button" type="submit">Publish</button>
      </form>
    </div>
  );
}
