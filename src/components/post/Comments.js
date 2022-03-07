import React, { useState } from 'react';
import { Tooltip, Avatar, List } from 'antd';
import {
	DislikeOutlined,
	LikeOutlined,
	DislikeFilled,
	LikeFilled,
	UserOutlined,
} from '@ant-design/icons';
import ReplyComment from './Comment';

const Comments = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '0 12rem',
			}}
		>
			<ReplyComment />
			<ReplyComment />
		</div>
	);
};

export default Comments;
