import React from 'react'
import './ProfileCommon.css';

export default function ProfileCommon({user}) {
  const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
        <div className="profileCover">
            <img 
                src={
                    user.coverPicture
                        ? REACT_APP_PUBLIC_FOLDER + user.coverPicture
                        : REACT_APP_PUBLIC_FOLDER + "/cover/defaultCoverImg.jpg"
                    } 
                alt="" 
                className='profileCoverImg'
            />
            <img 
                src={
                    user.profilePicture
                        ? REACT_APP_PUBLIC_FOLDER + user.profilePicture
                        : REACT_APP_PUBLIC_FOLDER + "/person/noAvatar.png"
                    }
                alt=""
                className='profileUserImg'
            />
        </div>
        <div className="profileInfo">
            <h4 className='profileInfoName'>{user.username}</h4>
            <span>{user.desc}</span>
        </div>
    </>
  )
}
