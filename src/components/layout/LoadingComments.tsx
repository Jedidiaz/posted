import React from "react";

const LoadingComments = () => {
  return (
    <section className="w-full">
      {[1, 2, 3, 4].map((item) => (
        <Loading key={item} />
      ))}
    </section>
  );
};

const Loading = () => {
  return (
    <article className="p-2 flex flex-col gap-2 w-full">
      <div className="flex gap-2 w-full">
        <div className="min-h-4 bg-neutral-800 rounded-lg min-w-24 animate-pulse" />
        <div className="min-h-4 bg-neutral-800 rounded-lg min-w-32 animate-pulse" />
      </div>
      <div className="h-10 bg-neutral-800 rounded-lg w-full animate-pulse" />
    </article>
  );
};

export default LoadingComments;
