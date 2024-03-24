import './Search.css'
import Sidebar from '../../commponens/Sidebar/Sidebar'
import Topbar from '../../commponens/Topbar/Topbar'
import Pagination from '../../commponens/Pagination/Pagination';
import Post from '../../commponens/Post/Post';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom'

export default function Search() {
  const search1 = useLocation().search;
  const query = new URLSearchParams(search1);
  const searchValue = query.get('q')
  const [posts, setPosts] = useState([]);
  const [searchResultNull, setSearchResultNull] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 50

  useEffect(() => {
    const fetchPosts = async (req,res) => {
      if(searchValue){
        const response = await axios.get(`/posts/search?q=${searchValue}`);
        if (response.data.length === 0) { // 検索結果がゼロの場合
          setSearchResultNull(true);
        } else {
          setPosts(response.data.sort((post1,post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          }));
          setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        }
      } else {
        setSearchResultNull(true);
      }
    };
    fetchPosts();
  },[]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = posts.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <>
        <Topbar />
        <div className='search'>
          <Sidebar />
          <div className="searchRight">
            <div className="searchRightBottom">
               <div className='postSearch'>
                <div className="postSearchWrapper">
                  <form action="/search" method="GET" className="searchContainer">
                    <input 
                        type="text" 
                        name="q" 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        required
                        placeholder='キーワード'
                    />
                    <button type='submit'>検索</button>
                  </form>
                  {searchResultNull && searchValue ? 
                    <p>検索結果がありません</p> : 
                    <>
                      {subset.map((post) => (
                        <Post post={post} key={post._id} />
                      ))}
                      <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
