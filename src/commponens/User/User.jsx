import React, { useState, useEffect, useContext } from 'react';
import './User.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function User({ user }) {
  const [isFollowing, setIsFollowing] = useState(false); // フォロー状態を管理
  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);
  const { username } = useParams();

  useEffect(() => {
    // user が現在のユーザーのフォロワーであるかどうかをチェックし、その結果に基づいて isFollowing を更新
    setIsFollowing(user.followers.includes(currentUser._id));
  }, [user.followers, currentUser._id]);

  const handleFollow = async () => {
    try {
      if (!isFollowing) {
        // フォローする
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
      } else {
        // フォロー解除する
        await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
      }
      // フォロー状態を更新
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('フォローまたはフォロー解除中にエラーが発生しました:', error);
    }
  };

  return (
    <div className='user'>
      <div className='userWrapper'>
        <div className='userTop'>
          <div className='userTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture ? `${REACT_APP_PUBLIC_FOLDER}${user.profilePicture}` : `${REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`}
                alt=''
                className='userProfileImg'
              />
            </Link>
            <span className='userUsername'>{user.username}</span>
          </div>
          {/* フォローボタンの表示 */}
          {currentUser._id !== user._id && (
            <button onClick={handleFollow} className={isFollowing ? 'unfollowButton' : 'followButton'}>
              {isFollowing ? 'フォロー解除' : 'フォロー'}
            </button>
          )}
        </div>
        <div>{user.desc}</div>
      </div>
    </div>
  );
}
