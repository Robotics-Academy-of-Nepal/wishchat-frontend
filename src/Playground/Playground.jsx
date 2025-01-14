import styles from './playground.module.css';
import goodwishLogo from '../assets/wishchat-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';


function Playground(){

    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [activePrompt, setActivePrompt] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const chatContainerRef = useRef(null);


    const pic = localStorage.getItem("Picture")


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handlePromptChange = (e) => {
        setSystemPrompt(e.target.value);
        setShowWarning(true);
    };

    const handleApplyChanges = async() => {
        setActivePrompt(systemPrompt);
        setShowWarning(false);

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await fetch('https://wishchat.goodwish.com.np/api/apply-changes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ 
                    prompt: systemPrompt,
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                text: "Sorry, I couldn't process your request.",
                isUser: false,
                timestamp: new Date()
            }]);
        }
        


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        // Add user message
        setMessages(prev => [...prev, {
            text: inputText,
            isUser: true,
            timestamp: new Date()
        }]);

        const currentInput = inputText;
        setInputText('');

        try {
            const response = await fetch('https://wishchat.goodwish.com.np/api/query/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ 
                    query: currentInput,
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            
            setMessages(prev => [...prev, {
                text: data.response,
                isUser: false,
                timestamp: new Date()
            }]);

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                text: "Sorry, I couldn't process your request.",
                isUser: false,
                timestamp: new Date()
            }]);
        }
    };

    const handleClearChat = () => {
        setMessages([]);
    };

    return(
        <>
        <img className={styles.logo} src={goodwishLogo} alt="Logo image" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
        <div>
        <nav className={styles.navigation}>
            <ul>
                <li className={styles.headers} onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                    Chatbot
                </li>
                <li className={styles.headers} onClick={() => navigate('/playground')} style={{ cursor: 'pointer' }}>
                    Playground
                </li>
                <li className={styles.headers} onClick={() => navigate('/deploy')} style={{ cursor: 'pointer' }}>
                    Deploy
                </li>
                <li className={styles.headers} onClick={() => navigate('/upload')} style={{ cursor: 'pointer' }}>
                    Build
                </li>
            </ul>
        </nav>
        <img className={styles.profile} src={pic} alt="Logo image" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
        </div>

        <div className={styles.clearChatContainer}>
            <button 
                className={styles.clearButton} 
                onClick={handleClearChat}
                title="Clear chat"
            >
                🧹
            </button>
        </div>
        
        <div className={styles.playgroundContainer}>
            
            <div className={styles.messagesContainer} ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={msg.isUser ? styles.userMessage : styles.botMessage}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder='Type your message here....'
                    className={styles.messageInput}
                />
                <button type='submit' className={styles.sendButton}>
                    Send
                </button>
            </form>
        </div>
        <div className={styles.sliderContainer}>
                <h3 className={styles.promptTitle}>System Prompt</h3>
                <textarea
                    className={styles.promptInput}
                    value={systemPrompt}
                    onChange={handlePromptChange}
                    placeholder="Enter system prompt..."
                />
                <button 
                    className={styles.applyButton}
                    onClick={handleApplyChanges}
                >
                    Apply Changes
                </button>
                {showWarning && (
                    <div className={styles.warningAlert}>
                        Please click "Apply Changes" for the new prompt to take effect
                    </div>
                )}
            </div>
        </>
    );
}

export default Playground;