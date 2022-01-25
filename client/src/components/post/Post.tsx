import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


type PostProps = {
  post:{
  likes: Array<number>,
  userId: number,
  _id: number,
  createdAt: Date,
  desc: String,
  img: String,
  comment: String
}
}

 interface IUser {
  username: string,
  email: string,
  password:string,
  profilePicture:string,
  coverPicture:string,
  followers: Array<Number>,
  followings: Array<Number>,
  isAdmin: Boolean,
  desc:string,
  city:string,
  from:string,
  relationship:Number,
  _doc: any
}

export default function Post({post}: PostProps) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<IUser>();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER || '';
  const context= useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(context?.state.user._id!));
  }, [context?.state.user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: context?.state.user._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="postProfileImg"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture + "&output=embed"
                    : PF + "person/noAvatar.png&output=embed"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
