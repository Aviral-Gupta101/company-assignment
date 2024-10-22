import { RenderTable } from "@/components/ui/RenderTable";
import { RenderTableRow } from "@/components/ui/RenderTableRow";
import { Post, postsAtom } from "@/store/postStore";
import { useEffect } from "react";
import { useRecoilStateLoadable} from "recoil";


export const HomePage = () => {    
    return (
        <div className="p-5 mt-16">
            <div className="text-3xl text-center mb-5">Data Table</div>
            <div className="border"><ShowData /></div>
        </div>
    );
}

function ShowData() {

    const [posts, setPosts] = useRecoilStateLoadable(postsAtom);

   useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_ADDRESS}sse/`);

    eventSource.addEventListener("update", (event) => {
        const data = JSON.parse(event.data);


        setPosts((post) => {

            let newState: Post[] = [];
            post.forEach((p) => {

                if(p._id == data.id){


                    const newPost:Post = {
                        ...p,
                        status: data.status,
                        finalTimeStamp: data.finalTimeStamp
                    }

                    newState = [...newState, newPost];

                }
                else {
                    newState = [...newState, p];
                }
            })

            return newState;

        })
    });

    eventSource.addEventListener("new-data", (event) => {

        const data:Post = JSON.parse(event.data);
        setPosts((post) => {

            if(post.find((p) => p._id == data._id)){
                return post;
            }
            return [...post, data];
        })
        
    });
   }, []);
    
    if (posts.state === "hasError") {

        return <div>
            <h2>Something went wrong while fetching posts</h2>
        </div>
    }
    else if (posts.state === "loading") {

        return (
            <RenderTable>
                <RenderTableRow isLoading={true} />
            </RenderTable>
        );
    }

    else if (posts.state === "hasValue") {

        return (
            <RenderTable>
                {
                    posts.contents.map((p) => <RenderTableRow
                        key={p._id}
                        isLoading={false}
                        id={p._id}
                        title={p.title}
                        description={p.description}
                        initTimestamp={p.initialTimestamp}
                        status={p.status}
                        finalTimestamp={p.finalTimeStamp}
                    />)
                }
            </RenderTable>
        );
    }
}