import { useEffect, useRef } from 'react';
import stairs from '../images/staircase.jpg?url'
import {useAnimate, useInView } from "framer-motion";
import "../styles/information_container.scss"

export default function InformationContainer() {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope, {once: true, amount: 0.2});

    useEffect(()=> {
        if(isInView) {
            animate(scope.current, {opacity: 1}, {duration: 1.5})
        }
    }, [isInView])

    return (
        <>
        <div id='information-container-1' ref={scope}>
			<div id="information-padding-container">
			<p>LET US BUILD YOUR DREAM HOME</p>
			<p>We offer a variety of services including Wood Framing, Wall Framing, Roof Framing, Custom Framing, 
				and have incredible expertise in Remodeling, New Additions, and Construction.</p>
			</div>
			<div id="image-container">
			<div id="image-container-flex">
				<img src={stairs} alt="Image of stairs"/>
			</div>
		</div>
		</div>
        </>
    )
}