export const timeSince = (date) => {
    const createdDate = new Date(date);
    const now = new Date();
    const diffMs = now - createdDate;
  
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    let timeSincePost;
    if (diffDays > 0) {
      timeSincePost = diffDays + " dan";
    } else if (diffHours > 0) {
      timeSincePost = diffHours + " sat";
    } else if (diffMinutes > 0) {
      timeSincePost = diffMinutes + " min";
    } else {
      timeSincePost = "sada";
    }
  
    return timeSincePost;
  };