import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
	return (
		<div>
			<AuthForm />
			<Button>
				<Link to={'/register'}>Don't have an account?</Link>
			</Button>
		</div>
	);
};

export default AuthPage;
