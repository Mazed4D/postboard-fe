import { Pagination, Spin } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from '../components/home/AddPost';
import PostCard from '../components/post/PostCard';

// TEMPORARY
const LOGGED_USER_ID = '621a42da50d4990408f57657';

const Home = () => {
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
					`${process.env.REACT_APP_API}/posts?page=${pageNum}`
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
			<h1>Public feed</h1>
			<div style={{ marginBottom: '3rem' }}>
				<AddPost />
			</div>
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

export default Home;
