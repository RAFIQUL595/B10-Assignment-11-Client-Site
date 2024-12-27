import React, { useState } from "react";
import lottieRegister from "../../assets/lottiefiles/register.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import SocialLogin from "../shared/SocialLogin/SocialLogin";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Registration = () => {
  const { handelRegister, handelSignOut, updateUser } = useAuth()
  const navigate = useNavigate();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // password length 6 characters check
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    handelRegister(email, password)
      .then((result) => {
        if (result) {
          updateUser(name, photo)
          .then(()=>{
            Swal.fire({
              title: "Registration Successful!",
              text: "Your account has been created successfully. Please login now!",
              icon: "success",
            });
            handelSignOut()
            .then(()=>{
              navigate("/login");
            })
          })
        }
        form.reset();
      })
      .catch((error) => {
        toast.error(
          "User already exists. Please log in or use a different email."
        );
      });
  };
  return (
    <div className="hero-content my-10 flex-col gap-5 lg:flex-row-reverse">
      <Helmet>
        <title>Register | Car Rental</title>
      </Helmet>
      <div className="text-center lg:text-left">
        <Lottie animationData={lottieRegister} />
      </div>
      <div className="card bg-base-100 w-full border-2 max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit} className="p-8">
          <h1 className="text-2xl text-center font-bold">Register now!</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="name"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered"
              required
            />
          </div>
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
                Photo URL <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">
                Password <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type={isEyeOpen ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            {isEyeOpen ? (
              <IoEyeOutline
                className=" absolute top-12 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(false)}
              />
            ) : (
              <IoEyeOffOutline
                className=" absolute top-12 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(true)}
              />
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-lg">Register</button>
          </div>
        </form>
        <SocialLogin />
        <div className="my-8 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
