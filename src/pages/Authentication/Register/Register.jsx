import { useForm } from 'react-hook-form';


const img_hosting_token = import.meta.env.VITE_Image_Upload_token;


const Register = () => {

	const { register, handleSubmit, formState: { errors } } = useForm();

	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

	const onSubmit = data => {
		// console.log(data);

		const formData = new FormData();
		formData.append('image', data.image[0]);

		fetch(img_hosting_url, {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(imgResponse => {
			// console.log(imgResponse);
			if(imgResponse.success){
				const imgURL = imgResponse.data.display_url;
				const {name, email, password} = data;
				const newData = {name, email, password, image: imgURL};
				console.log(newData);


				

			}
		})
	}
	console.log(errors);
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
				</label>

				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Password</span>
					</div>

					<input
						type="password"
						placeholder="Enter Your Password" {...register("password", { required: true })}
						className="input input-bordered w-full"
					/>
				</label>


				<label className="form-control w-full md:w-1/3">
					<div className="label">
						<span className="label-text">Choose Your Photo</span>
					</div>

					<input
						type="file" {...register("image", { required: true })}
						className="file-input file-input-bordered file-input-secondary w-1/2"
					/>
				</label>


				<input
					type="submit"
					value="Register"
					className="btn btn-outline btn-accent w-full md:w-1/3 font-bold mt-10"
				/>

			</form>
		</div>
	);
};

export default Register;
