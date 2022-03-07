import React from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../components/post/AddComment';
import Comments from '../components/post/Comments';
import PostCard from '../components/post/PostCard';

const Post = () => {
	const params = useParams();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<PostCard />
			<AddComment />
			<Comments />
		</div>
	);
};

export default Post;
