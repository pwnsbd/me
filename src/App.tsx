import './global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Page } from './Page';
import { Projects } from './Projects';
import { Resume } from './Resume';
import { Writing } from './Writing';
import { usePencilSound } from './usePencilSound';

export default function App() {
  usePencilSound();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/writing" element={<Writing />} />
      </Routes>
    </BrowserRouter>
  );
}
