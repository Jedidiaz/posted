"use client";
import { getCommentsByPostId } from "@/app/actions";
import Comment from "@/components/layout/Comment";
import LoadingComments from "@/components/layout/LoadingComments";
import Post from "@/components/layout/Post";
import { IPost } from "@/interfaces/posts.interface";
import { IUser } from "@/interfaces/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Send } from "lucide-react";
import React, { ChangeEvent, Suspense, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next-nprogress-bar";

interface Props {
  user: IUser;
  post: IPost;
}

const PostDetail = ({ post, user }: Props) => {
  const {
    data: comments,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["posts", post.id, "comments"],
    queryFn: () => getCommentsByPostId(String(post.id)),
  });

  const router = useRouter();

  const [commentState, setCommentState] = React.useState({
    comments: comments ?? [],
    text: "",
  });
  const commentsRef = useRef<HTMLDivElement>(null);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setCommentState((prev) => ({ ...prev, text: e.target.value }));

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentState.text.trim()) {
      return;
    }

    setCommentState((prev) => ({
      comments: [
        ...prev.comments,
        {
          body: prev.text,
          email: "jedidiazdfagundez@gmail.com",
          id: prev.comments.length,
          name: "JedyDev",
          postId: post.id,
        },
      ],
      text: "",
    }));
  };

  const handleBack = () => router.back();

  useEffect(() => {
    setCommentState((prev) => ({ ...prev, comments: comments ?? [] }));
  }, [comments]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [commentState.comments]);

  return (
    <main className="max-w-screen-md m-auto px-4 mt-4 relative">
      <header className="w-full sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-10">
        <button
          className="bg-neutral-50/5 p-2 rounded-full relative overflow-hidden transition-colors hover:bg-neutral-50/20"
          onClick={handleBack}
        >
          <ArrowLeft size={16} />
        </button>
      </header>
      <Post post={post} user={user} isDetail totalComments={comments?.length} />
      {isLoading || isFetching ? (
        <LoadingComments />
      ) : (
        <section className="px-4 flex flex-col gap-4" ref={commentsRef}>
          <AnimatePresence>
            {comments &&
              commentState.comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Comment comment={comment} />
                </motion.div>
              ))}
          </AnimatePresence>
          <footer className="sticky bottom-0 pb-2">
            <form
              className="flex flex-col gap-2 bg-[#0C0C0C] p-2 rounded-2xl"
              onSubmit={handleSubmitComment}
            >
              <Input
                placeholder="Escribe tu comentario..."
                className="rounded-full bg-transparent border-none resize-none"
                value={commentState.text}
                onChange={handleChangeText}
              />
              <div className="flex justify-end">
                <button className="rounded-full p-2" type="submit">
                  <Send className="text-gray-100" />
                </button>
              </div>
            </form>
          </footer>
        </section>
      )}
    </main>
  );
};

export default PostDetail;
