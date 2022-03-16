import React, { useState } from 'react';
import ReplyComment from './ReplyComment';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import apiServices from '../../services/api.services';

const Comments = () => {
	const { postId } = useParams();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		apiServices.fetchComments(postId, setComments);
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
						commentId={comment._id}
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
