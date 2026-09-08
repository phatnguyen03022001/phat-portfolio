import ReactMarkdown from "react-markdown";

import { safeMarkdownUrl } from "../../content/case-study";

type MarkdownContentProps = {
  markdown: string;
};

function transformMarkdownUrl(url: string): string | undefined {
  return safeMarkdownUrl(url) || undefined;
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown skipHtml urlTransform={transformMarkdownUrl}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
