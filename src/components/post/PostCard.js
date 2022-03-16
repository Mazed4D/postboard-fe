import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
	LikeOutlined,
	LikeFilled,
	CommentOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';
import DisplayCard from './DisplayCard';
import LoadingCard from './LoadingCard';
import { useSelector } from 'react-redux';

//TEMPORARY
const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
};

const PostCard = ({ postId }) => {
	// HOOKS
	const { userId } = useSelector((state) => state.auth);
	const params = useParams();
	const navigate = useNavigate();
	const [postData, setPostData] = useState();
	const [avatar, setAvatar] = useState();
	const [liked, setLiked] = useState(false);
	const [likeNumber, setLikeNumber] = useState();
	const [likeSpin, setLikeSpin] = useState(false);

	// CONSTANTS
	const id = postId || params.postId;

	// RUN ON FIRST RENDER
	useEffect(() => {
		const loadPost = async () => {
			const resPost = await axios.get(
				`${process.env.REACT_APP_API}/posts/${id}`,
				config
			);
			const data = await resPost.data;
			setPostData(() => {
				return { ...data };
			});
		};
		const loadLikes = async () => {
			const resLikes = await axios.get(
				`${process.env.REACT_APP_API}/likes/${id}`,
				config
			);
			// CHECK IF POST IS LIKED
			const isLiked = resLikes.data.find((like) => {
				return like.user === userId;
			});
			if (isLiked) {
				setLiked(true);
			}
			setLikeNumber(resLikes.data.length);
		};
		const fetchImage = async () => {
			const img = await axios.get(
				`${process.env.REACT_APP_API}/upload/user/${postData.user}`,
				config
			);
			setAvatar(`${process.env.REACT_APP_SERVER}/uploads/${img.data.url}`);
		};
		if (!postData) {
			loadPost();
			loadLikes();
		} else {
			fetchImage();
		}
	}, [postData, id, userId]);

	// LIKE HANDLER FUNCTION
	const likeHandler = async () => {
		try {
			setLikeSpin(true);
			const toggleLike = await axios.post(
				`${process.env.REACT_APP_API}/likes/toggle/${id}`,
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
			setLikeSpin(false);
		} catch (err) {
			console.log(err.response);
		}
	};

	const followHandler = async () => {
		console.log('here');
		try {
			const follow = await axios.post(
				`${process.env.REACT_APP_API}/follow/${postData.user}`,
				{},
				config
			);
			console.log(follow);
		} catch (error) {
			console.log(error);
		}
	};

	// ACTIONS
	const actions = [
		<div style={{ display: 'inline-block' }} onClick={likeHandler}>
			{likeNumber}{' '}
			{liked ? (
				<LikeFilled
					key='like'
					title='lol'
					spin={likeSpin}
					style={{ color: '#177DDC' }}
				/>
			) : (
				<LikeOutlined key='like' title='lol' spin={likeSpin} />
			)}
		</div>,
		<CommentOutlined key='comments' onClick={() => navigate(`/post/${id}`)} />,
		<div onClick={followHandler}>
			<UsergroupAddOutlined key='follow' /> Follow
		</div>,
	];

	if (!postData || likeNumber === undefined) {
		return <LoadingCard actions={actions} />;
	}

	if (postData && likeNumber !== undefined) {
		// CHECK IF POST IS USER'S OWN POST TO REMOVE FOLLOW BUTTON
		if (postData.user === userId) {
			actions.pop();
		}
		// RETURN DISPLAY CARD CONTROLLED COMPONENT
		return (
			<DisplayCard
				avatar={avatar}
				user={postData.user}
				key={postData._id}
				actions={actions}
				name={postData.name}
				date={new Date(postData.createdAt).toLocaleString()}
				postId={id}
				text={postData.text}
				navigateUser={() => navigate(`/user/${postData.user}`)}
				navigatePost={() => navigate(`/post/${id}`)}
			/>
		);
	}
};

export default PostCard;
