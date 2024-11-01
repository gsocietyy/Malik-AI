document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const dateTime = document.getElementById('date-time');
    let userName = null;  // Variable to store the user's name

    // Set current date and time at the top
    const now = new Date();
    dateTime.textContent = now.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });

    // Initial bot message
    setTimeout(() => {
        addBotMessage(`Thank you for reaching out to Malik AI Bot. How can I assist you today? 😊`);
    }, 1000);

    // Define bot responses for specific keywords and intents
    const botResponses = {
        "help": [
            "I'm here to help! Could you please specify what you need assistance with?",
            "Sure, I can help with that. What do you need help with?",
            "Absolutely! Let me know what you're looking for assistance with."
        ],
        "badwords": [
            "Go tell your stupid mother and father bitch"
        ],
        "mambo": [
            "Poa sana, uko aje."
        ],
        "rada": [
            "Rada safi, nichapie."
        ],
        "poa": [
            "Hio ni poa, nikusaidie aje leo?."
        ],
        "fiti": [
            "Hio ni fiti, nikusaidie aje leo?."
        ],
        "uko aje": [
            "Mimi niko fiti, je wewe?."
        ],
        "who is your developer": [
            "Malik❤️😊."
        ],
        "your developer": [
            "Malik❤️😊."
        ],
        "support": [
            "Our support team is available 24/7. Let me know how I can assist you further.",
            "Support is what I'm here for! Feel free to ask me anything.",
            "You can rely on our support any time. Just let me know how I can help."
        ],
        "thanks": [
            "You're very welcome! Feel free to ask if you have more questions.",
            "My pleasure! I'm here if you need anything else.",
            "Glad to help! Let me know if there’s anything else you need."
        ],
        "contact": [
            "You can reach us at support@example.com or call us at 1-800-555-1234.",
            "Feel free to contact our support at support@example.com or 1-800-555-1234.",
            "For further assistance, reach out to us at support@example.com or give us a call."
        ],
        "greeting": [ 
            "Hi, how can I assist you today?",
            "Hello! How can I assist you today?",
            "Hey there! How can I assist you today?"
        ],
        "default": [
            "I'm here to assist! Could you please provide more information?",
            "I’m not sure I understood. Could you clarify a bit?",
            "I’d love to help! Could you tell me more about what you’re looking for?"
        ]
    };

    function addBotMessage(text) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';

        // Bot icon
        const botIcon = document.createElement('div');
        botIcon.className = 'bot-icon';
        botIcon.innerHTML = `<img src="img/User.png" alt="Bot Icon">`;

        // Message content
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const botName = document.createElement('div');
        botName.className = 'bot-name';
        botName.textContent = 'Malik AI Bot';

        const message = document.createElement('div');
        message.className = 'message received';
        message.textContent = text;

        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        messageContent.appendChild(botName);
        messageContent.appendChild(message);
        messageContent.appendChild(timestamp);

        messageContainer.appendChild(botIcon);
        messageContainer.appendChild(messageContent);

        chatMessages.appendChild(messageContainer);
        scrollToBottom();
    }

    function addUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'message sent';
        message.textContent = text;

        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const container = document.createElement('div');
        container.appendChild(message);
        container.appendChild(timestamp);
        container.style.alignSelf = 'flex-end';

        chatMessages.appendChild(container);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.textContent = 'Malik AI Bot is typing...';
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();

        return typingIndicator;
    }

    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();

        // Check for greetings
        if (userMessage.includes("hi") || userMessage.includes("hey") || userMessage.includes("hello")) {
            const greetingsResponses = botResponses["greeting"];
            return greetingsResponses[Math.floor(Math.random() * greetingsResponses.length)];
        }

        if (userMessage.includes("fool") || userMessage.includes("umbwa") || userMessage.includes("fuck you")) {
            const greetingsResponses = botResponses["badwords"];
            return greetingsResponses[Math.floor(Math.random() * greetingsResponses.length)];
        }

        // Check if the user provided their name
        const nameMatch = userMessage.match(/my name is (\w+)|i am (\w+)|i'm (\w+)|im (\w+)/);
        if (nameMatch) {
            userName = nameMatch[1] || nameMatch[2] || nameMatch[3] || nameMatch[4];
            return `Nice to meet you, ${userName}! How can I assist you today?`;
        }

        // Check for other keywords in the message
        for (const keyword in botResponses) {
            if (userMessage.includes(keyword)) {
                const responses = botResponses[keyword];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Default response if no keywords match
        const defaultResponses = botResponses["default"];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    function handleSendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addUserMessage(message);
            messageInput.value = '';

            // Show typing indicator before bot response
            const typingIndicator = showTypingIndicator();

            // Simulate bot response after a delay
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                const response = getBotResponse(message);
                addBotMessage(response);
            }, 1000);
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
});
