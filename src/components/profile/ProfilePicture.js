import { Button, Upload, message, Spin, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const headers = {
	Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const ProfilePicture = ({ userId, setAvatar }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchImage = async () => {
			const img = await axios.get(
				`${process.env.REACT_APP_API}/upload/user/${userId}`,
				{ headers: headers }
			);
			setAvatar(`${process.env.REACT_APP_SERVER}/uploads/${img.data.url}`);
		};
		fetchImage();
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
		console.log(info);
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
		<>
			{/* <Image src={image} /> */}
			<Spin spinning={loading}>
				<Upload
					name='profilePicture'
					action={`${process.env.REACT_APP_API}/upload/user/${userId}`}
					headers={headers}
					beforeUpload={beforeUpload}
					onChange={handleChange}
					showUploadList={false}
				>
					<Button icon={<UploadOutlined />}>Upload profile picture</Button>
				</Upload>
			</Spin>
		</>
	);
};

export default ProfilePicture;
