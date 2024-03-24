import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../../commponens/Sidebar/Sidebar'
import Topbar from '../../commponens/Topbar/Topbar'
import TimeLine from '../../commponens/TimeLine/TimeLine'
import ProfileCommon from '../../commponens/ProfileCommon/ProfileCommon'
import './Profile.css';
import axios from "axios";
import { useParams,Link } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext';

export default function Profile() {
  const [profileUser, setUser] = useState({});
  const username = useParams().username;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, [profileUser]);

  const follow = async (req,res) => {
    try {
        await axios.put(`/users/${profileUser._id}/follow`, { userId: user._id });
    } catch(err) {
        console.log(err);
    }
  };

  const unfollow = async (req,res) => {
    try {
        await axios.put(`/users/${profileUser._id}/unfollow`, { userId: user._id });
    } catch(err) {
        console.log(err);
    }
  };

  return (
    <>
        <Topbar />
        <div className='profile'>
          <Sidebar />
          <div className="profileRight">
            <ProfileCommon user={profileUser} />
            <div className='followWrraper'>
                <div>
                    <Link to={`/profile/${profileUser.username}/follow`}>
                    フォロー数：{profileUser.followings ? profileUser.followings.length : null}
                    </Link>
                    <Link to={`/profile/${profileUser.username}/follower`} style={{marginLeft: "10px"}}>
                    フォロワー数：{profileUser.followers ? profileUser.followers.length : null}
                    </Link>
                </div>
                {profileUser._id === user._id
                    ? null
                    : profileUser.followers
                        ? (
                            profileUser.followers.includes(user._id)
                            ? <button onClick={unfollow} className="unfollowButton">フォロー解除</button> 
                            : <button onClick={follow} className="followButton">フォロー</button>
                        )
                        : null
                }
            </div>
            <div className="profileRightBottom">
                <TimeLine username={username} />
            </div>
          </div>
        </div>
    </>
  )
}
