import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ProfilePicture from './ProfilePicture';
import apiServices from '../../services/api.services';

const ProfileHeader = () => {
	const { userId } = useParams();
	const loggedUserId = localStorage.getItem('userId');
	const [name, setName] = useState('Loading...');
	const [avatar, setAvatar] = useState();
	const [isFollowed, setIsFollowed] = useState();

	useEffect(() => {
		apiServices.fetchUserName(userId, setName);
		apiServices.fetchFollowed({ user: userId }, setIsFollowed);
	}, []);

	return (
		<div style={{ marginBottom: '1rem' }}>
			<div>
				<Avatar
					size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
					shape='square'
					icon={<UserOutlined />}
					src={avatar}
				/>
			</div>
			<br />
			<ProfilePicture
				userId={userId}
				loggedUserId={loggedUserId}
				setAvatar={setAvatar}
			/>
			<h2>{name}</h2>
			<p>{userId}</p>
			{loggedUserId !== userId && (
				<Spin spinning={isFollowed === undefined}>
					<Button>{isFollowed ? 'Unfollow' : 'Follow'}</Button>
				</Spin>
			)}
		</div>
	);
};

export default ProfileHeader;
