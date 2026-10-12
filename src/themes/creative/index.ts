import type { Theme } from '../types';
import { Layout } from './Layout';
import { Page } from './pages/Page';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { Writing } from './pages/Writing';

export { Page as Home } from './pages/Page';
export { Projects } from './pages/Projects';
export { Resume } from './pages/Resume';
export { Writing } from './pages/Writing';
export { usePencilSound } from './hooks/usePencilSound';
export { SvgFilters } from './SvgFilters';

const theme: Theme = { id: 'creative', label: 'creative view', Layout, Home: Page, Projects, Resume, Writing };
export default theme;
