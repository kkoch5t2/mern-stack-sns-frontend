import React, { useState, useEffect, useContext } from 'react'
import Post from '../../commponens/Post/Post'
import './Notification.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import Topbar from '../../commponens/Topbar/Topbar';
import Sidebar from '../../commponens/Sidebar/Sidebar';
import ProfileCommon from '../../commponens/ProfileCommon/ProfileCommon';
import Pagination from '../../commponens/Pagination/Pagination';

export default function Notification() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 50

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts/notification/reply/${user._id}`);
      setPosts(response.data.sort((post1,post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
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
              <label for="on" class="btn btnLeft switch-on"><input type="radio" name="s2" id="on" value="1" checked="" />返信の通知</label>
              <Link to="/notification/like" for="off" class="btn btnRight switch-off">
                <input type="radio" name="s2" id="off" value="0" />いいねの通知
              </Link>
            </div>
            <div className='likeWrapper'>
              {subset.map((post) => (
                <Post post={post} key={post._id} />
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
