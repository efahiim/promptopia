"use client";

import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";
import { Post } from "@app/create-prompt/page";

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </section>
  );
};

export default Feed;
