import {useState} from "react";
import type { FormEvent } from "react";
import "../styles/form.scss"


export default function Form() {
    const [responseMessage, setResponseMessage] = useState("");
    
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        try {
        const response = await fetch("/src/api/feedback.ts", {
            method: "POST",
            body: formData,
        })
        const data = await response.json();
    if(data.notice) {
        setResponseMessage(data.notice)
    }
} catch(err) {
    console.log(err)
}
    }

    return (
        <form onSubmit={submit} id="form-container">
                        <div id="first-name-container">
                            <input type="text" name="firstname" placeholder="First Name" required/>
                        </div>
                        <div id="last-name-container">
                            <input type="text" name="lastname" placeholder="Last Name"/>
                        </div>
                        <div id="email-container">
                            <input type="text" name="email" placeholder="Email" required/>
                        </div>
                        <div id="message-container">
                            <textarea name="message" placeholder="Message" required />
                        </div>
                        <div id="submit-container">
                        <button>Submit</button>
                        </div>
                        {responseMessage && <p>{responseMessage}</p>}
                    </form>
    )
}