import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import style from './Navbar.module.css'

import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    const [isActive, setIsActive] = useState('Home')
    const [navToggle, setNavToggle] = useState(false)
    return (
        <>
            <nav className={`${style.navbarSetting} ${style.navHight}`} >
                
                <div className='nav-container justify-between flex items-center'>
                    <div className='flex items-center gap-3 '>
                        <img className='w-6 md:w-8' src={logo} alt="" />
                        <h2 className='text-xl md:text-3xl font-bold  md:font-extrabold text-white'>PiroStream</h2>
                    </div>
                    {/* nav of the pc */}
                    <div className={`${style.pcNav}`}>
                        <NavLink onClick={() => {
                            setIsActive('Home')
                        }} to={'/'} className={`${style.navSettingsPc} ${style.activeNav} ${isActive == 'Home' ? style.activeNavtrue : ""} `}>Home</NavLink>

                        <NavLink onClick={() => {
                            setIsActive('Movies')
                        }
                        } to={'/movies'} className={`${style.navSettingsPc} ${style.activeNav} ${isActive == 'Movies' ? style.activeNavtrue : ""} `} >Movies</NavLink>


                        <NavLink onClick={() => {
                            setIsActive('TV')
                        }} to={'/tv_shows'} className={`${style.navSettingsPc} ${style.activeNav} ${isActive == 'TV' ? style.activeNavtrue : ""} `}>TV Shows</NavLink>
                        <NavLink onClick={() => {
                            setIsActive('Popular')
                        }} to={'/new&popular'} className={`${style.navSettingsPc} ${style.activeNav} ${isActive == 'Popular' ? style.activeNavtrue : ""} `} >New & Popular</NavLink>
                        <NavLink onClick={() => {
                            setIsActive('Browse')
                        }} to={'/browse'} className={`${style.navSettingsPc} ${style.activeNav} ${isActive == 'Browse' ? style.activeNavtrue : ""} flex gap-1 items-center`}>Browse<MdKeyboardArrowDown /></NavLink>

                    </div>

                    <button onClick={() => { setNavToggle(!navToggle) }} className={`${style.menuBtn}`} ><IoMenuOutline size={25} /></button>
                </div>
                {/* brake line for small screen*/}

                <div className={`${navToggle ? "scale-y-100 my-3" : "scale-y-0 "} w-full h-1 bg-gradient-to-r from-primary  to-secondary lg:hidden `}  ></div>

                {/* nav of the small devices */}
                <div className={`${style.navMobile} nav-container ${navToggle ? "scale-y-100" : "scale-y-0"} ${navToggle ? "max-h-60" : "max-h-0"}  flex lg:hidden overflow-hidden w-full duration-300 `}>
                    <NavLink onClick={() => {
                        setIsActive('Home')
                    }} to={'/'} className={`${style.navSettingsSmallDevices} ${style.activeNav} ${isActive == 'Home' ? style.activeNavtrue : ""} `}>Home</NavLink>

                    <NavLink onClick={() => {
                        setIsActive('Movies')
                    }
                    } to={'/movies'} className={`${style.navSettingsSmallDevices} ${style.activeNav} ${isActive == 'Movies' ? style.activeNavtrue : ""} `} >Movies</NavLink>


                    <NavLink onClick={() => {
                        setIsActive('TV')
                    }} to={'/tv_shows'} className={`${style.navSettingsSmallDevices} ${style.activeNav} ${isActive == 'TV' ? style.activeNavtrue : ""} `}>TV Shows</NavLink>
                    <NavLink onClick={() => {
                        setIsActive('Popular')
                    }} to={'/new&popular'} className={`${style.navSettingsSmallDevices} ${style.activeNav} ${isActive == 'Popular' ? style.activeNavtrue : ""} `} >New & Popular</NavLink>
                    <NavLink  onClick={() => {
                        setIsActive('Browse')
                    }} to={'/browse'} className={`${style.navSettingsSmallDevices} ${style.activeNav} ${isActive == 'Browse' ? style.activeNavtrue : ""} flex gap-1 items-center`}>Browse<MdKeyboardArrowDown /></NavLink>

                </div>
            </nav >
        </>
    )
}
