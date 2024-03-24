import React, { useState, useEffect, useContext } from 'react'
import './Notification.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import Topbar from '../../commponens/Topbar/Topbar';
import Sidebar from '../../commponens/Sidebar/Sidebar';
import ProfileCommon from '../../commponens/ProfileCommon/ProfileCommon';
import Pagination from '../../commponens/Pagination/Pagination';

export default function NotificationLike() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 50

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts/notification/like/${user._id}`);
      setPosts(response.data.sort((post1,post2) => {
        return new Date(post2.likes.updatedAt) - new Date(post1.likes.updatedAt);
      }));
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    };
    fetchPosts();
  }, [user._id]);
  
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = posts.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
    <Topbar />
    <div className='profile'>
      <Sidebar />
      <div className="profileRight">
        <ProfileCommon user={user} />
        <div className="profileRightBottom">
          <div className='timeline'>
            <div className="btnWrapper">
              <Link to="/notification" for="off" class="btn btnLeft switch-off">
                <input type="radio" name="s2" id="off" value="0" />返信の通知
              </Link>
              <label for="on" class="btn btnRight switch-on"><input type="radio" name="s2" id="on" value="1" checked="" />いいねの通知</label>
            </div>
            <div className='likeWrapper'>
              {subset.map((post) => (
                <div className='box'>
                  <div className='boxWrapper'>
                    {post.likes.filter(like => like.id !== user._id).map((like) => (like.username))}さんを含む計{post.likes.filter(like => like.id !== user._id).length}名からのいいね<br/>
                    {post.desc}<br/>
                    <Link to={`/post/${post._id}`}>
                      詳細を確認
                    </Link>
                  </div>
                </div>
              ))}
              <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
