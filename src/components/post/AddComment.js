import { Button, Input, Spin } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const { TextArea } = Input;

const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
};

const AddComment = () => {
	const { postId } = useParams();
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const sendPostHandler = async () => {
		setLoading(true);
		try {
			// eslint-disable-next-line no-unused-vars
			const res = await axios.post(
				`${process.env.REACT_APP_API}/comments/post/${postId}`,
				{
					text,
				},
				config
			);
			navigate(0);
		} catch (error) {
			console.log(error.response);
		}

		setLoading(false);
	};

	return (
		<div>
			<Spin spinning={loading} tip='Sending post...'>
				<TextArea
					showCount
					maxLength={280}
					style={{ height: 120 }}
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
				<Button
					style={{ marginTop: '1rem' }}
					size={'large'}
					block
					type={'primary'}
					onClick={sendPostHandler}
				>
					<SendOutlined />
					Send comment{' '}
				</Button>
			</Spin>
		</div>
	);
};

export default AddComment;
