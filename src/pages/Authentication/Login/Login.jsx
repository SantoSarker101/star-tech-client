import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
	const {signIn} = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);

		signIn(data.email, data.password)
		.then(result => {
			const user = result.user;
			console.log(user);

			Swal.fire({
				title: "User Login Successful",
				showClass: {
				popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
				  `
				},
				hideClass: {
				popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
				  `
				}
			});
			navigate(from, { replace: true })

		})

	};
	console.log(errors);

	return (
		<div className="my-20 px-4 card">
			<h1 className="text-center mb-10 text-3xl font-bold">
				Login Account
			</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center items-center space-y-6"
			>

				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Your Email</span>
					</div>

					<input
						type="text"
						placeholder="Enter Your Email"
						{...register("email", { required: true })}
						className="input input-bordered w-full"
					/>
				</label>

				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Password</span>
					</div>

					<input
						type="text"
						placeholder="Enter Your Password"
						{...register("password", { required: true })}
						className="input input-bordered w-full"
					/>
				</label>

				<input
					type="submit"
					value="Login"
					className="btn btn-outline btn-accent w-full md:w-1/3 font-bold mt-10"
				/>
			</form>



			<div className="flex items-center mt-20 w-full md:w-1/3 mx-auto">
				<hr className="w-3/12 border" />
				<p className="w-6/12 text-center">or sign in with Google</p>
				<hr className="w-3/12 border" />
			</div>

			<button className="btn btn-outline mt-7 w-full md:w-1/3 mx-auto">
				<FaGoogle /> Sign in with Google
			</button>



			<div className="flex items-center mt-20 w-full md:w-1/3 mx-auto">
				<hr className="w-3/12 border border-b-0 border-gray-400" />
				<p className="w-6/12 text-center text-sm">Don't have an account?</p>
				<hr className="w-3/12 border border-b-0 border-gray-400" />
			</div>

			<Link to='/register' className="flex justify-center">
				<button className="btn btn-outline btn-info md:w-1/3 w-full mx-auto mt-4">Create Your Account</button>
			</Link>
		</div>
	);
};

export default Login;
