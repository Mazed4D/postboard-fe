import React from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

const DisplayCard = ({
	avatar,
	actions,
	name,
	date,
	text,
	navigateUser,
	navigatePost,
}) => {
	return (
		<Card
			style={{
				width: '90vw',
				maxWidth: 550,
				marginBottom: '1rem',
			}}
			actions={actions}
			hoverable
		>
			<Card.Meta
				onClick={navigateUser}
				avatar={
					<Avatar
						shape='square'
						size={'large'}
						icon={<UserOutlined />}
						src={avatar}
					/>
				}
				title={name}
				description={date}
			/>
			<br />
			<Text onClick={navigatePost}>{text}</Text>
		</Card>
	);
};

export default DisplayCard;
