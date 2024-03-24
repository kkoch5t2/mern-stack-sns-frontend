import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import { Image } from '@mui/icons-material'
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';

export default function Share() {
  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
        userId : user._id,
        desc: desc.current.value
    }

    if(file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        
        try{
            //画像APIを叩く
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
                    className='shareInput'
                    ref={desc}
                    placeholder='今何しているの？'
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
  )
}
