import { Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import AddPost from '../home/AddPost';

const PostModal = ({ visible, close }) => {
	return (
		<Modal visible={visible} footer={null} onCancel={close}>
			<Title level={3}>Add post</Title>
			<AddPost />
		</Modal>
	);
};

export default PostModal;
