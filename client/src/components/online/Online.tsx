import "./online.css";

type UserProps = {
  user:{
  profilePicture: String,
  username: String,
  id: number
}
}

export default function Online({user}: UserProps) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER || '';

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
