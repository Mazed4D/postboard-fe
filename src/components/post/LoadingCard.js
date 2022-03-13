import React from 'react';
import { Avatar, Card, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

const LoadingCard = () => {
	return (
		<Card
			style={{ width: 500, marginBottom: '1rem' }}
			hoverable
			loading={true}
			actions={[<Spin />, <Spin />]}
		>
			<Card.Meta
				avatar={<Avatar shape='square' icon={<UserOutlined />} />}
				title='Loading...'
				description='Loading...'
			/>
			<br />
			<Text>Loading...</Text>
		</Card>
	);
};

export default LoadingCard;
