import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import Settings from "./pages/settings/Settings";
import Notification from "./pages/notification/Notification";
import NotificationLike from "./pages/notification/NotificationLike";
import Follow from "./pages/follow/Follow";
import Follower from "./pages/follow/Follower";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
import { AuthContext } from "./state/AuthContext";
import PostDetail from "./pages/PostDetail/PostDetail";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Register />} />
        <Route path="/profile/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/profile/:username/follow" element={user ? <Follow /> : <Register />} />
        <Route path="/profile/:username/follower" element={user ? <Follower /> : <Register />} />
        <Route path="/search" element={user ? <Search /> : <Register />} />
        <Route path="/notification" element={user ? <Notification /> : <Register />} />
        <Route path="/notification/like" element={user ? <NotificationLike /> : <Register />} />
        <Route path="/post/:id" element={user ? <PostDetail /> : <Register />} />
      </Routes>
    </Router>
  )
  ;
}

export default App;
