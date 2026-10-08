import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Share2, Tag, BookOpen, Check } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — Hemant's Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all posts</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6 pb-8 border-b border-border/40">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author & Tags */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary border border-border/60 flex items-center justify-center font-bold text-sm text-foreground">
              H
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground block">
                {post.author.name}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {post.author.role}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="prose prose-invert prose-zinc max-w-none">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Footer & Related Posts */}
      <footer className="pt-12 border-t border-border/40 space-y-8">
        <h3 className="text-lg font-bold text-foreground">Related Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="p-5 rounded-2xl border border-border/60 bg-secondary/20 hover:bg-secondary/40 hover:border-border transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400">
                  {related.readTime}
                </span>
                <h4 className="text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                  {related.title}
                </h4>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
