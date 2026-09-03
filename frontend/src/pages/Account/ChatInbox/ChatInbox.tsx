import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import RequestService from "../../../utils/request-service";
import { ADMIN_CHAT_CONVERSATIONS, WEBSOCKET_URL } from "../../../constants/urlConstants";
import { ChatMessageResponse, ConversationResponse } from "../../../types/types";

const formatTime = (iso?: string): string => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
};

const displayName = (c: ConversationResponse): string => c.customerName || c.customerEmail || "Khách vãng lai";

const ChatInbox: FC = (): ReactElement => {
    const [conversations, setConversations] = useState<ConversationResponse[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
    const [reply, setReply] = useState<string>("");
    const activeIdRef = useRef<number | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    activeIdRef.current = activeId;

    const loadConversations = (): void => {
        RequestService.get(ADMIN_CHAT_CONVERSATIONS, true)
            .then((r) => setConversations(r.data))
            .catch(() => undefined);
    };

    useEffect(() => {
        loadConversations();
        const client: CompatClient = Stomp.over(() => new SockJS(WEBSOCKET_URL));
        client.reconnectDelay = 3000;
        client.debug = () => {};
        client.connect({}, () => {
            client.subscribe("/topic/chat-admin", (frame: any) => {
                const msg: ChatMessageResponse = JSON.parse(frame.body);
                loadConversations();
                if (msg.conversationId === activeIdRef.current) {
                    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
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

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const openConversation = (id: number): void => {
        setActiveId(id);
        RequestService.get(`${ADMIN_CHAT_CONVERSATIONS}/${id}/messages`, true)
            .then((r) => {
                setMessages(r.data);
                loadConversations(); // xoá badge chưa đọc
            })
            .catch(() => undefined);
    };

    const sendReply = (): void => {
        const content = reply.trim();
        if (!content || !activeId) return;
        setReply("");
        RequestService.post(`${ADMIN_CHAT_CONVERSATIONS}/${activeId}/messages`, { content }, true)
            .then((r) => {
                setMessages((prev) => (prev.some((m) => m.id === r.data.id) ? prev : [...prev, r.data]));
                loadConversations();
            })
            .catch(() => undefined);
    };

    const active = conversations.find((c) => c.id === activeId);

    return (
        <div>
            <ContentTitle title={"Hộp thư"} titleLevel={4} icon={<CommentOutlined />} />

            <div className="grid h-[560px] grid-cols-1 gap-4 md:grid-cols-[300px_minmax(0,1fr)]">
                {/* Danh sách hội thoại */}
                <div className="overflow-y-auto rounded-2xl border border-outline-variant/50 bg-surface-container-lowest">
                    {conversations.length === 0 ? (
                        <p className="p-4 font-body-md text-[13px] text-on-surface-variant">Chưa có hội thoại nào.</p>
                    ) : (
                        conversations.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => openConversation(c.id)}
                                className={`flex w-full items-start gap-3 border-b border-outline-variant/40 p-3 text-left transition hover:bg-surface-container-low ${
                                    c.id === activeId ? "bg-primary-fixed" : ""
                                }`}
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-label-sm text-[15px] text-on-primary">
                                    {displayName(c).charAt(0).toUpperCase()}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center justify-between gap-2">
                                        <span className="truncate font-label-sm text-[14px] text-primary">{displayName(c)}</span>
                                        <span className="shrink-0 font-body-md text-[11px] text-on-surface-variant">{formatTime(c.lastMessageAt)}</span>
                                    </span>
                                    <span className="mt-0.5 flex items-center justify-between gap-2">
                                        <span className="truncate font-body-md text-[12px] text-on-surface-variant">{c.lastMessage}</span>
                                        {c.unreadAdmin > 0 && (
                                            <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-secondary px-1 font-label-sm text-[11px] text-white">
                                                {c.unreadAdmin}
                                            </span>
                                        )}
                                    </span>
                                </span>
                            </button>
                        ))
                    )}
                </div>

                {/* Khung tin nhắn */}
                <div className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest">
                    {!active ? (
                        <div className="flex flex-1 flex-col items-center justify-center text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-[44px] text-outline">forum</span>
                            <p className="mt-sm font-body-md text-[14px]">Chọn một hội thoại để trả lời</p>
                        </div>
                    ) : (
                        <>
                            <div className="border-b border-outline-variant/50 px-4 py-3">
                                <p className="font-label-sm text-[15px] text-primary">{displayName(active)}</p>
                                {active.customerEmail && (
                                    <p className="font-body-md text-[12px] text-on-surface-variant">{active.customerEmail}</p>
                                )}
                            </div>

                            <div className="flex-1 space-y-2 overflow-y-auto bg-surface px-4 py-3">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex ${m.sender === "ADMIN" ? "justify-end" : "justify-start"}`}>
                                        <span
                                            className={`max-w-[75%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 font-body-md text-[13px] ${
                                                m.sender === "ADMIN"
                                                    ? "bg-primary text-on-primary"
                                                    : "bg-surface-container text-on-surface"
                                            }`}
                                        >
                                            {m.content}
                                        </span>
                                    </div>
                                ))}
                                <div ref={bottomRef} />
                            </div>

                            <div className="flex items-center gap-2 border-t border-outline-variant/50 p-2">
                                <input
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            sendReply();
                                        }
                                    }}
                                    placeholder="Nhập câu trả lời..."
                                    className="h-10 flex-1 rounded-full bg-surface-container-low px-4 font-body-md text-[14px] text-on-surface outline-none placeholder:text-on-surface-variant"
                                />
                                <button
                                    type="button"
                                    onClick={sendReply}
                                    className="flex h-10 items-center gap-1 rounded-full bg-primary px-4 font-label-sm text-[14px] text-on-primary transition hover:bg-primary-container"
                                >
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    Gửi
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatInbox;
