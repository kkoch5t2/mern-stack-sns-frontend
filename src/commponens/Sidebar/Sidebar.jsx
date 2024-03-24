import { Home, Notifications, Person, Search, Settings } from '@mui/icons-material';
import React, { useContext } from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import {AuthContext} from "../../state/AuthContext"

export default function Sidebar() {
    const {user} = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <ul className='sidebarList'>
                    <Link to="/" style={{textDecoration:"none", color:"black"}}>
                        <li className='sidebarListItem'>
                            <Home className="sidebarIcon" />
                            <span className="sidebarListItemText">ホーム</span>
                        </li>
                    </Link>
                    <Link to="/search" style={{textDecoration:"none", color:"black"}}>
                        <li className='sidebarListItem'>
                            <Search className="sidebarIcon" />
                            <span className="sidebarListItemText">検索</span>
                        </li>
                    </Link>
                    <Link to="/notification" style={{textDecoration:"none", color:"black"}}>
                        <li className='sidebarListItem'>
                            <Notifications className="sidebarIcon" />
                            <span className="sidebarListItemText">通知</span>
                        </li>
                    </Link>
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none", color:"black"}}>
                        <li className='sidebarListItem'>
                            <Person className="sidebarIcon" />
                            <span className="sidebarListItemText">プロフィール</span>
                        </li>
                    </Link>
                    <Link to={`/profile/settings`} style={{textDecoration:"none", color:"black"}}>
                        <li className='sidebarListItem'>
                            <Settings className="sidebarIcon" />
                            <span className="sidebarListItemText">設定</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
