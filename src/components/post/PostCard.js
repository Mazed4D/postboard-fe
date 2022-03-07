import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Card } from 'antd';
import {
	UserOutlined,
	EditOutlined,
	LikeOutlined,
	LikeFilled,
	CommentOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const config = {
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjFhNDJkYTUwZDQ5OTA0MDhmNTc2NTciLCJuYW1lIjoibWlsYW4iLCJpYXQiOjE2NDY2NzAyNzksImV4cCI6MTY0NzI3NTA3OX0.f0Hr4lFReVnJt5QvHRD5ZO5UI-CjmblQ0CdZ2ISwvOI',
	},
};

const PostCard = ({
	isOwnPost = false,
	name = 'User name',
	text = 'post text',
	isLiked,
	likes,
}) => {
	const params = useParams();
	const navigate = useNavigate();
	const [liked, setLiked] = useState(isLiked);
	const [likeNumber, setLikeNumber] = useState(likes);
	const likeHandler = async () => {
		try {
			const toggleLike = await axios.post(
				`${process.env.REACT_APP_API}/likes/toggle/${params.postId}`,
				{},
				config
			);
			if (toggleLike.status === 200) {
				setLikeNumber(likeNumber + 1);
				setLiked(true);
			} else if (toggleLike.status === 204) {
				setLikeNumber(likeNumber - 1);
				setLiked(false);
			}
		} catch (err) {
			console.log(err.response);
		}
	};

	return (
		<Card
			style={{ width: 500, marginBottom: '1rem' }}
			hoverable
			actions={
				isOwnPost
					? [
							<EditOutlined key='edit' />,
							<div style={{ display: 'inline-block' }} onClick={likeHandler}>
								{likeNumber} {liked && <LikeFilled key='like' title='lol' />}
								{!liked && <LikeOutlined key='like' title='lol' />}
							</div>,
							<CommentOutlined
								key='comments'
								onClick={() => navigate(`/post/fakepostid`)}
							/>,
					  ]
					: [
							<div style={{ display: 'inline-block' }} onClick={likeHandler}>
								{likeNumber} {liked && <LikeFilled key='like' title='lol' />}
								{!liked && <LikeOutlined key='like' title='lol' />}
							</div>,

							<CommentOutlined
								key='comments'
								onClick={() => navigate(`/post/fakepostid`)}
							/>,
					  ]
			}
		>
			<Card.Meta
				avatar={<Avatar shape='square' icon={<UserOutlined />} />}
				description={name}
			/>
			<br />
			{text}
		</Card>
	);
};

export default PostCard;
