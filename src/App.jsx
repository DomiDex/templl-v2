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
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = '';
    let metaDescription = '';

    switch (pathname) {
      case '/':
        title = '';
        metaDescription = '';
        break;
      case '/acount':
        title = '';
        metaDescription = '';
        break;
      case '/sign-up':
        title = '';
        metaDescription = '';
        break;
      case '/login':
        title = '';
        metaDescription = '';
        break;
      case '/publish-template':
        title = '';
        metaDescription = '';
        break;
      case '/':
        title = '';
        metaDescription = '';
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account />} />
        <Route path='/publish-template' element={<PublishTemplate />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/about' element={<About />} />
      </Route>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
