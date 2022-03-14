import { Form, Input, Button, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredientials } from '../../redux/auth';
import authServices from '../../services/auth.service';

const AuthForm = ({ isRegister = false }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		setLoading(true);
		const { token, user, error } = isRegister
			? await authServices.register(values)
			: await authServices.login(values);
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
			setError(true);
			console.log(error.data);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log(form.getFieldValue('name'));

		console.log('Failed:', errorInfo);
	};

	return (
		<Spin spinning={loading}>
			<Form
				form={form}
				name='basic'
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Email'
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input your email address!',
							type: 'email',
						},
					]}
				>
					<Input />
				</Form.Item>

				{isRegister && (
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input your name!',
								type: 'string',
							},
						]}
					>
						<Input />
					</Form.Item>
				)}

				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
							type: 'string',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				{error && <Text style={{ color: 'red' }}>Check credientials</Text>}
				<Form.Item
					wrapperCol={
						{
							// offset: 8,
							// span: 16,
						}
					}
				>
					<Button type='primary' htmlType='submit' block>
						{isRegister ? 'Register' : 'Login'}
					</Button>
				</Form.Item>
			</Form>
		</Spin>
	);
};

export default AuthForm;
