import { Post } from "@app/create-prompt/page";
import PromptCard from "./PromptCard";

interface Props {
  data: Post[];
  handleTagClick: Function;
  handleEdit: React.MouseEventHandler;
  handleDelete: React.MouseEventHandler;
}

const PromptCardList = ({
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any, index: number) => (
        <PromptCard
          key={index}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
