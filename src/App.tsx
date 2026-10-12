import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './core/routes';
import { useThemeStore } from './core/themeStore';
import { getTheme } from './themes';

export default function App() {
  const themeId = useThemeStore((s) => s.themeId);
  const theme = getTheme(themeId);
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <theme.Layout>
          <Routes>
            <Route path={ROUTES.home} element={<theme.Home />} />
            <Route path={ROUTES.projects} element={<theme.Projects />} />
            <Route path={ROUTES.resume} element={<theme.Resume />} />
            <Route path={ROUTES.writing} element={<theme.Writing />} />
          </Routes>
        </theme.Layout>
      </Suspense>
    </BrowserRouter>
  );
}
