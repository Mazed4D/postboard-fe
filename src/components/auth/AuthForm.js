import { Form, Input, Button } from 'antd';

const AuthForm = ({ isRegister = false }) => {
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		console.log('Success:', values);
		if (isRegister) {
			console.log('Register action here');
		} else {
			console.log('Login action here');
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log(form.getFieldValue('name'));

		console.log('Failed:', errorInfo);
	};

	return (
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
			{isRegister && (
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
			)}

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

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type='primary' htmlType='submit'>
					{isRegister ? 'Register' : 'Login'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AuthForm;
