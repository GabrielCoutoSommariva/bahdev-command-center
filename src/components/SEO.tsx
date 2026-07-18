import { useEffect } from "react";

const SITE_NAME = "Bahdev";
const SITE_URL = "https://www.bahdev.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/bahdev-link-preview.png`;

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
};

const setMeta = (selector: string, attribute: "name" | "property", value: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt = "Bahdev",
  type = "website",
  publishedAt,
  updatedAt,
  author = "Equipe Bahdev",
}: SEOProps) => {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", imageUrl);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", imageAlt);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);
    setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", imageAlt);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaId = "bahdev-page-schema";
    document.getElementById(schemaId)?.remove();

    const schema = document.createElement("script");
    schema.id = schemaId;
    schema.type = "application/ld+json";
    schema.text = JSON.stringify(
      type === "article"
        ? {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            image: [imageUrl],
            datePublished: publishedAt,
            dateModified: updatedAt ?? publishedAt,
            author: { "@type": "Organization", name: author },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
            },
            mainEntityOfPage: canonicalUrl,
          }
        : {
            "@context": "https://schema.org",
            "@type": path === "/blog" ? "Blog" : "WebPage",
            name: title,
            description,
            url: canonicalUrl,
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
    );
    document.head.appendChild(schema);

    return () => {
      document.getElementById(schemaId)?.remove();
    };
  }, [author, description, image, imageAlt, path, publishedAt, title, type, updatedAt]);

  return null;
};

export default SEO;
