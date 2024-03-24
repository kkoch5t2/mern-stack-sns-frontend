import React, { useState, useEffect } from 'react'
import './Follow.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Topbar from '../../commponens/Topbar/Topbar';
import Sidebar from '../../commponens/Sidebar/Sidebar';
import ProfileCommon from '../../commponens/ProfileCommon/ProfileCommon';
import User from '../../commponens/User/User';
import Pagination from '../../commponens/Pagination/Pagination';

export default function Follower() {
  const [users, setUsers] = useState([]);
  const username = useParams().username;
  const [profileUser, setProfileUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 50

  useEffect(() => {
    const fetchUsers = async () => {
        const profileUserInfo = await axios.get(`/users?username=${username}`);
        setProfileUser(profileUserInfo.data);
        const response = await axios.get(`/users/user/${profileUserInfo.data._id}/follower`);
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    };
    if (username && !profileUser._id) { // usernameが存在し、profileUserの_idが存在しない場合のみfetchUsersを実行
        fetchUsers();
    };
  }, [username, profileUser._id]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = users.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
    <Topbar />
    <div className='profile'>
      <Sidebar />
      <div className="profileRight">
        <ProfileCommon user={profileUser} />
        <div className='profileBack'>
        <Link to={`/profile/${profileUser.username}`}>プロフィールに戻る</Link>
        </div>
        <div className="profileRightBottom">
          <div className='followListWrapper'>
            <h4>{profileUser.username}さんのフォロワー一覧</h4>
            {users ? (subset.map((user) => (
              <User user={user} />
            ))) : null}
            <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
