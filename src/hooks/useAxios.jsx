import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
    baseURL: "https://car-rental-server-tawny.vercel.app",
    withCredentials: true,
});

const useAxios = () => {
    const { handelSignOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    // Handle unauthorized or forbidden responses
                    handelSignOut()
                        .then(() => {
                            navigate("/login");
                        })
                        .catch((err) => {
                            toast.error("Error logging out:", err);
                        });
                }
                return Promise.reject(error);
            }
        );

        // Cleanup: Eject the interceptor when the component using this hook unmounts
        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [handelSignOut, navigate]);

    return axiosInstance;
};

export default useAxios;