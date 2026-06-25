import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { modules } from "../data/modules";
import { QACard } from "../components/QACard";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams] = useSearchParams();
  const targetQaId = searchParams.get("q");

  const module = modules.find((m) => m.id === moduleId);
  const qaRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [expandedIds, setExpandedIds] = useState<Set<number>>(() => {
    if (targetQaId) return new Set([parseInt(targetQaId)]);
    return new Set();
  });

  useEffect(() => {
    if (targetQaId) {
      const id = parseInt(targetQaId);
      setExpandedIds(new Set([id]));
      // Scroll to the question after a short delay
      setTimeout(() => {
        const el = qaRefs.current.get(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [targetQaId, moduleId]);

  if (!module) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            模块未找到
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mb-4">
            没有找到对应的知识模块
          </p>
          <Link
            to="/"
            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const toggle = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(module.questions.map((q) => q.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 lg:py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 mb-3"
        >
          <ChevronLeft size={16} />
          全部模块
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {module.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              共 {module.questions.length} 个问题
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              全部展开
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              全部折叠
            </button>
          </div>
        </div>
      </div>

      {/* QA Cards */}
      <div className="space-y-3">
        {module.questions.map((qa) => (
          <div
            key={qa.id}
            ref={(el) => {
              if (el) qaRefs.current.set(qa.id, el);
            }}
          >
            <QACard
              qa={qa}
              expanded={expandedIds.has(qa.id)}
              onToggle={() => toggle(qa.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
