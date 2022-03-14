import { Layout, Menu } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
	HomeOutlined,
	UserOutlined,
	LogoutOutlined,
	MessageFilled,
} from '@ant-design/icons';
import styles from './Layout.module.less';
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import authServices from '../../services/auth.service';
import { deleteCredientials } from '../../redux/auth';

const { Header, Footer, Content } = Layout;

const LayoutComp = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	const isLoggedIn = token || false;
	const dispatch = useDispatch();

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
				<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
					{isLoggedIn && (
						<>
							<Menu.Item key='home'>
								<NavLink to={'/'}>
									<HomeOutlined /> Home
								</NavLink>
							</Menu.Item>
							<Menu.Item key='profile'>
								<NavLink to={`/user/${userId}`}>
									<UserOutlined /> Profile
								</NavLink>
							</Menu.Item>
							<Menu.Item
								key='logout'
								style={{ marginLeft: 'auto' }}
								onClick={logoutHandler}
							>
								<LogoutOutlined /> Logout
							</Menu.Item>
						</>
					)}
				</Menu>
			</Header>
			<Content style={{ padding: '50px' }}>
				<div className={styles['space-align-container']}>
					<Outlet />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Postboard-FE, made by <a href='https://github.com/Mazed4d'>Milan</a>
			</Footer>
		</Layout>
	);
};

export default LayoutComp;
