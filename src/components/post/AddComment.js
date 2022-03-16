import { Button, Input, Spin } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import apiServices from '../../services/api.services';
const { TextArea } = Input;

const AddComment = () => {
	const { postId } = useParams();
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const sendPostHandler = () => {
		setLoading(true);
		apiServices.addComment(postId, text, navigate);
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
