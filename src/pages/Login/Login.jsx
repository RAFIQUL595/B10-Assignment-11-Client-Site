import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../shared/SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet';
import lottieLogin from '../../assets/lottiefiles/login.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Login = () => {
    const { handelLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Get the currently signed-in user
        handelLogin(email, password)
            .then((result) => {
                Swal.fire({
                    title: "Login Successful!",
                    text: `Your account has been created successfully. Welcome ${result?.user?.displayName}`,
                    icon: "success",
                });
                form.reset();
                navigate("/");
            })
            .catch((error) => {
                toast.error("Login failed. Please check your credentials.");
            });
    }
    return (
        <div className="hero-content my-10 flex-col gap-5 lg:flex-row-reverse">
            <Helmet>
                <title>Login | Car Rental</title>
            </Helmet>
            <div className="w-96 text-center lg:text-left">
                <Lottie animationData={lottieLogin} />
            </div>
            <div className="card bg-base-100 w-full border-2 max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmitLogin} className="p-8">
                    <h1 className="text-2xl text-center font-bold">Login now!</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Email <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Password <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-lg">Login</button>
                    </div>
                </form>
                <SocialLogin />
                <div className="my-8 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;