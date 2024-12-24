import axios from 'axios';
import React from 'react';
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

// const useAxios = () => {
//     return axiosInstance
// };

export const useAxios = axiosInstance;