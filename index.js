document.addEventListener("DOMContentLoaded", function () {
    let chatTextInput = document.getElementById("chat-text-input");
    let chatMessages = document.getElementById("chat-messages");
    let chatMessage = document.getElementsByClassName("chat_Message");
    let username = "Username";
    let separator = "•";
    let chatHistory = [];

    function sendMessage(textContent) {
        let messageObject = {
            author: username,
            dateSent: getDate(),
            text: textContent
        }
        chatMessages.innerHTML += `
        <div class="chat_Message">
            <img src="f514cefad0334d413f09f9a2eb468db7.png" alt="Profile Picture of ${username}" class="chat_Message_Author_PFP">
            <div class="chat_Message_Info">
                <span class="chat_Message_Author">${username}</span>
                <span class="chat_Message_Author_Date_Separator">${separator}</span>
                <span class="chat_Message_DateSent">${messageObject.dateSent}</span>
            </div>
            <div class="chat_Message_TextContent">${textContent}</div>
        </div>
        `;
        chatHistory.push(messageObject);
    }
    
    function getDate() {
        let date = new Date(Date.now());
        let seconds, minutes, hours;
        if (date.getSeconds() < 10) {
            seconds = "0" + date.getSeconds();
        } else {
            seconds = date.getSeconds();
        }
        if (date.getMinutes() < 10) {
            minutes = "0" + date.getMinutes();
        } else {
            minutes = date.getMinutes();
        }
        if (date.getHours() < 10) {
            hours = "0" + date.getHours();
        } else {
            hours = date.getHours();
        }
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${hours}:${minutes}:${seconds}`;
    }

    chatTextInput.addEventListener("keydown", (e) => {
        if (e.shiftKey && e.key === "Enter") {
            chatTextInput.innerHTML += "<br>";
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (chatTextInput.textContent !== "") sendMessage(chatTextInput.textContent);
            chatTextInput.textContent = "";
        }
    });
});

