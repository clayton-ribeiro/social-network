import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

type PostPropType = {
  _id :number,
  createdAt: Date
}

type PostType ={
  likes: Array<number>,
  userId: number,
  _id: number,
  createdAt: Date,
  desc: String,
  img: String,
  comment: String
}

type UserProps = {
  username?: string
}

export default function Feed({username}: UserProps) {
  const [posts, setPosts] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + context?.state.user._id);
      setPosts(
        res.data.sort((p1:PostPropType, p2:PostPropType) => {
          return new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf();
        })
      );
    };
    fetchPosts();
  }, [username, context?.state.user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === context?.state.user.username) && <Share />}
        {posts.map((p:PostType) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
