import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const ProfileHeader = () => {
	const params = useParams();
	return (
		<div>
			<Avatar size='large' shape='square' icon={<UserOutlined />} />
			<h2>User name</h2>
			<p>{params.userId}</p>
		</div>
	);
};

export default ProfileHeader;
