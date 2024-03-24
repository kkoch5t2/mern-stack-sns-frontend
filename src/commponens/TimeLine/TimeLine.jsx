import React, { useState, useEffect, useContext } from 'react'
import Post from '../Post/Post'
import './TimeLine.css'
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import Pagination from '../Pagination/Pagination';

export default function TimeLine({username}) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 50
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username 
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(response.data.sort((post1,post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      }));
      setTotalPages(Math.ceil(response.data.length / itemsPerPage))
    };
    fetchPosts();
  }, [username, user._id]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = posts.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className='timeline'>
      {subset.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />
    </div>
  )
}
