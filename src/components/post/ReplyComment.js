import React from 'react';
import { Comment, Avatar, Popconfirm, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import apiServices from '../../services/api.services';
import { useState } from 'react';

const ReplyComment = ({ commentId, user, userId, text }) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const confirmDelete = () => {
		setLoading(true);
		apiServices.deleteComment(commentId);
		setLoading(false);
		navigate(0);
	};

	const actions = [
		<Popconfirm
			title='Are you sure want to delete this comment?'
			onConfirm={confirmDelete}
			okText='Yes, delete my comment'
		>
			<DeleteOutlined /> Delete
		</Popconfirm>,
	];

	return (
		<Spin spinning={loading}>
			<Comment
				style={{
					marginTop: '0.5rem',
					minWidth: '60vw',
					backgroundColor: '#141414',
					padding: '0.5rem',
					borderRadius: 10,
				}}
				author={<Link to={`/user/${userId}`}>{user}</Link>}
				actions={actions}
				avatar={
					<Link to={`/user/${userId}`}>
						<Avatar icon={<UserOutlined />} alt={user} />
					</Link>
				}
				content={<Text>{text}</Text>}
			/>
		</Spin>
	);
};

export default ReplyComment;
