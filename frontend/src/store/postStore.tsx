import axios from "axios";
import { atom, selector } from "recoil";

export interface Post {
    description : string,
    initialTimestamp : number,
    status : string,
    finalTimeStamp :number,
    title : string,
    __v : 0,
    _id : string,
}

export const postsAtom = atom<Post[]>({
    key: "postsAtom",
    default: selector({
        key: "postsAtomSelector",
        get: async ({ }) => {

            // await new Promise((r) => { setTimeout(r, 1000) });
            const res = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}post/`);            
            return res.data.posts;
        }
    })
})