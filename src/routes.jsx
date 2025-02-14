import GetStartedPage from "./pages/getstarted/GetStartedPage"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"

import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorPage from "./pages/ErrorPage"
import Chats from "./pages/chats/Chats";
import Search from "./pages/search/Search";
import Settings from "./pages/settings/Settings";
import Chat from "./pages/chat/Chat";

const routes = {
  getstarted: {
    path: '/',
    element: <GetStartedPage />
  },
  login: {
    path: '/login',
    element: <LoginPage />
  },
  register: {
    path: '/register',
    element: <RegisterPage />
  },
  home: {
    path: '/home',
    element: <HomePage />,
    children: {
      chats: {
        path: '/home/chats',
        element: <Chats />,
        icon: <ChatIcon />,
        name: 'Chats'
      },
      chat: {
        path: '/home/chats/:id',
        element: <Chat />,
      },
      search: {
        path: '/home/search',
        element: <Search />,
        icon: <SearchIcon />,
        name: 'Search'
      },
      settings: {
        path: '/home/settings',
        element: <Settings />,
        icon: <SettingsIcon />,
        name: 'Settings'
      }
    }
  },
  error: {
    path: '*',
    element: <ErrorPage />
  }
}

export default routes;