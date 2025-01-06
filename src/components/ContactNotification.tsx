import {useState} from "react";
import { NotificationErrorCode } from "../utils/types"
import { notification_color } from "../utils/functions"

export default function ContactNotification(notice: NotificationErrorCode) {

    return (
        <>
        <div id="notification-container">
            <div id="notification-container-inner">
                <div id="notifiation-container-grid">
                    <p style={{'color':`${notification_color(notice)}`}}>{notice}</p>
                </div>
            </div>
        </div>
        </>
    )
}