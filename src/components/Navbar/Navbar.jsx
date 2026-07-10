import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import style from './Navbar.module.css'


import { IoMenuOutline } from "react-icons/io5";

import { FaSearch } from "react-icons/fa";

import { NavLink } from 'react-router-dom';


export default function Navbar() {
  const [isActive, setIsActive] = useState('Home')
  const [navToggle, setNavToggle] = useState(false)
  return (
    <>
      <nav className={`${style.navbarSetting} ${style.navHight} z-50 `} >

        <div className={`nav-container justify-between flex items-center `}>
          <NavLink to="/" onClick={()=>setNavToggle(false)}>  <div className='flex items-center gap-3 '>

            <img className='w-6 md:w-8' src={logo} alt="" />


            <h2 className='text-xl md:text-3xl font-bold  md:font-extrabold text-white'>PiroStream</h2>
          </div></NavLink>
          {/* nav of the pc */}
          <div className={`${style.pcNav}`}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${style.navSettingsPc} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `${style.navSettingsPc} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
                }`
              }
            >
              Movies
            </NavLink>

            <NavLink
              to="/tv_shows"
              className={({ isActive }) =>
                `${style.navSettingsPc} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
                }`
              }
            >
              TV Shows
            </NavLink>


            <NavLink
              to="/search"
              className={({ isActive }) =>
                ` ${style.activeNav} flex justify-center items-center size-10 ${isActive ? 'bg-white text-black  rounded-full' : "text-white"
                } flex gap-1 items-center`
              }
            >
              <FaSearch size={25} />
            </NavLink>
          </div>

          <button onClick={() => { setNavToggle(!navToggle) }} className={`${style.menuBtn}`} ><IoMenuOutline size={25} /></button>
        </div>
        {/* brake line for small screen*/}

        <div className={`${navToggle ? "scale-y-100 my-3" : "scale-y-0 "} w-full h-1 bg-gradient-to-r from-primary  to-secondary lg:hidden `}  ></div>

        {/* nav of the small devices */}
        <div className={`${style.navMobile} nav-container ${navToggle ? "scale-y-100" : "scale-y-0"} ${navToggle ? "max-h-60" : "max-h-0"}  flex lg:hidden overflow-hidden w-full duration-300 `}>
          <NavLink
            to="/"
            onClick={()=>setNavToggle(false)}
            end
            className={({ isActive }) =>
              
              `${style.navSettingsSmallDevices} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            onClick={()=>setNavToggle(false)}
            className={({ isActive }) =>
              `${style.navSettingsSmallDevices} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
              }`
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/tv_shows"
            onClick={()=>setNavToggle(false)}
            className={({ isActive }) =>
              `${style.navSettingsSmallDevices} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
              }`
            }
          >
            TV Shows
          </NavLink>



          <NavLink
            to="/search"
            onClick={()=>setNavToggle(false)}
            className={({ isActive }) =>
              `${style.navSettingsSmallDevices} ${style.activeNav} ${isActive ? style.activeNavtrue : ""
              } flex gap-1 items-center`
            }
          >
            Search
          </NavLink>






        </div>
      </nav >
    </>
  )
}
