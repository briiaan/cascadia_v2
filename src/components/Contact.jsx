import '../styles/contact_component.scss'
import image from '../images/central-district-contact.webp?url'
export default function Contact() {
    return (
        <>
        <div id="contact-us-container">
            <div id='contact-container-div'>
			<div id='contact-container-flex'>
                <div id='text-box'>
                <p>Interested in a free consultation or just want to know an estimate for a project?</p>
                </div>
                <a href='/contact-us'>
                <div id='contact-us-button' className='noselect pointer'>
                    <p>Contact Us</p>
                    <div id='opacity-background'></div>
                    <img src={image}/>
                </div>
                </a>
            </div>
            </div>
            </div>
        </>
    )
}