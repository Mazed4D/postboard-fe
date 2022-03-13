import React from 'react';
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';

const ReplyComment = ({ user, userId, text }) => {
	console.log({ user, text });
	return (
		<Comment
			author={<Link to={`/user/${userId}`}>{user}</Link>}
			avatar={
				<Link to={`/user/${userId}`}>
					<Avatar icon={<UserOutlined />} alt={user} />
				</Link>
			}
			content={<Text>{text}</Text>}
		/>
	);
};

export default ReplyComment;
