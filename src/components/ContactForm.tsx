import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import "../styles/form.scss";

export default function ContactForm() {
    const [responseMessage, setResponseMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [prevPhoneNumberLength, setPrevPhoneNumberLength] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const responseContainer = useRef<HTMLDivElement>(null);
    const responseMessageRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(
                inputRef.current.value.length, 
                inputRef.current.value.length
            );
        }
    }, []);

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevents clicking to move cursor
        inputRef.current?.focus(); // Ensures input remains focused
    };

    const handleKeyDown = () => {
        setTimeout(() => {
            const input = inputRef.current;
            if (input) {
                input.setSelectionRange(input.value.length, input.value.length); // Forces cursor to stay at the end
            }
        }, 0);
    };

    const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let len = value.length;
        
        if (len > prevPhoneNumberLength) {
            if (len === 1) {
                setPhoneNumber("(" + value);
                setPrevPhoneNumberLength(value.length + 1);
            } else if (len === 4) {
                setPhoneNumber(value + ")");
                setPrevPhoneNumberLength((value + ")").length);
            } else if (len === 5) {
                let butLastElement = value.slice(0, value.length - 1);
                let lastEl = value[value.length - 1];
                setPhoneNumber(butLastElement + ") " + lastEl);
                setPrevPhoneNumberLength((butLastElement + ") " + lastEl).length);
            } else if (len === 6) {
                let butLastElement = value.slice(0, value.length - 1);
                let lastEl = value[value.length - 1];
                setPhoneNumber(butLastElement + " " + lastEl);
                setPrevPhoneNumberLength((butLastElement + " " + lastEl).length);
            } else if (len === 10) {
                let butLastElement = value.slice(0, value.length - 1);
                let lastEl = value[value.length - 1];
                setPhoneNumber(butLastElement + " " + lastEl);
                setPrevPhoneNumberLength((butLastElement + " " + lastEl).length);
            } else if (len === 15) {
                setPhoneNumber(phoneNumber);
            } else {
                setPhoneNumber(value);
                setPrevPhoneNumberLength(len);
            }
        } else if (len <= prevPhoneNumberLength) {
            setPhoneNumber(value);
            setPrevPhoneNumberLength(len);
        }
    };

    // Function to clear all form fields
    const clearForm = () => {
        if (formRef.current) {
            formRef.current.reset();
            setPhoneNumber("");
            setPrevPhoneNumberLength(0);
        }
    };

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data.notice);

            if (data.success) {
                setResponseMessage(data.notice);
                if (responseContainer.current) {
                    responseContainer.current.style.visibility = "visible";
                    responseContainer.current.style.borderColor = "rgb(90, 173, 118)";
                }
                
                // Clear all form fields after successful submission
                clearForm();
                
                // Auto-hide the response message after 5 seconds
                setTimeout(() => {
                    if (responseContainer.current) {
                        responseContainer.current.style.visibility = "hidden";
                    }
                }, 5000);
            } else {
                setResponseMessage(data.notice || "An error occurred. Please try again.");
                if (responseContainer.current) {
                    responseContainer.current.style.visibility = "visible";
                    responseContainer.current.style.borderColor = "#dc3545";
                }
            }
        } catch(err) {
            console.log(err);
            setResponseMessage("Failed to submit. Please check your connection and try again.");
            if (responseContainer.current) {
                responseContainer.current.style.visibility = "visible";
                responseContainer.current.style.borderColor = "#dc3545";
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form ref={formRef} onSubmit={submit} id="form-container">
            <div id="first-name-container">
                <input type="text" name="name" placeholder="Full Name" required />
            </div>
            <div id="email-container">
                <input type="email" name="email" placeholder="Email" required />
            </div>
            <div id="phone-number-container">
                <input 
                    ref={inputRef} 
                    onMouseDown={handleMouseDown} 
                    onKeyDown={handleKeyDown} 
                    value={phoneNumber} 
                    onChange={onPhoneNumberChange}
                    type="tel" 
                    name="phone" 
                    placeholder="Phone" 
                    required 
                />
            </div>
            <div id="message-container">
                <textarea name="message" placeholder="Message" required />
            </div>
            <div id="submit-container">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
            <div id="response-container" ref={responseContainer} style={{ visibility: "hidden" }}>
                <p ref={responseMessageRef}>{responseMessage}</p>
            </div>
        </form>
    );
}