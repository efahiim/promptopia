"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserProfile from "@components/UserProfile";
import { Post } from "@app/create-prompt/page";
import { error } from "console";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    // @ts-ignore
    if (session?.user?.id) fetchPost();
  }, []);

  const handleEdit = (post: Post) => {
    router.push(`/edit-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id?.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error: any) {
        console.log("Failed to delete prompt", error.message);
      }
    }
  };

  return (
    <UserProfile
      name="My"
      desc="Welcome to your personalized profile page!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
