import { Pagination, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostCard from '../components/post/PostCard';

const config = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
};

const Followed = () => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [loading, setLoading] = useState(false);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [posts, setPosts] = useState([]);
	const [pageNum, setPageNum] = useState(page || 1);
	useEffect(() => {
		setLoading(true);
		const printPosts = async () => {
			try {
				const loadPosts = await axios.get(
					`${process.env.REACT_APP_API}/posts/followed?page=${pageNum}`,
					config
				);
				setPosts(loadPosts.data.postIds);
				setNumberOfPosts(loadPosts.data.totalPosts);
			} catch (error) {
				toast.error(
					`${error.response.data.msg || error.response.data} (${
						error.response.status
					})`,
					{
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					}
				);
			}
		};
		printPosts();
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

			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default Followed;
