import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React, { ReactDOM, mountNode } from 'react';

const { TextArea } = Input;

const AddComment = ({ onChange, onSubmit, submitting, value }) => (
	<div
		style={{
			minWidth: '44vw',
		}}
	>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType='submit'
				loading={submitting}
				onClick={onSubmit}
				type='primary'
			>
				Add Comment
			</Button>
		</Form.Item>
	</div>
);

export default AddComment;
