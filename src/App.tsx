import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import Experience from './routes/experience';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experience" element={<Experience />} />
            </Routes>
        </Router>
    );
};

export default App;
