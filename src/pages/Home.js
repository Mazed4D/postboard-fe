import { Pagination } from 'antd';
import React from 'react';
import PostCard from '../components/post/PostCard';

const Home = () => {
	return (
		<div>
			<h1>Public feed</h1>
			<PostCard />
			<PostCard />
			<PostCard />
			<PostCard />

			<Pagination
				defaultCurrent={1}
				pageSize={4}
				showSizeChanger={false}
				total={20}
			/>
		</div>
	);
};

export default Home;
