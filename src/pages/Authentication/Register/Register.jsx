import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { Result } from 'postcss';


const img_hosting_token = import.meta.env.VITE_Image_Upload_token;


const Register = () => {

	const {createUser, updateUserProfile} = useContext(AuthContext);
	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors } } = useForm();

	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

	const onSubmit = data => {
		console.log(data);

		const formData = new FormData();
		formData.append('image', data.image[0]);

		fetch(img_hosting_url, {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(imgResponse => {
			console.log(imgResponse);
			if(imgResponse.success){
				const image = imgResponse.data.display_url;
				console.log(image);
				const { name, email, password } = data;
				const newData = { name, email, password, image: image };
				console.log(newData);


				createUser(email, password)
				.then(result => {
					const user = result.user;
					console.log(user);

					updateUserProfile(name, image)
					.then(() => {
						console.log('User Profile Info Updated');

						Swal.fire({
							position: "top-end",
							icon: "success",
							title: "User Created Successfully",
							showConfirmButton: false,
							timer: 1500
						});

						navigate('/');
					})
					.catch(error => console.log(error));
				})


			}
		})
	}
	// console.log(errors);
	console.log(img_hosting_token);

	return (
		<div className="my-20 px-4">
			<h1 className="text-center mb-10 text-3xl font-bold">
				Register Account
			</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center space-y-6">
				<label className="form-control w-full md:w-1/3">
					<div className="label font-semibold">
						<span className="label-text">Your Name</span>
					</div>

					<input
						type="text"
						placeholder="Enter Your Name" {...register("name", {required: true, maxLength: 120})}
						className="input input-bordered w-full"
					/>

					{errors.name && <span className='text-red-500'>Name is required</span>}

				</label>

				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Your Email</span>
					</div>

					<input
						type="email"
						placeholder="Enter Your Email" {...register("email", { required: true })}
						className="input input-bordered w-full"
					/>

					{errors.email && <span className='text-red-500'>Email is required</span>}

				</label>

				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Password</span>
					</div>

					<input
						type="password"
						placeholder="Enter Your Password" {...register("password", { required: true, minLength: 8, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#%$&*])(?=.*[0-9])(?=.*[a-z])/ })}
						className="input input-bordered w-full"
					/>

					{errors.password?.type === "required" && (
							<p className='text-red-500' role="alert">Password must be 8 Characters</p>
					)}
					{errors.password?.type === "minLength" && (
							<p className='text-red-500' role="alert">Password must be 8 Characters</p>
					)}
					{errors.password?.type === "maxLength" && (
							<p className='text-red-500' role="alert">Password must be Less then 20 Characters</p>
					)}
					{errors.password?.type === "pattern" && (
							<p className='text-red-500' role="alert">Password must have one Upper Case, One Lower Case, One Number and One Special Character</p>
					)}

				</label>


				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Choose Your Photo</span>
					</div>

					<input
						type="file" {...register("image", { required: true })}
						className="file-input file-input-bordered file-input-secondary w-1/2"
					/>
					{errors.image && <span className='text-red-500'>Image is required</span>}
				</label>


				<input
					type="submit"
					value="Register"
					className="btn btn-outline btn-accent w-full md:w-1/3 font-bold mt-10"
				/>

			</form>



			<div className="flex items-center mt-20 w-full md:w-1/3 mx-auto">
				<hr className="w-3/12 border border-b-0 border-gray-400" />
				<p className="w-6/12 text-center text-sm">Already have an account?</p>
				<hr className="w-3/12 border border-b-0 border-gray-400" />
			</div>

			<p className="mx-auto flex justify-center text-sm mt-8">If you already have an account with us, please login at the</p>

			<p className="mx-auto flex justify-center text-sm mt-3 text-red-600 font-bold"><Link to='/login'>Login Page</Link></p>
		</div>
	);
};

export default Register;
