import '../styles/information_container_2.scss'

export default function InformationContainer2() {
    return (
        <>
       <div id='information-container-element'>
        <div id='information-container-2-box'>
        <div id='information-container-2'> 
            <div id='box-1-flex'>
            <div className='box' id='box-1'>
                <p className='bold'>WHY CHOOSE US?</p>
                <ul className='text'>
                    <li>Experienced progessionals with expertise in framing</li>
                    <li>Prompt project completion without comprimising quality</li>
                    <li>Competitive pricing and transparent estimates</li>
                </ul>
            </div>
            </div>
            <div id='box-2-flex'>
                <div className='box' id='box-2'>
                <p className='bold'>RESIDENTIAL CONSTRUCTION AND CUSTOM FRAMING</p>
                <p className='text'>We offer custom framing solutions to cater to specific architectural designs, ensuring precise execution and attention to detail.</p>
                </div>
            </div>
		</div>
        </div>
        </div>
        </>
    )
}