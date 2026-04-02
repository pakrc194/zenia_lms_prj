import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";

const useWebSocket = ({ roomId, onMessageReceived }) => {

    const stompClient = useRef(null);

    const connect = useCallback(() => {
        const client = new Client({
            // ✅ SockJS 대신 brokerURL 직접 사용
            brokerURL: 'ws://localhost:8080/ws/websocket',

            onConnect: () => {
                console.log('WebSocket 연결 성공');
                    
                client.subscribe(`/topic/chat/${roomId}`, (message) => {
                    const body = JSON.parse(message.body);
                    onMessageReceived(body);
                });
            },

            onStompError: (frame) => {
                console.error('WebSocket 에러:', frame);
            },

            onDisconnect: () => {
                console.log('WebSocket 연결 해제');
            },

            reconnectDelay: 3000,
        });

        client.activate();
        stompClient.current = client;
    }, [roomId, onMessageReceived]);

    const sendMessage = useCallback((messageData) => {
        if (stompClient.current?.connected) {
            stompClient.current.publish({
                destination: '/app/chat',
                body: JSON.stringify(messageData),
            });
        }
    }, []);

    const disconnect = useCallback(() => {
        stompClient.current?.deactivate();
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    return { sendMessage };
};

export default useWebSocket;