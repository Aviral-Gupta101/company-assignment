import { Link } from "react-router-dom";

type Props = {

}
export const Navbar = ({ }: Props) => {
    return (
        <div className="bg-slate-300 flex absolute h-16 top-0 w-full justify-around items-center border-b">
            <Link to={"/"} >
                <div className="text-xl hover:underline font-500">View All Posts</div>
            </Link>
            <Link to={"/create"} >
                <div className="text-xl hover:underline font-500">Create Post</div>
            </Link>
            
        </div>
    );
}