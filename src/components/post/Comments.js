import React, { useState } from 'react';
import ReplyComment from './ReplyComment';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Comments = () => {
	const { postId } = useParams();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			const fetchedComments = await axios.get(
				`${process.env.REACT_APP_API}/comments/post/${postId}`
			);
			if (fetchedComments.status === 200) {
				setComments(fetchedComments.data);
			}
		};
		fetchComments();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '0 12rem',
			}}
		>
			{comments.map((comment) => {
				return (
					<ReplyComment
						user={comment.username}
						userId={comment.user}
						text={comment.text}
					/>
				);
			})}
		</div>
	);
};

export default Comments;
