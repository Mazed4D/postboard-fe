import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const PostButton = ({ onClick, isDesktopOrLaptop }) => {
	const desktopStyle = {
		position: 'fixed',
		bottom: '10vh',
		right: '10vw',
		height: '5rem',
		width: '5rem',
		fontSize: '2.5rem',
	};

	return (
		<Button
			type='primary'
			size='large'
			shape='circle'
			style={
				isDesktopOrLaptop
					? desktopStyle
					: {
							position: 'fixed',
							bottom: '10vh',
							right: '10vw',
							height: '3rem',
							width: '3rem',
							fontSize: '1rem',
					  }
			}
			onClick={onClick}
		>
			<MessageOutlined />
		</Button>
	);
};

export default PostButton;
