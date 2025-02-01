
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useEmployee = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: employee} = useQuery({
        queryKey: [user?.email, 'isEmployee'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/employee/${user.email}`);
            return res.data?.isEmployee;
            },
    })
    return [employee];
};

export default useEmployee;