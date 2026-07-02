import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { ChevronLeft } from "lucide-react";

export function ProjectsHome() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 lg:py-10">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 mb-3"
        >
          <ChevronLeft size={16} />
          首页
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          项目经历
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          共 {projects.length} 个项目，含完整版口述、精简版和高频追问
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block p-5 rounded-xl border border-gray-200 dark:border-slate-800
              bg-white dark:bg-slate-900 hover:shadow-md hover:border-indigo-200
              dark:hover:border-indigo-800 transition-all duration-200
              cursor-pointer no-underline"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-indigo-500 dark:text-indigo-400">
                  {project.subtitle}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-3 text-xs text-gray-400 dark:text-slate-500 mt-1">
                <span>
                  {project.followUpQuestions.length} 个追问
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
