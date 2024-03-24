import React from 'react'
import './Home.css'
import Sidebar from '../../commponens/Sidebar/Sidebar'
import Topbar from '../../commponens/Topbar/Topbar'
import TimeLine from '../../commponens/TimeLine/TimeLine'
import Share from '../../commponens/Share/Share'

export default function Home() {
  return (
    <>
        <Topbar />
        <div className='homeContainer'>
          <Sidebar />
          <div className='rightWrapper'>
            <Share />
            <TimeLine />
          </div>
        </div>
    </>
  )
}
