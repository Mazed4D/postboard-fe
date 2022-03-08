import { Pagination, Spin } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PostCard from '../components/post/PostCard';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		setLoading(true);
		const printPosts = async () => {
			const loadPosts = await axios.get(`${process.env.REACT_APP_API}/posts`);
			setPosts(loadPosts.data);
			setNumberOfPosts(loadPosts.data.length);
		};
		printPosts();
		setLoading(false);
	}, []);

	return (
		<div>
			<h1>Public feed</h1>
			{loading && <Spin />}
			{posts.map((post) => {
				return (
					<PostCard
						date={new Date(post.createdAt).toUTCString()}
						name={post.name}
						text={post.text}
						postId={post._id}
						userId={post.user}
					/>
				);
			})}

			<Pagination
				defaultCurrent={1}
				pageSize={4}
				showSizeChanger={false}
				total={numberOfPosts}
			/>
		</div>
	);
};

export default Home;
