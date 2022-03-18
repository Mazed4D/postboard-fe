import React from 'react';
import { Comment, Avatar, Popconfirm, Spin, Button } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import apiServices from '../../services/api.services';
import { useState } from 'react';
import { useEffect } from 'react';
import PostModal from '../layout/PostModal';

const ReplyComment = ({ commentId, user, userId, text }) => {
	const [loading, setLoading] = useState(false);
	const [avatar, setAvatar] = useState();
	const [visible, setVisible] = useState();
	const loggedUserId = localStorage.getItem('userId');

	const navigate = useNavigate();

	useEffect(() => {
		apiServices.fetchImage(userId, setAvatar);
	}, []);

	const confirmDelete = () => {
		setLoading(true);
		apiServices.deleteComment(commentId);
		setLoading(false);
		navigate(0);
	};

	const actions = [
		<Button type='text' onClick={() => setVisible(true)}>
			<EditOutlined /> Edit
		</Button>,
		<Popconfirm
			title='Are you sure want to delete this comment?'
			onConfirm={confirmDelete}
			okText='Yes, delete my comment'
		>
			<DeleteOutlined /> Delete
		</Popconfirm>,
	];

	return (
		<>
			<Spin spinning={loading}>
				<Comment
					style={{
						marginTop: '0.5rem',
						maxWidth: 600,
						backgroundColor: '#141414',
						padding: '0.5rem',
						borderRadius: 10,
					}}
					author={<Link to={`/user/${userId}`}>{user}</Link>}
					actions={loggedUserId === userId && actions}
					avatar={
						<Link to={`/user/${userId}`}>
							<Avatar icon={<UserOutlined />} src={avatar} alt={user} />
						</Link>
					}
					content={<Text>{text}</Text>}
				/>
			</Spin>
			<PostModal
				visible={visible}
				close={() => setVisible(false)}
				editId={commentId}
				isComment={true}
				isEdit={true}
				editText={text}
			/>
		</>
	);
};

export default ReplyComment;
