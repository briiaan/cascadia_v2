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
    const mobile_nav_menu = useRef(null);
    const mobile_nav_menu_one = useRef(null)
    const [isOpen, setOpen] = useState(false);
    const svg = useRef(null); 
    const svg_itself_lol = useRef(null);
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
    }, []) 

    useEffect(() => {


      
      const handleToggle = () => {
          console.log(isOpen);

          // Reset animations first
          mobile_nav_menu.current.style.animation = "none";
          mobile_items.current.style.animation = "none";

          // Force reflow (restart animations)
          mobile_nav_menu.current.offsetHeight;
          mobile_items.current.offsetHeight;

          // Apply new animations
          requestAnimationFrame(() => {
              if (!isOpen) {
                  mobile_nav_menu.current.style.animation = "menuOpen 0.55s forwards";
                  mobile_items.current.style.animation = "menuShow 0.5s forwards";

                  svg_itself_lol.current.classList.remove("rotateUp");
                  svg_itself_lol.current.classList.add("rotateDown");
              } else {
                  mobile_nav_menu.current.style.animation = "menuClose 0.55s forwards";
                  mobile_items.current.style.animation = "menuHide 0.5s forwards";
                  svg_itself_lol.current.classList.remove("rotateDown");
                  svg_itself_lol.current.classList.add("rotateUp");
              }

              setOpen(prev => !prev);
          });
      };

      if (svg.current) {
          svg.current.addEventListener("mousedown", handleToggle);
      }

      return () => {
          if (svg.current) {
              svg.current.removeEventListener("mousedown", handleToggle);
          }
      };
  }, [isOpen]); //

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
                    <li><p className="hover noselect" ref={contact}><a href="/contact-us">Contact Us</a></p></li>
                </ul>
            </div>
            <div id='line-container'></div>
            <div id="mobile-nav-2" ref={mobile_nav_menu}>
            <ul id='mobile-nav-menu' ref={mobile_items}>
                <li><p><a href='/about-us.html' className="hover">About Us</a></p></li>
                    <li><p><a href='/services.html' className="hover">Services</a></p></li>
                    <li><p><a href='/projects.html' className="hover">Projects</a></p></li>
                    <li><p><a href='/contact-us.html' className="hover">Contact Us</a></p></li>
                </ul>
            </div>
            <div id='mobile-nav' ref={mobile_nav_menu_one}>
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
                <svg ref={svg_itself_lol} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>
</div>
                </div>
        </header>
        </>
    )
}