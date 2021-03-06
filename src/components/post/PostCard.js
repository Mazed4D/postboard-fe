import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	LikeOutlined,
	LikeFilled,
	CommentOutlined,
	UsergroupDeleteOutlined,
	UsergroupAddOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import DisplayCard from './DisplayCard';
import LoadingCard from './LoadingCard';
import { useSelector } from 'react-redux';
import apiServices from '../../services/api.services';
import { Popconfirm } from 'antd';
import PostModal from '../layout/PostModal';

const PostCard = ({ postId }) => {
	const { userId } = useSelector((state) => state.auth);
	const params = useParams();
	const navigate = useNavigate();
	const [postData, setPostData] = useState();
	const [avatar, setAvatar] = useState();
	const [liked, setLiked] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [likeNumber, setLikeNumber] = useState();
	const [likeSpin, setLikeSpin] = useState(false);
	const [visible, setVisible] = useState(false);

	const id = postId || params.postId;

	useEffect(() => {
		if (!postData) {
			apiServices.loadPost(id, setPostData);
			apiServices.loadLikes(id, userId, setLiked, setLikeNumber);
		} else {
			apiServices.fetchPostImage(postData, setAvatar);
			apiServices.fetchFollowed(postData, setIsFollowed);
		}
	}, [postData, id, userId]);

	const likeHandler = () => {
		apiServices.toggleLike(
			id,
			setLikeSpin,
			setLikeNumber,
			likeNumber,
			setLiked
		);
	};

	const editHandler = () => {
		setVisible(true);
	};

	const confirmDelete = () => {
		apiServices.deletePost(postId);
		navigate(0);
	};

	const followHandler = async () => {
		apiServices.follow(postData, setIsFollowed, isFollowed);
	};

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
			{isFollowed && (
				<>
					<UsergroupDeleteOutlined key='follow' /> Unfollow
				</>
			)}
			{!isFollowed && (
				<>
					<UsergroupAddOutlined key='follow' /> Follow
				</>
			)}
		</div>,
	];

	if (!postData || likeNumber === undefined) {
		return <LoadingCard actions={actions} />;
	}

	if (postData && likeNumber !== undefined) {
		if (postData.user === userId) {
			actions.pop();
			actions.push(
				<div onClick={editHandler}>
					<EditOutlined />
				</div>
			);
			actions.push(
				<Popconfirm
					title='Are you sure you want to delete this post?'
					onConfirm={confirmDelete}
					okText='Yes, delete my post'
				>
					<DeleteOutlined /> Delete
				</Popconfirm>
			);
		}
		return (
			<>
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
				<PostModal
					visible={visible}
					isEdit={true}
					editText={postData.text}
					editId={postId}
					close={() => setVisible(false)}
				/>
			</>
		);
	}
};

export default PostCard;
