import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const axiosSecure = axios.create({
    baseURL: 'https://b10a12-server-side-rakib-gazi.vercel.app/',
    // baseURL: 'http://localhost:5000/',
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {LogOutUser} = useAuth();
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    })
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },function(error){
        const status = error.response.status;
        
        if(status=== 401 || status === 403){
            LogOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure ;
};

export default useAxiosSecure;