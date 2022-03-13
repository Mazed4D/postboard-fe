import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = () => {
	return (
		<div>
			<AuthForm isRegister={true} />
			<Button>
				<Link to={'/'}>Already have an account?</Link>
			</Button>
		</div>
	);
};

export default RegisterPage;
