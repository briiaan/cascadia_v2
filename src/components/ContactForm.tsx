import {useState, useRef, useEffect} from "react";
import type { FormEvent } from "react";
import "../styles/form.scss"

export default function Form() {
    const [responseMessage, setResponseMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [prevPhoneNumberLength, setPrevPhoneNumberLength] = useState(0);

    const inputRef = useRef(null);
    const responseContainer = useRef(null);
    const responseMessageRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    });

    const handleMouseDown = (event) => {
        event.preventDefault(); // Prevents clicking to move cursor
        inputRef.current.focus(); // Ensures input remains focused
    };

    const handleKeyDown = () => {
        setTimeout(() => {
            const input = inputRef.current;
            input.setSelectionRange(input.value.length, input.value.length); // Forces cursor to stay at the end
        }, 0);
    };

    const onPhoneNumberChange = (e) => {
        let value = e.target.value;
        let len = value.length
        if(len > prevPhoneNumberLength) {
            if (len == 1) {
                setPhoneNumber("(" + value);
                setPrevPhoneNumberLength(value.length + 1)
            } else if (len == 4) {
                setPhoneNumber(value + ")")
                setPrevPhoneNumberLength((value + ")").length);
            } else if (len == 5) {
                let butLastElement = value.slice(0, value.length - 1);
                let lastEl = value[value.length - 1];
                setPhoneNumber(butLastElement + ") " + lastEl);
                setPrevPhoneNumberLength((butLastElement + ") " + lastEl).length)
            }
            else if (len == 6) {
                let butLastElement = value.slice(0, value.length - 1);
                let lastEl = value[value.length - 1];
                setPhoneNumber(butLastElement + " " + lastEl);
                setPrevPhoneNumberLength((butLastElement + " " + lastEl).length)
            } else if ( len == 10 ) {
                let butLastElement = value.slice(0, value.length - 1);
                let lastEl = value[value.length - 1];
                setPhoneNumber(butLastElement + " " + lastEl); 
                setPrevPhoneNumberLength((butLastElement + " " + lastEl).length)
            } else if (len == 15) {
                setPhoneNumber(phoneNumber);
            } else {
                setPhoneNumber(value)
                setPrevPhoneNumberLength(len)
            }
        } else if (len <= prevPhoneNumberLength) {
                setPhoneNumber(value)
                setPrevPhoneNumberLength(len)
        }
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
        const response = await fetch("/api/feedback", {
            method: "POST",
            body: formData,
        })

        const data = await response.json();
        console.log(data.notice)


    if(data.success) {
        console.log("test")
        setResponseMessage(data.notice)
        responseContainer.current.style.visibility = "visible";
    }
} catch(err) {
    console.log(err)
}
    }

    return (
        <form onSubmit={submit} id="form-container">
                        <div id="first-name-container">
                            <input type="text" name="name" placeholder="Full Name" required/>
                        </div>
                        <div id="email-container">
                            <input type="text" name="email" placeholder="Email" required/>
                        </div>
                        <div id="phone-number-container">
                            <input ref={inputRef} onMouseDown={handleMouseDown} onKeyDown={handleKeyDown} value={phoneNumber} onChange={onPhoneNumberChange}type="tel" name="phone" placeholder="Phone" required/>
                        </div>
                        <div id="message-container">
                            <textarea name="message" placeholder="Message" required />
                        </div>
                        <div id="submit-container">
                        <button>Submit</button>
                        </div>
                        <div id="response-container" ref={responseContainer}>
                            {<p ref={responseMessageRef}>{responseMessage}</p>}
                        </div>
                    </form>
    )
}