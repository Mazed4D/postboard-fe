import { Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import AddPost from '../home/AddPost';

const PostModal = ({
	visible,
	close,
	isEdit = false,
	editId,
	editText = '',
	isComment = false,
}) => {
	return (
		<Modal visible={visible} footer={null} onCancel={close}>
			<Title level={3}>
				{!isEdit && 'Add post'}
				{isEdit && isComment && 'Edit comment'}
				{isEdit && !isComment && 'Edit post'}
			</Title>
			<AddPost
				editId={editId}
				isEdit={isEdit}
				editText={editText}
				isComment={isComment}
			/>
		</Modal>
	);
};

export default PostModal;
