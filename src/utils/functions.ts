import { NotificationErrorCode } from "./types";
import { red, green, entityMap } from "./constants"

export const notification_color = (notice: NotificationErrorCode): string => {
    if (notice == NotificationErrorCode.Error) return red;
    if (notice == NotificationErrorCode.Missing) return red;
    if (notice == NotificationErrorCode.Success) return green;
};
  
export const escapeHtml = (string: any): string => {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
}