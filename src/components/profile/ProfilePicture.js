import { Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import apiServices from '../../services/api.services';

const ProfilePicture = ({ userId, loggedUserId, setAvatar }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		apiServices.fetchImage(userId, setAvatar);
	}, []);

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			setLoading(false);
			navigate(0);
		}
	};

	return (
		<Spin spinning={loading}>
			{loggedUserId === userId && (
				<Upload
					name='profilePicture'
					action={`${process.env.REACT_APP_API}/upload/user/${userId}`}
					headers={apiServices.headers}
					beforeUpload={beforeUpload}
					onChange={handleChange}
					showUploadList={false}
				>
					<Button icon={<UploadOutlined />}>Upload profile picture</Button>
				</Upload>
			)}
		</Spin>
	);
};

export default ProfilePicture;
