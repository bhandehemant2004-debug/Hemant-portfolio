"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Split into blocks
  const blocks = content.split("\n\n");

  return (
    <div className="space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        // Code block
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const firstLine = lines[0].replace("```", "").trim();
          const language = firstLine || "text";
          const code = lines.slice(1, lines[lines.length - 1].startsWith("```") ? -1 : undefined).join("\n");

          return <CodeBlock key={index} code={code} language={language} />;
        }

        // Heading 2
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="text-xl sm:text-2xl font-bold tracking-tight text-foreground pt-4 pb-1 border-b border-border/30"
            >
              {renderInline(trimmed.replace("## ", ""))}
            </h2>
          );
        }

        // Heading 3
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground pt-3"
            >
              {renderInline(trimmed.replace("### ", ""))}
            </h3>
          );
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="pl-4 py-1 border-l-2 border-emerald-500/70 italic text-muted-foreground bg-secondary/20 rounded-r-lg my-4"
            >
              {renderInline(trimmed.replace(/^>\s*/gm, ""))}
            </blockquote>
          );
        }

        // Bullet lists
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
          return (
            <ul key={index} className="space-y-2 list-none pl-2 my-4">
              {items.map((item, itemIdx) => {
                const text = item.replace(/^[-*]\s+/, "");
                return (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{renderInline(text)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l.trim()));
          return (
            <ol key={index} className="space-y-2 list-none pl-2 my-4">
              {items.map((item, itemIdx) => {
                const match = item.match(/^(\d+)\.\s+(.*)/);
                const num = match ? match[1] : `${itemIdx + 1}`;
                const text = match ? match[2] : item;
                return (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 mt-0.5 shrink-0">
                      {num}.
                    </span>
                    <span>{renderInline(text)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl border border-border/60 bg-zinc-950 overflow-hidden my-6 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/60 border-b border-border/40 text-xs font-mono text-zinc-400">
        <span className="text-[11px] uppercase font-bold text-emerald-400/90">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // Handle bold, inline code, and links
  const parts = [];
  let key = 0;

  // Regex for bold `**text**` and inline code `` `code` ``
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={key++} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-secondary/80 border border-border/50 text-emerald-400 font-mono text-xs"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
