import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import Experience from './routes/experience';
import Guests from './routes/guests';
import Blog from './routes/blog';
import Me from './routes/me';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/me" element={<Me />} />
            </Routes>
        </Router>
    );
};

export default App;
