import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users with React Query
  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");

      return response.data;
    },
    retry: false, // Prevent infinite retry on error
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div>
        <p>Error fetching users: {error.message}</p>
        <p>Check if your backend is up and the token is valid.</p>
      </div>
    );
  }

  // Render user list
  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id || user.id}>{user.name || user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
