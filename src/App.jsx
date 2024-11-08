import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './services/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <AppRoutes />
                <Footer />
            </Router>
        </AuthProvider>
    );
};