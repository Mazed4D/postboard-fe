import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
};

const ProfileHeader = () => {
	const { userId } = useParams();
	const [name, setName] = useState('Loading...');

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
			<Avatar size='large' shape='square' icon={<UserOutlined />} />
			<h2>{name}</h2>
			<p>{userId}</p>
		</div>
	);
};

export default ProfileHeader;
