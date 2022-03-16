import { Pagination, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import apiServices from '../services/api.services';

const Followed = () => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [loading, setLoading] = useState(false);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [posts, setPosts] = useState([]);
	const [pageNum, setPageNum] = useState(page || 1);
	useEffect(() => {
		setLoading(true);
		apiServices.printPosts(pageNum, setPosts, setNumberOfPosts, true);
		setLoading(false);
	}, [pageNum]);

	return (
		<div>
			<Title>Followed feed</Title>
			{loading && <Spin />}
			{posts.map((post) => {
				return <PostCard key={post} postId={post} />;
			})}
			{!loading && posts.length < 1 && (
				<Title>
					No posts by followed users or you aren't following any users
				</Title>
			)}

			{posts.length > 0 && (
				<Pagination
					current={pageNum}
					pageSize={4}
					showSizeChanger={false}
					total={numberOfPosts}
					onChange={(e) => {
						setPageNum(e);
						navigate(`/followed/${e}`);
					}}
				/>
			)}
		</div>
	);
};

export default Followed;
