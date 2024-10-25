import { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Account from './pages/Account';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PublishTemplate from './pages/PublishTemplate';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to='/login' />;
}

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path='/publish-template'
            element={
              <ProtectedRoute>
                <PublishTemplate />
              </ProtectedRoute>
            }
          />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/about' element={<About />} />
        </Route>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
