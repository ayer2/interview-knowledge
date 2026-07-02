import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { modules } from "../data/modules";
import { projects } from "../data/projects";
import { Search } from "lucide-react";

interface SidebarProps {
  onSelect?: () => void;
}

export function Sidebar({ onSelect }: SidebarProps) {
  const navigate = useNavigate();
  const { moduleId, projectId } = useParams();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const isProjectRoute = location.pathname.startsWith("/projects");

  const searchResults = query.trim()
    ? modules.flatMap((mod) =>
        mod.questions
          .filter(
            (qa) =>
              qa.q.toLowerCase().includes(query.toLowerCase()) ||
              qa.a.toLowerCase().includes(query.toLowerCase())
          )
          .map((qa) => ({ ...qa, moduleId: mod.id, moduleTitle: mod.title }))
      )
    : [];

  const handleModuleClick = (id: string) => {
    navigate(`/module/${id}`);
    setQuery("");
    setShowResults(false);
    onSelect?.();
  };

  const handleProjectClick = (id: string) => {
    navigate(`/projects/${id}`);
    setQuery("");
    setShowResults(false);
    onSelect?.();
  };

  const handleSearchSelect = (moduleId: string, qaId: number) => {
    navigate(`/module/${moduleId}?q=${qaId}`);
    setQuery("");
    setShowResults(false);
    onSelect?.();
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 overflow-y-auto p-3">
        {/* 后端八股文 */}
        <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-2">
          后端八股文
        </div>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => handleModuleClick(mod.id)}
            className={`
              w-full text-left px-3 py-2.5 rounded-lg mb-1 text-sm font-medium
              transition-colors duration-100
              ${
                moduleId === mod.id && !isProjectRoute
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >
            {mod.title}
            <span className="ml-2 text-xs text-gray-400 dark:text-slate-500">
              ({mod.questions.length})
            </span>
          </button>
        ))}

        {/* 项目经历 */}
        <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-2 mt-6 pt-4 border-t border-gray-200 dark:border-slate-800">
          项目经历
        </div>
        {projects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => handleProjectClick(proj.id)}
            className={`
              w-full text-left px-3 py-2.5 rounded-lg mb-1 text-sm font-medium
              transition-colors duration-100
              ${
                projectId === proj.id || (isProjectRoute && location.pathname === "/projects")
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                  : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >
            {proj.title}
            <span className="ml-2 text-xs text-gray-400 dark:text-slate-500">
              ({proj.followUpQuestions.length})
            </span>
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="border-t border-gray-200 dark:border-slate-800 p-3">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="搜索八股文问题..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(!!e.target.value);
            }}
            onFocus={() => query && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700
              bg-white dark:bg-slate-900 text-gray-900 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-slate-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
        </div>

        {/* Search results dropdown */}
        {showResults && query.trim() && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
            {searchResults.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-400 text-center">
                无匹配结果
              </div>
            ) : (
              searchResults.map((result) => (
                <button
                  key={`${result.moduleId}-${result.id}`}
                  onMouseDown={() =>
                    handleSearchSelect(result.moduleId, result.id)
                  }
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 border-b border-gray-100 dark:border-slate-800 last:border-0"
                >
                  <div className="text-xs text-indigo-500 dark:text-indigo-400 mb-0.5">
                    {result.moduleTitle}
                  </div>
                  <div className="text-gray-700 dark:text-slate-300 truncate">
                    {result.q}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
