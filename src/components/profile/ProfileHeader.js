import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ProfilePicture from './ProfilePicture';

const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
};

const ProfileHeader = () => {
	const { userId } = useParams();
	const [name, setName] = useState('Loading...');
	const [avatar, setAvatar] = useState();

	useEffect(() => {
		const fetchUserName = async () => {
			const user = await axios.get(
				`${process.env.REACT_APP_API}/users/${userId}`,
				config
			);
			setName(user.data.name);
		};
		fetchUserName();
	});

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
