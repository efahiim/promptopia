import { Post } from "@app/create-prompt/page";
import PromptCard from "./PromptCard";

interface Props {
  name: string;
  desc: string;
  data: Post[];
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

const UserProfile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post: any, index: number) => (
          <PromptCard
            key={index}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
