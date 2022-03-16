import { Pagination, Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiServices from '../../services/api.services';
import PostCard from '../post/PostCard';

const ProfilePosts = () => {
	const navigate = useNavigate();
	const { userId, page } = useParams();
	const [loading, setLoading] = useState(false);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [posts, setPosts] = useState([]);
	const [pageNum, setPageNum] = useState(page || 1);

	useEffect(() => {
		setLoading(true);
		apiServices.printPosts(pageNum, setPosts, setNumberOfPosts, false, userId);
		setLoading(false);
	}, [pageNum]);

	return (
		<div>
			{loading && <Spin />}
			{posts &&
				posts.map((post) => {
					return <PostCard key={post} postId={post} />;
				})}
			{numberOfPosts > 0 && (
				<Pagination
					current={pageNum}
					pageSize={4}
					showSizeChanger={false}
					total={numberOfPosts}
					onChange={(e) => {
						setPageNum(e);
						navigate(`/user/${userId}/${e}`);
					}}
				/>
			)}
			{numberOfPosts === 0 && <h2>No posts found by this user</h2>}
		</div>
	);
};

export default ProfilePosts;
