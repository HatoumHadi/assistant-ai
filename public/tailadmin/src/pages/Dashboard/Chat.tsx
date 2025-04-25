import { useState, useRef, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";



export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ sender: string; text: string; fileUrl?: string; fileName?: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Load messages from sessionStorage on initial load
    useEffect(() => {
        const storedMessages = sessionStorage.getItem("chatMessages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    // Save messages to sessionStorage on update
    useEffect(() => {
        sessionStorage.setItem("chatMessages", JSON.stringify(messages));
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (response.headers.get('content-type')?.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                const blob = await response.blob();
                const fileUrl = URL.createObjectURL(blob);

                setMessages((prev) => [
                    ...prev,
                    {
                        sender: "bot",
                        text: "Here's your report:",
                        fileUrl: fileUrl,
                        fileName: "report.xlsx"
                    },
                ]);
            } else {
                const data = await response.json();

                if (data.success) {
                    setMessages((prev) => [
                        ...prev,
                        { sender: "bot", text: data.reply }
                    ]);
                } else {
                    setMessages((prev) => [
                        ...prev,
                        { sender: "bot", text: data.error || "❌ Something went wrong. Try again." }
                    ]);
                }
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "❌ Something went wrong. Try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    const downloadFile = (fileUrl: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            URL.revokeObjectURL(fileUrl);
        }, 100);
    };

    return (
        <>
            <PageMeta
                title="AI Chat | TailAdmin"
                description="Ask questions and get AI responses on this page."
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 md:col-span-8 md:col-start-3 bg-white dark:bg-gray-900 shadow-md rounded-xl h-[80vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
                    {/* Header */}
                    <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-semibold border-b border-gray-300 dark:border-gray-800">
                        AI Assistant Chat
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50 dark:bg-gray-900">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg max-w-[70%] text-sm leading-relaxed ${
                                        msg.sender === "user"
                                            ? "bg-[#12baab] text-white"
                                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                                    }`}
                                >
                                    {msg.text}
                                    {msg.fileUrl && (
                                        <div className="mt-2">
                                            <button
                                                onClick={() => downloadFile(msg.fileUrl!, msg.fileName || "report.xlsx")}
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Download Report
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="text-gray-500 italic text-sm">AI is typing...</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-800 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 p-3 rounded-l-lg border border-gray-300 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#12baab] dark:bg-gray-800 dark:text-white"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-[#12baab] hover:bg-[#12baab] text-white px-4 py-3 rounded-r-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
