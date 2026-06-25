import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ModulePage } from "./pages/ModulePage";
import { modules } from "./data/modules";

function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 lg:py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          后端八股文
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          共 {modules.length} 个知识模块，
          {modules.reduce((sum, m) => sum + m.questions.length, 0)} 个面试题
        </p>
      </div>

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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
