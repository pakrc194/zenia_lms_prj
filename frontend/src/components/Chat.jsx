import React from 'react'

// src/components/ChatRoom.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import useWebSocket from '../hooks/useWebSocket';

const Chat = ({ roomId, currentUser }) => {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    // 메시지 수신 콜백
    const onMessageReceived = useCallback((message) => {
        setMessages((prev) => [...prev, message]);
    }, []);

    // WebSocket 연결
    const { sendMessage } = useWebSocket({ roomId, onMessageReceived });

    // 메시지 전송
    const handleSend = () => {
        if (!inputValue.trim()) return;

        sendMessage({
            roomId,
            sender: currentUser,
            content: inputValue,
        });

        setInputValue('');
    };

    // 엔터키 전송
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // 새 메시지 오면 스크롤 아래로
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>

            {/* 메시지 목록 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        message={msg}
                        isMine={msg.sender === currentUser}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* 입력창 */}
            <div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요..."
                    style={{ flex: 1, padding: '8px' }}
                />
                <button onClick={handleSend}>전송</button>
            </div>
        </div>
    );
};

// 말풍선 컴포넌트
const MessageBubble = ({ message, isMine }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: isMine ? 'flex-end' : 'flex-start',
            marginBottom: '8px',
        }}>
            {!isMine && (
                <span style={{ fontSize: '12px', marginRight: '8px' }}>
                    {message.sender}
                </span>
            )}
            <div style={{
                backgroundColor: isMine ? '#007bff' : '#e9ecef',
                color: isMine ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: '16px',
                maxWidth: '70%',
            }}>
                <p style={{ margin: 0 }}>{message.content}</p>
                <span style={{ fontSize: '10px', opacity: 0.7 }}>
                    {new Date(message.sentAt).toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
};

export default Chat;