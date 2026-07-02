import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { QACard } from "../components/QACard";
import { ChevronLeft } from "lucide-react";

type Tab = "full" | "short" | "followup";

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-indigo-700 dark:text-indigo-300'>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  const [activeTab, setActiveTab] = useState<Tab>("full");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            项目未找到
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mb-4">
            没有找到对应的项目
          </p>
          <Link
            to="/projects"
            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium"
          >
            返回项目列表
          </Link>
        </div>
      </div>
    );
  }

  const toggle = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () =>
    setExpandedIds(new Set(project.followUpQuestions.map((q) => q.id)));
  const collapseAll = () => setExpandedIds(new Set());

  const tabs: { key: Tab; label: string }[] = [
    { key: "full", label: "完整版" },
    { key: "short", label: "精简版" },
    { key: "followup", label: `高频追问 (${project.followUpQuestions.length})` },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 lg:py-10">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 mb-3"
        >
          <ChevronLeft size={16} />
          全部项目
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h2>
          <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px
              ${
                activeTab === tab.key
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "followup" ? (
        <div>
          <div className="flex items-end justify-between mb-4">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              共 {project.followUpQuestions.length} 个追问
            </p>
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
          <div className="space-y-3">
            {project.followUpQuestions.map((qa) => (
              <QACard
                key={qa.id}
                qa={qa}
                expanded={expandedIds.has(qa.id)}
                onToggle={() => toggle(qa.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="text-[15px] leading-[1.9] text-gray-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(
              activeTab === "full" ? project.fullVersion : project.shortVersion
            ),
          }}
        />
      )}
    </div>
  );
}
