import LayoutComp from './components/layout/LayoutComp';
import 'antd/dist/antd.dark.less';
import './App.less';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Post from './pages/Post';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LayoutComp />}>
					<Route index element={<Home />} />
					<Route path='auth' element={<AuthPage />} />
					<Route path='user/:userId' element={<Profile />} />
					<Route path='post/:postId' element={<Post />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
