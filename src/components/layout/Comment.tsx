import { IComment } from "@/interfaces/posts.interface";
import React from "react";

interface Props {
  comment: IComment;
}

const Comment = ({ comment }: Props) => {
  return (
    <article className="p-2 flex flex-col gap-2 w-full">
      <span className="font-medium" >
        {comment.name} · <span className="text-gray-500">{comment.email}</span>
      </span>
      <p className="text-sm">{comment.body}</p>
    </article>
  );
};

export default Comment;
