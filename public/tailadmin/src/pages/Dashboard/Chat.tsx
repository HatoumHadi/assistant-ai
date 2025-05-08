import { useState, useRef, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { FiMic, FiStopCircle } from "react-icons/fi";

export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ sender: string; text: string; fileUrl?: string; fileName?: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0); // in seconds
    const recorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const recordInterval = useRef<NodeJS.Timeout | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedMessages = sessionStorage.getItem("chatMessages");
        if (storedMessages) setMessages(JSON.parse(storedMessages));
    }, []);

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
            const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const replyText = data.reply;
            const report = data.report;


            const botMessage = {
                sender: "bot",
                text: replyText,
                ...(report && {
                    fileUrl: report.report_path,
                    fileName: report.report_filename
                }),
            };

            setMessages((prev) => [...prev, botMessage]);

        } catch {
            setMessages((prev) => [...prev, { sender: "bot", text: "❌ Something went wrong. Try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    const downloadFile = (fileUrl: string, fileName: string) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatTime = (seconds: number): string => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const chunks: Blob[] = [];
            const recorder = new MediaRecorder(stream);

            recorderRef.current = recorder;
            streamRef.current = stream;

            setIsRecording(true);
            setRecordTime(0);

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            recorder.onstop = async () => {
                // Here we are using 'chunks' to create the audio Blob
                const blob = new Blob(chunks, { type: "audio/mp3" });

                // Now using the 'blob' instead of 'recordedBlob'
                const formData = new FormData();
                formData.append("audio", blob, "voice-message.mp3");

                setMessages((prev) => [...prev, { sender: "user", text: "[Voice Message]" }]);
                setLoading(true);

                try {
                    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

                    const response = await fetch(`${API_BASE_URL}/api/voice`, {
                        method: "POST",
                        body: formData,
                    });

                    const contentType = response.headers.get("content-type");

                    if (!contentType?.includes("application/json")) {
                        const text = await response.text();
                        throw new Error(`Expected JSON, got: ${text.slice(0, 100)}...`);
                    }


                    const data = await response.json();
                    const replyText = data.reply;
                    const report = data.report;


                    const botMessage = {
                        sender: "bot",
                        text: replyText,
                        ...(report && {
                            fileUrl: report.report_path,
                            fileName: report.report_filename
                        }),
                    };


                    if (data.success) {
                        setMessages((prev) => [...prev, botMessage]);
                    } else {
                        setMessages((prev) => [...prev, { sender: "bot", text: data.error || "❌ Something went wrong with voice processing." }]);
                    }
                } catch (error) {
                    console.error("Voice send error", error);
                    setMessages((prev) => [...prev, { sender: "bot", text: "❌ Failed to send voice message." }]);
                } finally {
                    setLoading(false);
                }
            };

            recorder.start();

            recordInterval.current = setInterval(() => {
                setRecordTime((prev) => {
                    if (prev >= 59) {
                        stopRecording();
                        return 60;
                    }
                    return prev + 1;
                });
            }, 1000);

        } catch (err) {
            console.error("Microphone access denied or error:", err);
            setIsRecording(false);
        }
    };



    const stopRecording = () => {
        if (recorderRef.current && recorderRef.current.state !== "inactive") {
            recorderRef.current.stop();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
        if (recordInterval.current) {
            clearInterval(recordInterval.current);
        }
    };

    return (
        <>
            <PageMeta title="AI Chat" description="Ask questions and get AI responses on this page." />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 md:col-span-10 md:col-start-2 bg-white dark:bg-gray-900 shadow-md rounded-none md:rounded-xl h-[80vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 text-sm md:text-base">
                {/* Header */}
                    <div className="p-3 md:p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-semibold border-b border-gray-300 dark:border-gray-800">
                        AI Assistant Chat
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-2 md:px-4 py-2 space-y-2 md:space-y-3 bg-gray-50 dark:bg-gray-900">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mx-1 md:mx-0`}>
                                <div className={`px-3 py-2 md:px-4 md:py-2 rounded-lg max-w-[85%] md:max-w-[70%] leading-relaxed text-sm ${msg.sender === "user" ? "bg-[#12baab] text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"}`}>
                                    <div>{msg.text}</div>
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
                        {loading && <div className="text-gray-500 italic text-sm">AI is typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="px-2 md:px-4 py-2 md:py-3 bg-white dark:bg-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-800 flex items-center gap-2">
                        {isRecording ? (
                            <div className="flex-1 px-3 md:px-4 py-2 bg-gray-400 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-white text-sm">
                                🎙️ Recording... {formatTime(recordTime)}
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#12baab] dark:bg-gray-800 dark:text-white text-sm"
                            />
                        )}

                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-3 rounded-lg ${isRecording ? "bg-red-500" : "bg-black dark:bg-gray-700"} text-white hover:opacity-80 focus:outline-none`}
                            disabled={loading}
                            title={isRecording ? "Stop Recording" : "Start Recording"}
                        >
                            {isRecording ? <FiStopCircle size={18} /> : <FiMic size={18} />}
                        </button>

                        <button
                            onClick={sendMessage}
                            disabled={isRecording || loading}
                            className="bg-[#12baab] hover:bg-[#12baab] text-white px-4 py-3 rounded-lg disabled:opacity-50 text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>


            </div>
        </>
    );
}
