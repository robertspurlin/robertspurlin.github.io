import { 
	Routes,
	Route 
} from 'react-router-dom';

import PageLayout from './PageLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

const RouteContainer = () => {
	return (
		<Routes>
      <Route path='/' element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='blog' element={<Blog />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
	)
}

export default RouteContainer;