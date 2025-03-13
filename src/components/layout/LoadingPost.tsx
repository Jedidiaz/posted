import React from "react";

const LoadingPost = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <div className="h-20 bg-neutral-800 rounded-lg w-full animate-pulse"></div>
      <div className="h-20 bg-neutral-800 rounded-lg w-full animate-pulse"></div>
      <div className="h-20 bg-neutral-800 rounded-lg w-full animate-pulse"></div>
      <div className="h-20 bg-neutral-800 rounded-lg w-full animate-pulse"></div>
    </div>
  );
};

export default LoadingPost;
