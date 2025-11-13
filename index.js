    let chatTextInput = document.getElementById("chat-text-input");
    let chatMessages = document.getElementById("chat-messages");
    let chatMessage = document.getElementsByClassName("chat_Message");
    let username = "Username";
    let separator = "•";
    let chatHistory = [];

    function sendMessage(textContent = "Hello, world!", pfp = "pfp.png", authorUsername = "Username", date = getDate()) {
        let messageObject = {
            author: authorUsername,
            dateSent: date,
            text: textContent
        }
        chatMessages.innerHTML += `
        <div class="chat_Message">
            <img src="pfp.png" alt="Profile Picture of ${authorUsername}" class="chat_Message_Author_PFP">
            <div class="chat_Message_Info">
                <span class="chat_Message_Author">${authorUsername}</span>
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

    function handleTextInputFormattingFunctions(text) {
        let mathFuncRegex = /[^\\]math\(([^ä])\)/i;
        let italicRegex = /[^\\]italic\(()\)/i;
        let boldRegex = /[^\\]bold\(()\)/i;


        text.replace(mathFuncRegex, (match, p1) => {
            return Math.eval(p1).toString();
        })

        text.replace(italicRegex, (match, p1) => {
            return "<i>${p1}</i>";
        });

        return text;
    }

    chatTextInput.addEventListener("keydown", (e) => {
        if (e.shiftKey && e.key === "Enter") {
            chatTextInput.innerHTML += "<br>";
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (chatTextInput.textContent !== "") sendMessage(handleTextInputFormattingFunctions(chatTextInput.textContent), "pfp.png", username, getDate());
            chatTextInput.textContent = "";
        }
    });

