import { Button, Input, Spin } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import apiServices from '../../services/api.services';
const { TextArea } = Input;

const AddPost = () => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const sendPostHandler = async () => {
		setLoading(true);
		apiServices.sendPost(text, navigate);
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
					Send post{' '}
				</Button>
			</Spin>
		</div>
	);
};

export default AddPost;
