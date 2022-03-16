import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ProfilePicture from './ProfilePicture';
import apiServices from '../../services/api.services';

const ProfileHeader = () => {
	const { userId } = useParams();
	const [name, setName] = useState('Loading...');
	const [avatar, setAvatar] = useState();

	useEffect(() => {
		apiServices.fetchUserName(userId, setName);
	}, []);

	return (
		<div>
			<div>
				<Avatar
					size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
					shape='square'
					icon={<UserOutlined />}
					src={avatar}
				/>
			</div>
			<br />
			<ProfilePicture userId={userId} setAvatar={setAvatar} />
			<h2>{name}</h2>
			<p>{userId}</p>
		</div>
	);
};

export default ProfileHeader;
