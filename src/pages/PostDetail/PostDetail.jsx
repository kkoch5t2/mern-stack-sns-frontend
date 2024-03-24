import React, {useState, useEffect, useContext, useRef} from 'react'
import './PostDetail.css'
import Sidebar from '../../commponens/Sidebar/Sidebar'
import Topbar from '../../commponens/Topbar/Topbar'
import Post from '../../commponens/Post/Post'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import { Image } from '@mui/icons-material'
import Pagination from '../../commponens/Pagination/Pagination'


export default function PostDetail() {
  const [posts, setPosts] = useState();
  const [replyPosts, setReplyPosts] = useState([]);
  const params = useParams().id;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 50

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts/post/${params}`);
      const responseReply = await axios.get(`/posts/reply/${params}`);
      setPosts(response.data);
      setReplyPosts(responseReply.data);
      setTotalPages(Math.ceil(responseReply.data.length / itemsPerPage))
    };
    fetchPosts();
  },[params]);


  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = replyPosts.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
        userId : user._id,
        desc: desc.current.value,
        replyPostId: posts._id,
    }
    if(file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        
        try{
            await axios.post("/upload", data);
        } catch (err) {
            console.log(err);
        }
    }

    try {
        await axios.post("/posts", newPost);
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
  }


  return (
    <>
        <Topbar />
        <div className='postDetail'>
          <Sidebar />
          <div className="postDetailRight">
            {posts ? <Post post={posts} key={posts._id} /> : <p>準備中</p>}
            <div className='share'>
                <div className="shareWrapper">
                    <div className="shareTop">
                        <img 
                            src={
                                user.profilePicture
                                ? REACT_APP_PUBLIC_FOLDER + user.profilePicture
                                : REACT_APP_PUBLIC_FOLDER + "/person/noAvatar.png"
                            }
                            alt=""
                            className='shareProfileImg'
                        />
                        <textarea
                            type="text"
                            className='shareInput'
                            placeholder='返信をポスト'
                            ref = {desc}
                        >
                        </textarea>
                    </div>
                    <hr  className='shareHr'/>
                    <form className="shareButtons" onSubmit={(e) => handSubmit(e)}>
                        <label className="shareOption" htmlFor="file">
                            <Image className='shareIcon' htmlColor='blue' />
                            <span className="shareOptionText">写真</span>
                            <input
                                type="file"
                                id="file"
                                accept=".png, .jpg, .jpeg"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <button className='shareButton' type="submit">投稿</button>
                    </form>
                </div>
            </div>
            <div className='replyWrapper'>
                {subset.map((post) => (
                <Post post={post} key={post._id} />
                ))}
            </div>
            <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />
          </div>
        </div>
    </>
  )
}
