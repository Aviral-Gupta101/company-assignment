import { PostForm } from "@/components/ui/PostForm";

type Props = {

}
export const CreatePostPage = ({ }: Props) => {
    return (

        <div className="flex min-h-screen justify-center items-center">
            <div className="w-[400px] border p-10 rounded-md">
                <PostForm/>
            </div>
        </div>

    );
}