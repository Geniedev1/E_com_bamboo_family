import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import RequestService from "../../utils/request-service";
import { CHAT_MESSAGES, WEBSOCKET_URL } from "../../constants/urlConstants";
import { ChatMessageResponse } from "../../types/types";
import { getChatToken } from "../../utils/chatToken";
import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";

const ChatWidget: FC = (): ReactElement => {
    const user = useSelector(selectUserFromUserState);
    const [open, setOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
    const [input, setInput] = useState<string>("");
    const [unread, setUnread] = useState<number>(0);
    const tokenRef = useRef<string>(getChatToken());
    const openRef = useRef<boolean>(open);
    const bottomRef = useRef<HTMLDivElement>(null);
    openRef.current = open;

    const appendUnique = (msg: ChatMessageResponse): void =>
        setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));

    // Kết nối STOMP một lần, nghe tin của hội thoại này.
    useEffect(() => {
        const token = tokenRef.current;
        const client: CompatClient = Stomp.over(() => new SockJS(WEBSOCKET_URL));
        client.reconnectDelay = 3000;
        client.debug = () => {};
        client.connect({}, () => {
            client.subscribe("/topic/chat/" + token, (frame: any) => {
                const msg: ChatMessageResponse = JSON.parse(frame.body);
                appendUnique(msg);
                if (msg.sender === "ADMIN" && !openRef.current) {
                    setUnread((u) => u + 1);
                }
            });
        });
        return () => {
            try {
                client.disconnect();
            } catch (e) {
                /* ignore */
            }
        };
    }, []);

    // Mở panel -> tải lịch sử + xoá đếm chưa đọc.
    useEffect(() => {
        if (open) {
            setUnread(0);
            RequestService.get(`${CHAT_MESSAGES}?token=${tokenRef.current}`, false)
                .then((response) => setMessages(response.data))
                .catch(() => undefined);
        }
    }, [open]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    const send = (): void => {
        const content = input.trim();
        if (!content) return;
        setInput("");
        const name = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : undefined;
        RequestService.post(CHAT_MESSAGES, { token: tokenRef.current, name, email: user?.email, content }, false)
            .then((response) => appendUnique(response.data))
            .catch(() => undefined);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault();
            send();
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {open && (
                <div className="mb-3 flex h-[460px] w-[340px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_24px_60px_-24px_rgba(23,49,36,0.6)]">
                    <div className="flex items-center justify-between bg-primary px-4 py-3 text-on-primary">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[22px]">forum</span>
                            <div className="leading-tight">
                                <p className="font-label-sm text-[14px]">Hỗ trợ Rattanovi</p>
                                <p className="font-body-md text-[11px] opacity-80">Thường trả lời trong ít phút</p>
                            </div>
                        </div>
                        <button type="button" onClick={() => setOpen(false)} aria-label="Đóng" className="text-on-primary/90 hover:text-on-primary">
                            <span className="material-symbols-outlined text-[22px]">close</span>
                        </button>
                    </div>

                    <div className="flex-1 space-y-2 overflow-y-auto bg-surface px-3 py-3">
                        {messages.length === 0 ? (
                            <p className="mt-6 text-center font-body-md text-[13px] text-on-surface-variant">
                                Chào bạn 👋 Cần tư vấn sản phẩm mây tre? Nhắn cho shop nhé!
                            </p>
                        ) : (
                            messages.map((m) => (
                                <div key={m.id} className={`flex ${m.sender === "CUSTOMER" ? "justify-end" : "justify-start"}`}>
                                    <span
                                        className={`max-w-[78%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 font-body-md text-[13px] ${
                                            m.sender === "CUSTOMER"
                                                ? "bg-primary text-on-primary"
                                                : "bg-surface-container text-on-surface"
                                        }`}
                                    >
                                        {m.content}
                                    </span>
                                </div>
                            ))
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="flex items-center gap-2 border-t border-outline-variant/50 bg-surface-container-lowest p-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="Nhập tin nhắn..."
                            className="h-10 flex-1 rounded-full bg-surface-container-low px-4 font-body-md text-[14px] text-on-surface outline-none placeholder:text-on-surface-variant"
                        />
                        <button
                            type="button"
                            onClick={send}
                            aria-label="Gửi"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition hover:bg-primary-container"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Chat với shop"
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_16px_36px_-14px_rgba(23,49,36,0.8)] transition hover:bg-primary-container"
            >
                <span className="material-symbols-outlined text-[26px]">{open ? "close" : "chat"}</span>
                {!open && unread > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1 font-label-sm text-[11px] text-white">
                        {unread}
                    </span>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
