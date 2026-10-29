import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { formatPostDate, POSTS } from "@/lib/blog";
import { Breadcrumb, Eyebrow } from "@/components/site/ui";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Novidades, eventos e cursos da OPAM KARATE, em Itaquera, São Paulo.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="px-5 pt-7 pb-8 md:px-14 md:pt-16 md:pb-14 flex flex-col gap-3 md:gap-5">
        <Breadcrumb current="Blog" />
        <Eyebrow>Blog</Eyebrow>
        <h1 className="text-[42px] md:text-[72px] leading-[0.98] font-extrabold tracking-[-0.035em]">
          Novidades do dojo.
        </h1>
        <p className="max-w-[520px] text-base md:text-[19px] leading-[1.5] text-muted-ink">
          Eventos, cursos e avisos da equipe OPAM.
        </p>
      </section>

      <section className="px-5 pb-16 md:px-14 md:pb-24 grid gap-5 md:grid-cols-2">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-4 md:gap-6 border-t-2 border-ink pt-4 md:pt-6"
          >
            <figure className="relative overflow-hidden rounded-md bg-ink/5 aspect-[3/4]">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(min-width: 768px) 180px, 120px"
                className="object-cover"
              />
            </figure>
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex flex-wrap items-center gap-x-3 text-xs md:text-[13px] font-bold uppercase tracking-[0.14em]">
                <span className="text-opam">{post.category}</span>
                <span className="text-faint">{formatPostDate(post.date)}</span>
              </div>
              <h2 className="text-xl md:text-[28px] leading-[1.1] font-extrabold tracking-[-0.02em] group-hover:text-opam transition-colors">
                {post.title}
              </h2>
              <p className="text-sm md:text-base leading-[1.5] text-muted-ink">
                {post.excerpt}
              </p>
              <span className="mt-auto text-[15px] font-bold">
                Ler mais <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
