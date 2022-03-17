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
}) => {
	return (
		<Modal visible={visible} footer={null} onCancel={close}>
			<Title level={3}>{isEdit ? 'Edit post' : 'Add post'}</Title>
			<AddPost editId={editId} isEdit={isEdit} editText={editText} />
		</Modal>
	);
};

export default PostModal;
