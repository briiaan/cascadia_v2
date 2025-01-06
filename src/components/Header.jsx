import "../styles/default.scss";
import "../styles/header.scss" 
import logo from "../images/cascadia.png";
import {useState, useRef, useEffect} from "react";
import { useAnimate } from "framer-motion";

export default function Header({_email, isHomepage}) {
    const [scope, animate] = useAnimate();
    const [scope1, animate1] = useAnimate();
    const [scope2, animate2] = useAnimate();
    const [scope3, animate3] = useAnimate();
    const [scope4, animate4] = useAnimate();
    const about = useRef(null);
    const services = useRef(null);
    const projects = useRef(null);
    const contact = useRef(null);
    const menu_button = useRef(null); 
    const menu_items = useRef(null);
    const main_nav = useRef(null);
    const spacer = useRef(null);
    const mobile_items = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const svg = useRef(null);
    /*
    WHEN HEADER ELEMENT IS HOVERED IT SETS HOVERING TO TRUE.
    */
    useEffect(() => {
        about.current.addEventListener("mouseover", () => {
          animate("div", {
            height: 2, width: '100%'
          }, {duration: 0.65})
        })
        services.current.addEventListener("mouseover", () => {
          animate1("div", {
            height: 2, width: '100%'
          }, {duration: 0.65})
        })
        projects.current.addEventListener("mouseover", () => {
          animate2("div", {
            height: 2, width: '100%'
          }, {duration: 0.65})
        })
        contact.current.addEventListener("mouseover", () => {
          contact.current.style.animation = 'contact-hover 0.65s forwards'
        })
        svg.current.addEventListener("mousedown", () => {
          svg.current.style.animation = 'menuOpen 0.5s forwards'
        })
    }) 

    /*
    WHEN HEADER ELEMENT IS NOT HOVERED IT SETS HOVERING TO FALSE.
    */
    useEffect(() => {
        about.current.addEventListener("mouseout", () => {
          animate("div", {
            width: '0',
          }, {duration: 0.65})
        })
        services.current.addEventListener("mouseout", () => {
          animate1("div", {
            width: '0',
          }, {duration: 0.65})
        })
        projects.current.addEventListener("mouseout", () => {
          animate2("div", {
            width: '0',
          }, {duration: 0.65})
        })
        // CHANGE COLOR WITH VANILLA JAVASCRIPT WEB API
        contact.current.addEventListener("mouseout", () => {
          contact.current.style.animation = 'contact-hover-reverse 0.65s forwards'
        })
    }) 


    return(
      <>
        <header>
            <div id='main-nav' ref={main_nav} className={isHomepage ? 'transparent' : 'company_color'}>
                <a 
                id='cascadia' 
                href='/'>
                    <img 
                    src={logo.src}
                    width="265"
                    height="260"
                    type="image/png"
                    alt="Cascadia Custom Framing logo"
                    />
                </a>
                <div id='spacer3' ref={spacer}></div>
                <ul id='nav-menu'>
                    <li ref={scope}><p><a ref={about} href='/about-us' className="hover">Who We Are</a></p><div className='line-animation'></div></li>
                    <li ref={scope1}><p><a ref={services} href='/services' className="hover">Services</a></p><div className='line-animation'></div></li>
                    <li ref={scope2}><p><a ref={projects} href='/projects' className="hover">Projects</a></p><div className='line-animation'></div></li>
                    <li><a href="/contact-us"><p className="hover noselect" ref={contact}>Contact Us</p></a></li>
                </ul>
            </div>
            <div id='line-container'></div>
            <div id='mobile-nav'>
                <a id='cascadia' href='/'>
                    <img src={logo.src}
                    width="150"
                    height="150"
                    type="image/png"
                    alt="Cascadia Custom Framing logo"
                    style={{display: "inline", position: 'relative', top: '-45px', left: '-8px'}}
                    />
                </a>
                <div id='svg-icon-container' ref={svg}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>
</div>
                <ul id='mobile-nav-menu' ref={mobile_items}>
                <li><p><a href='/about-us.html' className="hover">About Us</a></p></li>
                    <li><p><a href='/services.html' className="hover">Services</a></p></li>
                    <li><p><a href='/projects.html' className="hover">Projects</a></p></li>
                    <li><p><a href='/contact-us.html' className="hover">Contact Us</a></p></li>
                </ul>
                <div id="menu-button-container" ref={menu_button}>
        <svg width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#" stroke="#"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-right-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Icon-Set-Filled" transform="translate(-310.000000, -1089.000000)" fill="#FFFF"> <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z" id="arrow-right-circle"> </path> </g> </g> </g></svg>
      </div>
                </div>
        </header>
        </>
    )
}