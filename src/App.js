import LayoutComp from './components/layout/LayoutComp';
import 'antd/dist/antd.dark.less';
import './App.less';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Post from './pages/Post';
import RegisterPage from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteCredientials, setCredientials } from './redux/auth';
import jwtDecode from 'jwt-decode';
import authServices from './services/auth.service';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		const userId = localStorage.getItem('userId');
		if (!token) {
			authServices.logout();
			dispatch(deleteCredientials());
		} else {
			dispatch(
				setCredientials({
					isLoggedIn: true,
					user: user,
					userId: userId,
				})
			);
		}
	}, []);

	const { isLoggedIn } = useSelector((state) => state.auth);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LayoutComp />}>
					{isLoggedIn && (
						<>
							<Route index element={<Home />} />
							<Route path='/:page' element={<Home />} />
							<Route path='user/:userId' element={<Profile />} />
							<Route path='user/:userId/:page' element={<Profile />} />
							<Route path='post/:postId' element={<Post />} />
							<Route path='*' element={<Navigate to='/' />} />
						</>
					)}
					{!isLoggedIn && (
						<>
							<Route index element={<AuthPage />} />
							<Route path='register' element={<RegisterPage />} />
							<Route path='*' element={<Navigate to='/' />} />
						</>
					)}
				</Route>
			</Routes>
		</div>
	);
}

export default App;
