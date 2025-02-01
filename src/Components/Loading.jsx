import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="w-11/12 mx-auto min-h-screen flex justify-center items-center">
      <div className="text-center">
        <Spinner aria-label="Center-aligned Extra large spinner example" size="xl"/>
      </div>
    </div>
  );
};

export default Loading;
