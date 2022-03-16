import { Pagination, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import apiServices from '../services/api.services';

const Home = () => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [loading, setLoading] = useState(false);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [posts, setPosts] = useState([]);
	const [pageNum, setPageNum] = useState(page || 1);
	useEffect(() => {
		setLoading(true);
		apiServices.printPosts(pageNum, setPosts, setNumberOfPosts);
		setLoading(false);
	}, [pageNum]);

	return (
		<div>
			<Title>Public feed</Title>
			{loading && <Spin />}
			{posts.map((post) => {
				return <PostCard key={post} postId={post} />;
			})}

			<Pagination
				current={pageNum}
				pageSize={4}
				showSizeChanger={false}
				total={numberOfPosts}
				onChange={(e) => {
					setPageNum(e);
					navigate(`/${e}`);
				}}
			/>
		</div>
	);
};

export default Home;
