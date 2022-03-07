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

const PostCard = ({ isOwnPost = false, name, text, likes }) => {
	const params = useParams();
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(false);
	const [likeNumber, setLikeNumber] = useState(0);
	const likeHandler = () => {
		setIsLiked(!isLiked);
		setLikeNumber(likeNumber + 1);
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
								{likeNumber} {isLiked && <LikeFilled key='like' title='lol' />}
								{!isLiked && <LikeOutlined key='like' title='lol' />}
							</div>,
							<CommentOutlined
								key='comments'
								onClick={() => navigate(`/post/fakepostid`)}
							/>,
					  ]
					: [
							<div style={{ display: 'inline-block' }} onClick={likeHandler}>
								{likeNumber} {isLiked && <LikeFilled key='like' title='lol' />}
								{!isLiked && <LikeOutlined key='like' title='lol' />}
							</div>,

							<CommentOutlined
								key='comments'
								onClick={() => navigate(`/post/fakepostid`)}
							/>,
					  ]
			}
			tabBarExtraContent={<h1>hello wrdl</h1>}
		>
			<Card.Meta
				avatar={<Avatar shape='square' icon={<UserOutlined />} />}
				description='User name'
			/>
			<br />
			Card textual content
		</Card>
	);
};

export default PostCard;
