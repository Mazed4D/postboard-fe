import { Layout, Menu } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.less';

const { Header, Footer, Content } = Layout;

const LayoutComp = () => {
	return (
		<Layout className='layout' style={{ minHeight: '100vh' }}>
			<Header>
				<div className='logo' />
				<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
					<Menu.Item>
						<NavLink to={'/'}>Home</NavLink>
					</Menu.Item>
					<Menu.Item>
						<NavLink to={'/user/fakeuserid'}>Profile</NavLink>
					</Menu.Item>
					<Menu.Item>
						<NavLink to={'/auth'}>Authenticate (TEMP)</NavLink>
					</Menu.Item>
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
