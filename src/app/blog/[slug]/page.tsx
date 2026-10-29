import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, POSTS, type PostBlock } from "@/lib/blog";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { Eyebrow, SiteButton } from "@/components/site/ui";
import { RichText } from "@/components/site/RichText";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    article: { publishedTime: post.date, image: post.image.src },
  });
}

const linkClass = "text-opam font-bold underline underline-offset-4 hover:text-opam-dark";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function Block({ block }: { block: PostBlock }) {
  if ("h2" in block) {
    return (
      <h2 className="mt-10 text-[26px] md:text-[34px] leading-[1.1] font-extrabold tracking-[-0.02em]">
        {block.h2}
      </h2>
    );
  }
  if ("p" in block) {
    return (
      <p className="mt-4 text-base md:text-lg leading-[1.7] text-body">
        <RichText text={block.p} linkClassName={linkClass} />
      </p>
    );
  }
  if ("ul" in block) {
    return (
      <ul className="mt-4 border-t-2 border-ink">
        {block.ul.map((item) => (
          <li
            key={item}
            className="border-b border-ink/12 py-3 text-base md:text-lg leading-[1.45] text-body"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if ("links" in block) {
    return (
      <ul className="mt-4 flex flex-col gap-2">
        {block.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              {...(isExternal(l.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={linkClass}
            >
              {l.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <figure className="mt-5 rounded-md border border-ink/15 bg-white p-5 md:p-6">
      <Eyebrow>@opamkarate no Instagram</Eyebrow>
      <blockquote className="mt-3 text-base md:text-lg leading-[1.6] text-body">
        “{block.instagram.caption}”
      </blockquote>
      <SiteButton href={block.instagram.href} external tone="ink" className="mt-5">
        Ver publicação no Instagram ↗
      </SiteButton>
    </figure>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image.src}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <article className="px-5 pt-7 pb-16 md:px-14 md:pt-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="hidden md:block text-[13px] text-faint">
        <Link href="/" className="hover:text-opam">Início</Link> /{" "}
        <Link href="/blog" className="hover:text-opam">Blog</Link> /{" "}
        <b className="text-ink">{post.category}</b>
      </nav>

      <div className="mt-4 md:mt-8 grid gap-8 md:grid-cols-[1fr_340px] md:gap-14 items-start">
        <div className="max-w-[720px]">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="mt-3 text-[34px] md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.03em]">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-faint">
            {formatPostDate(post.date)} · {post.minutes} min de leitura
          </p>
          <div className="mt-2">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>

        <aside className="md:sticky md:top-24 flex flex-col gap-4">
          <figure className="relative overflow-hidden rounded-md bg-ink/5 aspect-[3/4]">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 340px, 100vw"
              className="object-cover"
            />
          </figure>
          <SiteButton href={post.cta.href} external>
            {post.cta.label} →
          </SiteButton>
        </aside>
      </div>
    </article>
  );
}
