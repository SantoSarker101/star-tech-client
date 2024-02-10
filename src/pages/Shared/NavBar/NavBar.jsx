import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { FaSearch } from "react-icons/fa";
const NavBar = () => {
	return (
		<>
		<div className="navbar bg-base-100 md:px-8">

		<div>
			<div className="dropdown">
			<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
			</div>

			<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

				<li><a>Item 1</a></li>
				<li>
				<a>Parent</a>
				<ul className="p-2">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
				</li>
				<li><a>Item 3</a></li>
			</ul>

			</div>

			<div>

			<div>

			<Link to='/' className=" cursor-pointer text-xl ">
				<img className='md:w-28' src={logo} alt="" />
			</Link>


			</div>



			</div>
		</div>

		<div className=''>
			{/* <ul className="menu menu-horizontal px-1">
			<li><a>Item 1</a></li>
			<li>
				<details>
				<summary>Parent</summary>
				<ul className="p-2">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
				</details>
			</li>
			<li><a>Item 3</a></li>
			</ul> */}

			<div className='relative w-full md:ml-8'>

			<input className="input input-bordered join-item w-full relative md:w-96" placeholder="Search" />

			<span className='absolute cursor-pointer top-4 mr-6 left-2/3 md:ml-24'><FaSearch /></span>

			</div>



		</div>

		<div className="navbar-end">


			<div className='md:mx-5 ml-2'>
				<NavLink
				to='/blog'
				className={({ isActive }) => (isActive ? 'border-b-2 border-b-orange-400' : 'default')}>
					Blog
				</NavLink>
			</div>

			<div className='ml-5'>
				<div>
					Account
				</div>
				<div className='flex gap-x-1'>

					<small className='text-fuchsia-400'>
						<NavLink
						to='/register'
						className={({ isActive }) => (isActive ? 'border-b-2 border-b-orange-400' : 'default')}
						>
						Register
						</NavLink>
					</small>


					<small className='text-violet-400'><NavLink
					to='/login'
					className={({ isActive }) => (isActive ? ' border-b-2 border-b-orange-400' : 'default')}
					>
					Login

					</NavLink></small>

				</div>
			</div>

		</div>

		</div>

		</>
	);
};

export default NavBar;