import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { QA } from "../data/modules";

interface QACardProps {
  qa: QA;
  expanded: boolean;
  onToggle: () => void;
}

function formatAnswer(text: string): string {
  // Convert markdown bold **text** to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-indigo-700 dark:text-indigo-300'>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export function QACard({ qa, expanded, onToggle }: QACardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  return (
    <div
      className={`
        border rounded-xl transition-all duration-200
        ${
          expanded
            ? "border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-md"
            : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-sm hover:border-gray-300 dark:hover:border-slate-700"
        }
      `}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 rounded-xl"
      >
        <span
          className={`
            flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5
            ${
              expanded
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"
            }
          `}
        >
          {qa.id}
        </span>
        <span
          className={`flex-1 text-[15px] leading-relaxed ${
            expanded
              ? "font-semibold text-gray-900 dark:text-white"
              : "font-medium text-gray-800 dark:text-slate-200"
          }`}
        >
          {qa.q}
        </span>
        <ChevronDown
          size={18}
          className={`
            flex-shrink-0 mt-0.5 text-gray-400 transition-transform duration-200
            ${expanded ? "rotate-180" : ""}
          `}
        />
      </button>
      <div
        ref={contentRef}
        className="qa-answer"
        style={{ maxHeight: expanded ? `${maxHeight}px` : "0", opacity: expanded ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pl-14">
          <div
            className="text-[14px] leading-[1.8] text-gray-600 dark:text-slate-400 prose-a:text-indigo-500"
            dangerouslySetInnerHTML={{ __html: formatAnswer(qa.a) }}
          />
        </div>
      </div>
    </div>
  );
}
