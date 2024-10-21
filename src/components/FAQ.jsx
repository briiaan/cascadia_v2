import { useEffect, useRef, useState } from 'react';
import '../styles/frequently_asked_questions.scss'
import {FAQ_MAP, QUESTION, ANSWER} from '../utils/FAQ'

export default function FAQ() {
    const SEVEN = 7;
    const list = Array(SEVEN).fill(null);
    // REFS
    const refs = list.map(x => useRef(null));
    const refsMap = new Map()
    refs.forEach((e,index)=> refsMap.set(index, e))
    // SVG REFS
    const svgRefs = list.map(x => useRef(null));
    const svg = new Map()
    svgRefs.forEach((e,index)=> svg.set(index, e))
    // SAVE CURRENT CLIENTHEIGHT OF ALL SEVEN FAQ
    const [isOpen, setIsOpen] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        last: null,
    })
 
    const faq_button = (event) => {
        event.preventDefault();
        const index = eval(event.currentTarget.id[1]);
        const element = refsMap.get(index).current;
        const closedHeight = element.firstChild.clientHeight;
        const openHeight = closedHeight + element.lastChild.clientHeight;
        let id = null;
        isOpen[index] ? close(index, id, element, closedHeight, openHeight) : open(index, id, element, closedHeight, openHeight)
    }

    const open = (index, id, element, closedHeight, openHeight) => {
        // NEEDS TO OPEN AND CLOSE WITH THIS FUNCTION
        let deg = 0;
        let height = closedHeight;
        const maxheight = element.firstChild.clientHeight + element.lastChild.clientHeight;
        clearInterval(id);
        id = setInterval(openAnimate, 2.5);
        function openAnimate() {
            if(!isOpen[index]) {
                if (height >= maxheight) {
                    svgRefs[index].current.style.rotate = 180 + 'deg';
                    clearInterval(id)
                    setIsOpen({...isOpen, [index]: true, last: index})
                    element.lastChild.style.position = 'relative';
                    element.style.height = 'fit-content'
                } else {
                    height += 2;
                    element.style.height = height + 'px';
                    if(deg < 180) {
                        deg += 6;
                        svgRefs[index].current.style.rotate = deg + 'deg';
                    }
                }
            }
        }
        // ANSWER WILL FADE IN
    }

    const close = (index, id, element, closedHeight, openHeight) => { 
        clearInterval(id);
        id = setInterval(closeAnimate, 2.5);
        let height  = openHeight;
        element.style.height = openHeight;
        let deg = 180;
        function closeAnimate() {
            if(height <= closedHeight) {
                clearInterval(id)
                setIsOpen({...isOpen, [index]: false, last: index})
            } else {
                height -= 2;
                element.style.height = height + 'px';
                if (deg > 0) {
                    deg -= 30;
                    svgRefs[index].current.style.rotate = deg + 'deg';
                }
            }
        }
    }
    
    return (
       <>
       <div id='FAQ-container-main-grid' className='noselect'>
        <div id='FAQ-container-main'>
            <div id="FAQ-container">
                 <p id='FAQ-title'>FREQUENTLY ASKED QUESTIONS</p>
                <div className='divider'></div>
                {[0,1,2,3,4,5,6].map((x) => 
                <span key={x}>
                <div onClick={e => faq_button(e)} className='faq-grid-container' id={'q' + x} ref={refs[x]} style={{zIndex: x+1, background: 'white'}}>
                    <div className='FAQcontainer'>
                        <div>
                <p className='FAQ-question pointer'>{FAQ_MAP.get(x)[QUESTION]}</p>
                </div>
                <div className='arrow-grid-container'>
                <svg id={'arrow' + x} ref={svgRefs[x]} width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z" fill="#000000"></path> </g></svg>
                </div>
                </div>
                <p className='FAQ-answer' style={{display: 'block', position: 'absolute', zIndex: x}}>{FAQ_MAP.get(x)[ANSWER]}</p>
                </div>
                <div className='divider'></div>
                </span>
                )}
              </div>
            </div>
        </div>
       </> 
    )
}