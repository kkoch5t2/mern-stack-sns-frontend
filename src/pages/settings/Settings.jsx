import React, { useEffect, useState, useContext, useRef } from 'react'
import Sidebar from '../../commponens/Sidebar/Sidebar'
import Topbar from '../../commponens/Topbar/Topbar'
import './Settings.css';
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import ProfileCommon from '../../commponens/ProfileCommon/ProfileCommon';

export default function Settings() {
  const newUsername = useRef();
  const newEmail = useRef();
  const newPassword = useRef();
  const newDesc = useRef();
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [coverFile, setCoverFile] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${currentUser.username}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      
      const newProfilePicture = {}
      if(file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newProfilePicture.img = fileName;
          
          try{
              //画像APIを叩く
              await axios.post("/upload", data);
          } catch (err) {
              console.log(err);
          }
      }

      const newCoverPicture = {}
      if(coverFile) {
          const coverPictureData = new FormData();
          const coverPictureFileName = Date.now() + coverFile.name;
          coverPictureData.append("name", coverPictureFileName);
          coverPictureData.append("file", coverFile);
          newCoverPicture.img = coverPictureFileName;
          
          try{
              await axios.post("/upload", coverPictureData);
          } catch (err) {
              console.log(err);
          }
      }

      await axios.put(`/users/update/${currentUser._id}`, {
        userId: currentUser._id,
        username: newUsername.current.value,
        email: newEmail.current.value,
        password: newPassword.current.value,
        desc: newDesc.current.value,
        profilePicture: newProfilePicture.img,
        coverPicture: newCoverPicture.img,
      });

      const existingData = JSON.parse(localStorage.getItem("user"));
      const updatedData = {
        ...existingData,
        username: newUsername.current.value,
        email: newEmail.current.value,
        password: newPassword.current.value,
        desc: newDesc.current.value,
        profilePicture: newProfilePicture.img ? newProfilePicture.img : user.profilePicture,
        coverPicture: newCoverPicture.img,
      };
      localStorage.setItem("user", JSON.stringify(updatedData));
      window.location.replace(`http://localhost:3000/profile/settings`);
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
            <ProfileCommon user={user} />
            <div className="profileRightBottom">
                <form onSubmit={handleLike}>
                  <label>ユーザー名</label>
                  <input 
                    type="text" 
                    defaultValue={user.username}
                    ref={newUsername}
                    className='inputCommon inputMarginBottom'
                  />
                  <label>メールアドレス</label>
                  <input 
                    type="email" 
                    required 
                    defaultValue={user.email}
                    ref={newEmail}
                    className='inputCommon inputMarginBottom'
                  />
                  <label>パスワード</label>
                  <input 
                    type="password" 
                    required 
                    minLength="6" 
                    ref={newPassword}
                    className='inputCommon inputMarginBottom'
                  />
                  <label>プロフィール画像</label><br/>
                  <input
                      type="file"
                      id="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => setFile(e.target.files[0])}
                      className='inputMarginBottom'
                  /><br/>
                  <label>ヘッダー画像</label><br/>
                  <input
                      type="file"
                      id="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => setCoverFile(e.target.files[0])}
                      className='inputMarginBottom'
                  /><br/>
                  <label>自己紹介文</label>
                  <textarea
                    type="text" 
                    defaultValue={user.desc}
                    ref={newDesc}
                    className='inputCommon textareaBox inputMarginBottom'
                  >
                  </textarea >
                  <button type="submit" className='changeProfile'>変更する</button>
                </form>
            </div>
          </div>
        </div>
    </>
  )
}
