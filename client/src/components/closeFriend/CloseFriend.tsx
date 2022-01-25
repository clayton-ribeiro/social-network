import "./closeFriend.css";

type UserProps = {
  user : {
  profilePicture: String,
  username: String,
  id: number
}
}

export default function CloseFriend({user}: UserProps) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER || '';
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
