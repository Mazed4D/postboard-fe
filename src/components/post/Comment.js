import React from 'react';
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ReplyComment = () => {
	return (
		<Comment
			author={<a>Comment user name</a>}
			avatar={<Avatar icon={<UserOutlined />} alt='comment user' />}
			content={
				<p>
					We supply a series of design principles, practical patterns and high
					quality design resources (Sketch and Axure), to help people create
					their product prototypes beautifully and efficiently.
				</p>
			}
		/>
	);
};

export default ReplyComment;
