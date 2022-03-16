import { Drawer, Layout, Menu } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MessageFilled, MenuOutlined } from '@ant-design/icons';
import styles from './Layout.module.less';
import Text from 'antd/lib/typography/Text';
import { useDispatch } from 'react-redux';
import authServices from '../../services/auth.service';
import { deleteCredientials } from '../../redux/auth';
import { useMediaQuery } from 'react-responsive';
import MenuComp from './Menu';
import { useState } from 'react';

const { Header, Footer, Content } = Layout;

const LayoutComp = () => {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	const isLoggedIn = token || false;
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	const logoutHandler = () => {
		authServices.logout();
		dispatch(deleteCredientials());
		navigate(0);
	};

	return (
		<Layout className='layout' style={{ minHeight: '100vh' }}>
			<Header>
				<div className={styles.logo}>
					<Text style={{ fontSize: '1rem' }}>
						<MessageFilled /> Postboard
					</Text>
				</div>
				{isDesktopOrLaptop && (
					<MenuComp
						isLoggedIn={isLoggedIn}
						userId={userId}
						logoutHandler={logoutHandler}
					/>
				)}
				{!isDesktopOrLaptop && (
					<>
						<Menu mode='horizontal' theme='dark'>
							<Menu.Item
								key='drawer'
								style={{ marginLeft: 'auto' }}
								onClick={() => setVisible(true)}
							>
								<MenuOutlined />
							</Menu.Item>
						</Menu>
						<Drawer
							placement='left'
							onClose={onClose}
							visible={visible}
							width={'60vw'}
							onClick={() => setVisible(false)}
						>
							<MenuComp
								mode='vertical'
								isLoggedIn={isLoggedIn}
								userId={userId}
								logoutHandler={logoutHandler}
							/>
						</Drawer>
					</>
				)}
			</Header>
			<Layout>
				<Content style={{ padding: '50px' }}>
					<div className={styles['space-align-container']}>
						<Outlet />
					</div>
				</Content>
			</Layout>
			<Footer style={{ textAlign: 'center' }}>
				Postboard-FE, made by <a href='https://github.com/Mazed4d'>Milan</a>
			</Footer>
		</Layout>
	);
};

export default LayoutComp;
