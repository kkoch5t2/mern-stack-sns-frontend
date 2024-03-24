import { DeleteForever } from '@mui/icons-material'
import React, {useState, useEffect, useContext} from 'react'
import './Post.css'
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Post({ post }) {
  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [replyUser, setReplyUser] = useState({});
  const [replyCount, setReplyCount] = useState(0);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users?userId=${post.userId}`);
        setUser(response.data);
      } catch(err) {
        console.log(err);
      }
    };
    const fetchReplyUser = async () => {
        try {
          const response = await axios.get(`/posts/post/${post.replyPostId}/user`);
          setReplyUser(response.data);
        } catch(err) {
          console.log(err);
        }
    };
    const fetchReplyCount = async () => {
      try {
        const response = await axios.get(`/posts/reply/${post._id}`);
        setReplyCount(response.data.length);
      } catch(err) {
        console.log(err);
      }
    };
    fetchUser();
    if(post.replyPostId){
      fetchReplyUser();
    };
    fetchReplyCount();
  }, [post.userId, post._id]);

  const handleLike = async () => {
    // }
    try {
      // いいねのAPIを叩く
      await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id});
    } catch(err) {
      console.log(err);
    }
    if(post.likes.some(item => item.id === currentUser._id)) {
      setLike(isLiked ? like + 1 : like - 1);
      setIsLiked(!isLiked); 
    } else {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
    } catch(err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                        <img src={
                          user.profilePicture
                            ? REACT_APP_PUBLIC_FOLDER + user.profilePicture
                            : REACT_APP_PUBLIC_FOLDER + "/person/noAvatar.png"
                          } 
                          alt="" 
                          className='postProfileImg'
                        />
                    </Link>
                    <span className='postUsername'>{user.username}</span>
                    <span className='postDate'>{format(post.createdAt)}</span>
                </div>
                {currentUser.username === user.username && (
                  <button onClick={() => deletePost()}>
                    <DeleteForever />
                  </button>
                )}
            </div>       
            <div className="postCenter">
                {
                    post.replyPostId
                    ? <span className='postText'>
                        <Link to={`/profile/${replyUser.username}`}>{replyUser.username}</Link>さんへの返信<br/>
                      </span>
                    : null
                }
                <span className="postText">{post.desc}</span>
                <img src={REACT_APP_PUBLIC_FOLDER + post.img} alt="" className='postImg' />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <Link to={`/post/${post._id}`}>
                        <span className="postCommentText">コメント：{replyCount}件</span>
                    </Link>
                </div>
                <div className="postBottomRight">
                    <img src={REACT_APP_PUBLIC_FOLDER + "/material/heart.png"} alt="" className='likeIcon' onClick={() => handleLike()} />
                    <span className="postLikeCounter">{like}人がいいねを押しました</span>
                </div>
            </div>
        </div>
    </div>
  )
}
