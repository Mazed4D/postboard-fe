import { Button } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredientials } from '../../redux/auth';
import authServices from '../../services/auth.service';

const AuthAsTest = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = async () => {
		setLoading(true);
		const { token, user, error } = await authServices.login({
			email: 'test@test.com',
			password: 'testpass',
		});
		if (token) {
			dispatch(
				setCredientials({
					isLoggedIn: true,
					user: user.name,
					userId: user.userId,
				})
			);
			navigate(0);
		}
		setLoading(false);
		if (error) {
			console.log(error.data);
		}
	};

	return (
		<Button loading={loading} onClick={login}>
			Login as test user
		</Button>
	);
};

export default AuthAsTest;
