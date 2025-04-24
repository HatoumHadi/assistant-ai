import { useState, useRef, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";

export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [reportAvailable, setReportAvailable] = useState(false); // State to track if report is available
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

            const data = await response.json();

            // Always show a bot response, even if structure is wrong
            const botMessage = {
                sender: "bot",
                text:
                    data.success && data.reply
                        ? data.reply
                        : data.error || "❌ Something went wrong. Try again.",
            };

            setMessages((prev) => [...prev, botMessage]);

            // Check if the response contains a valid report and set reportAvailable to true
            if (data.success && data.reply && data.reply.includes("[[")) {
                setReportAvailable(true); // Mark that a report is available to download
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

    // Function to handle report download
    const downloadReport = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/download-report", {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            });

            if (response.ok) {
                // Create a blob from the response data (Excel file)
                const blob = await response.blob();
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "report.xlsx"; // Set the file name for download
                link.click();
            } else {
                alert("Failed to generate the report. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while downloading the report.");
        }
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
                                className={`flex ${
                                    msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg max-w-[70%] text-sm leading-relaxed ${
                                        msg.sender === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {msg.text}
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
                            className="flex-1 p-3 rounded-l-lg border border-gray-300 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg"
                        >
                            Send
                        </button>
                    </div>

                    {/* Download Report Button */}
                    {reportAvailable && (
                        <div className="p-4 bg-white dark:bg-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-800">
                            <button
                                onClick={downloadReport}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg"
                            >
                                Download Report
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
