import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthAsTest from '../components/auth/AuthAsTest';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
	return (
		<div>
			<div style={{ marginBottom: '1rem' }}>
				<Title>Welcome to Postboard!</Title>
				<AuthAsTest />
			</div>
			<AuthForm />
			<Button>
				<Link to={'/register'}>Don't have an account?</Link>
			</Button>
		</div>
	);
};

export default AuthPage;
