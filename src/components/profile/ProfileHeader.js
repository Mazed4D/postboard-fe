import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ProfilePicture from './ProfilePicture';
import apiServices from '../../services/api.services';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

const ProfileHeader = () => {
	const { userId } = useParams();
	const loggedUserId = localStorage.getItem('userId');
	const [name, setName] = useState('Loading...');
	const [avatar, setAvatar] = useState();
	const [isFollowed, setIsFollowed] = useState();
	const [followerCount, setFollowerCount] = useState(0);
	const [followsCount, setFollowsCount] = useState(0);

	useEffect(() => {
		apiServices.fetchUserName(userId, setName);
		if (loggedUserId !== userId) {
			apiServices.fetchFollowed({ user: userId }, setIsFollowed);
		}
		apiServices.fetchFollowCount(userId, setFollowsCount, setFollowerCount);
	}, []);

	const followHandler = () => {
		apiServices.follow({ user: userId, setIsFollowed, isFollowed });
		setIsFollowed(!isFollowed);
	};

	return (
		<div style={{ marginBottom: '1rem' }}>
			<div>
				<Avatar
					style={{ minWidth: '6rem', minHeight: '6rem' }}
					size='large'
					shape='square'
					icon={<UserOutlined />}
					src={avatar}
				/>
			</div>
			<br />
			<Title level={2}>{name}</Title>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>
				<Text strong>{followerCount} Followers</Text>
				<Text strong>{followsCount} Follows</Text>
			</div>
			<Text type='secondary'>{userId}</Text>
			<ProfilePicture
				userId={userId}
				loggedUserId={loggedUserId}
				setAvatar={setAvatar}
			/>
			{loggedUserId !== userId && (
				<Spin spinning={isFollowed === undefined}>
					<Button onClick={followHandler}>
						{isFollowed ? 'Unfollow' : 'Follow'}
					</Button>
				</Spin>
			)}
		</div>
	);
};

export default ProfileHeader;
