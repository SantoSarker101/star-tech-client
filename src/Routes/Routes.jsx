import {
	createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/Blog/Blog";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import Profile from "../Layout/Profile";


  export const router = createBrowserRouter([
	{
	path: "/",
	element: <Main></Main>,
	children: [
		{
			path: '/',
			element: <Home></Home>
		},
		{
			path: 'blog',
			element: <Blog></Blog>
		},
		{
			path: 'register',
			element: <Register></Register>
		},
		{
			path: 'login',
			element: <Login></Login>
		},
	]
	},

	{
		path: 'profile',
		element: <Profile></Profile>,
	}
  ]);