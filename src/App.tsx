// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DiskScheduling from './pages/DiskScheduling';
import ProcessScheduling from './pages/ProcessScheduling';
import Deadlock from './pages/Deadlock';
// import Memory from './pages/MemoryManage';
import Paging from './pages/Paging';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/disk-scheduling" element={<DiskScheduling />} />
        <Route path="/process-scheduling" element={<ProcessScheduling />} />
        <Route path="/deadlock" element={<Deadlock />} />
        {/* <Route path="/memory" element={<Memory />} /> */}
        <Route path="/paging" element={<Paging />} /> 
      </Routes>
    </Router>
  );
}

export default App;
