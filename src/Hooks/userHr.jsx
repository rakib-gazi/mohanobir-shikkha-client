
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const userHr = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: hr} = useQuery({
        queryKey: [user?.email, 'isHr'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/hr/${user.email}`);
            return res.data?.isHr;
            },
    })
    return [hr];
};

export default userHr;