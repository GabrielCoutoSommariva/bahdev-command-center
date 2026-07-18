import { Lightbulb, Quote } from "lucide-react";
import type { BlogBlock } from "@/lib/blog";

const ArticleContent = ({ blocks }: { blocks: BlogBlock[] }) => (
  <div className="blog-prose">
    {blocks.map((block, index) => {
      if (block.type === "heading") {
        return (
          <h2 id={block.id} key={`${block.id}-${index}`}>
            {block.text}
          </h2>
        );
      }

      if (block.type === "paragraph") {
        return <p key={`paragraph-${index}`}>{block.text}</p>;
      }

      if (block.type === "list") {
        return (
          <ul key={`list-${index}`}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      }

      if (block.type === "callout") {
        return (
          <aside className="blog-callout" key={`callout-${index}`}>
            <Lightbulb aria-hidden="true" />
            <div>
              <strong>{block.title}</strong>
              <p>{block.text}</p>
            </div>
          </aside>
        );
      }

      return (
        <blockquote key={`quote-${index}`}>
          <Quote aria-hidden="true" />
          <p>{block.text}</p>
        </blockquote>
      );
    })}
  </div>
);

export default ArticleContent;
