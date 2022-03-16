import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import {
	HomeOutlined,
	UserOutlined,
	LogoutOutlined,
	TeamOutlined,
	MenuOutlined,
} from '@ant-design/icons';

const MenuComp = ({
	isLoggedIn,
	userId,
	logoutHandler,
	mode = 'horizontal',
}) => {
	return (
		<Menu
			theme='dark'
			mode={mode}
			defaultSelectedKeys={['2']}
			style={{ paddingRight: 0 }}
			overflowedIndicator={<MenuOutlined />}
		>
			{isLoggedIn && (
				<>
					<Menu.Item key='home'>
						<NavLink to={'/'}>
							<HomeOutlined /> Home
						</NavLink>
					</Menu.Item>
					<Menu.Item key='followed'>
						<NavLink to={`/followed`}>
							<TeamOutlined /> Followed
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
	);
};

export default MenuComp;
