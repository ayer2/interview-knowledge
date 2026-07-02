import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ModulePage } from "./pages/ModulePage";
import { ProjectsHome } from "./pages/ProjectsHome";
import { ProjectPage } from "./pages/ProjectPage";
import { modules } from "./data/modules";
import { projects } from "./data/projects";
import { Briefcase } from "lucide-react";

function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 lg:py-10">
      {/* 后端八股文 */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          后端八股文
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
          共 {modules.length} 个知识模块，
          {modules.reduce((sum, m) => sum + m.questions.length, 0)} 个面试题
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              to={`/module/${mod.id}`}
              className="block p-5 rounded-xl border border-gray-200 dark:border-slate-800
                bg-white dark:bg-slate-900 hover:shadow-md hover:border-indigo-200
                dark:hover:border-indigo-800 transition-all duration-200
                cursor-pointer no-underline"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {mod.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {mod.questions.length} 个问题
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* 项目经历 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase size={20} className="text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            项目经历
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
          共 {projects.length} 个项目，含完整版口述、精简版和高频追问
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="block p-5 rounded-xl border border-gray-200 dark:border-slate-800
                bg-white dark:bg-slate-900 hover:shadow-md hover:border-amber-200
                dark:hover:border-amber-800 transition-all duration-200
                cursor-pointer no-underline"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {project.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
          <Route path="/projects" element={<ProjectsHome />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
