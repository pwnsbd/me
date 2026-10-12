import type { Theme } from '../types';
import { Layout } from './Layout';
import { Home, Projects, Resume, Writing } from './pages/index';

const theme: Theme = { id: 'recruiter', label: 'recruiter view', Layout, Home, Projects, Resume, Writing };
export default theme;
