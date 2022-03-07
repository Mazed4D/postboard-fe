import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../post/PostCard';

const ProfilePosts = () => {
	const params = useParams();
	const [isOwnPost, setIsOwnPost] = useState(false);
	return (
		<div>
			<PostCard />
			<PostCard />
			<PostCard />
		</div>
	);
};

export default ProfilePosts;
