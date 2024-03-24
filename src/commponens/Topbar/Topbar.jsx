import React, { useContext } from 'react'
import "./Topbar.css"
import { Link } from 'react-router-dom'
import { logoutCall } from "../../actionCalls";
import {AuthContext} from "../../state/AuthContext"

export default function Topbar() {
    const {user, dispatch} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        logoutCall(
            {
                userId: user.userId,
            },
            dispatch
        );
    };

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className='logo'>Express SNS</span>
                </Link>
            </div>
            <div className='topbarRight'>
                <a onClick={handleSubmit} className="btnLogout">ログアウト</a>
            </div>
        </div>
    )
}
