"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export interface Post {
  _id?: string;
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: any) => {
    e.preventDefault();

    if (!session?.user) {
      router.push("/");
    } else {
      setSubmitting(true);

      try {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // @ts-ignore
            userId: session?.user?.id,
            prompt: post.prompt,
            tag: post.tag,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error: any) {
        console.log("Error creating post: ", error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
