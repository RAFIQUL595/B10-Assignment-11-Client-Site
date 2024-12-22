import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { handelGoogleRegister } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        handelGoogleRegister()
            .then(result => {
                Swal.fire({
                    title: "Login Successful!",
                    text: `Your account has been created successfully. Welcome ${result?.user?.displayName}`,
                    icon: "success",
                });
                navigate("/");
            })
            .catch(error => {
                toast.error("Login failed. Please check your credentials.");
            })
    }
    return (
        <div >
            <div className="divider">OR</div>
            <button
                onClick={handleGoogleSignIn}
                className="border border-[#e5eaf2] mx-auto rounded-md py-2 px-16 flex items-center gap-[10px] text-[1rem] text-[#424242] hover:bg-gray-50 transition-all duration-200">
                <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png" alt="google logo"
                    className="w-[23px]" />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;