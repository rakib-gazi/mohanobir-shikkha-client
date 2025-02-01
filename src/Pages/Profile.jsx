import { useQuery } from "@tanstack/react-query";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";

const Profile = () => {
  const {user}= useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: profile = [], refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `employee-profile/${user?.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
    
  });
  const name = profile.fullName;
  const email = profile.email;
  return (
    <div>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div className="px-4 py-6 bg-btn shadow-xl">
        <div className="w-11/12 mx-auto">
          <h1 className="text-center text-3xl font-bold text-black py-4">
            My Profile
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl my-12 ">
        <div className="p-4">
          <form onSubmit="" className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="FullName" value="Full Name" />
              </div>
              <TextInput
                id="FullName"
                type="text"
                name="FullName"
                defaultValue={name}
                placeholder="Mohammed Rakib Gazi"
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Email" value="Email" />
              </div>
              <TextInput
                id="Email"
                type="Email"
                name="Email"
                defaultValue={email}
                placeholder="example@gmail.com"
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload Photo" />
              </div>
              <FileInput id="file-upload" name="companyLogo" />
            </div>
            <Button type="submit" className="bg-nav">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
