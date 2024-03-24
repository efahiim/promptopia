import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: any, { params }: { params: any }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
