import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../components/post/AddComment';
import Comments from '../components/post/Comments';
import PostCard from '../components/post/PostCard';

const Post = () => {
	const params = useParams();
	const [post, setPost] = useState(null);
	const [likes, setLikes] = useState(null);
	const [isLiked, setIsLiked] = useState(null);
	useEffect(() => {
		const loadPost = async () => {
			// AUTH TOKEN TEMPORARY, AUTHORIZATION TO BE IMPLEMENTED
			const resPost = await axios.get(
				`${process.env.REACT_APP_API}/posts/${params.postId}`,
				{
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjFhNDJkYTUwZDQ5OTA0MDhmNTc2NTciLCJuYW1lIjoibWlsYW4iLCJpYXQiOjE2NDY2NzAyNzksImV4cCI6MTY0NzI3NTA3OX0.f0Hr4lFReVnJt5QvHRD5ZO5UI-CjmblQ0CdZ2ISwvOI',
					},
				}
			);
			setPost(resPost.data);
		};
		const loadLikes = async () => {
			const resLikes = await axios.get(
				`${process.env.REACT_APP_API}/likes/${params.postId}`,
				{
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjFhNDJkYTUwZDQ5OTA0MDhmNTc2NTciLCJuYW1lIjoibWlsYW4iLCJpYXQiOjE2NDY2NzAyNzksImV4cCI6MTY0NzI3NTA3OX0.f0Hr4lFReVnJt5QvHRD5ZO5UI-CjmblQ0CdZ2ISwvOI',
					},
				}
			);
			// CHECK IF POST IS LIKED
			if (
				resLikes.data.filter((like) => like.user === '621a42da50d4990408f57657')
			) {
				console.log(isLiked);
				setIsLiked(true);
			}
			setLikes(resLikes);
		};
		loadPost();
		loadLikes();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{!post || (!likes && <PostCard loading={true} />)}
			{post && likes && isLiked && (
				<PostCard
					postId={post._id}
					name={post.name}
					text={post.text}
					date={new Date(post.createdAt).toUTCString()}
					likes={likes.data.length}
					userId={post.user}
					isLiked={isLiked}
				/>
			)}
			<AddComment />
			<Comments />
		</div>
	);
};

export default Post;
