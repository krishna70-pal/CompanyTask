import { useState, useRef, useEffect } from 'react';
import './AIChatBot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm your FlipMini AI Assistant 🤖. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      const lowerText = userMessage.text.toLowerCase();
      let botResponse = "I'm still learning! But I'll do my best to help. Our support team is available if you need human assistance.";

      if (lowerText.includes('shipping') || lowerText.includes('delivery')) {
        botResponse = "We offer standard delivery (3-5 days) and express delivery (1-2 days). You can track it using the Track Order link in the footer!";
      } else if (lowerText.includes('return') || lowerText.includes('refund')) {
        botResponse = "We have a 30-day hassle-free return policy. You can return any item within 30 days for a full refund.";
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        botResponse = "Hello! 🌟 Finding anything interesting today?";
      } else if (lowerText.includes('discount') || lowerText.includes('sale') || lowerText.includes('price')) {
        botResponse = "We constantly have flash sales! Check out the featured products on our homepage for the best prices.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="ai-chatbot-wrapper">
      {/* The Chat Window */}
      <div className={`ai-chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="ai-chatbot-header">
          <div className="ai-chatbot-title">
            <span className="ai-icon">✨</span>
            <span>FlipMini AI Assistant</span>
          </div>
          <button className="ai-close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="ai-chatbot-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
              <div className="ai-message-bubble">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="ai-message-row bot">
              <div className="ai-message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="ai-chatbot-input-area">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything..."
            className="ai-input"
          />
          <button type="submit" className="ai-send-btn" disabled={!inputText.trim() || isTyping}>
            ➤
          </button>
        </form>
      </div>

      {/* The Floating Toggle Button */}
      <button 
        className={`ai-chatbot-toggle ${isOpen ? 'hide' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chatbot"
      >
        <div className="ai-toggle-icon">✨</div>
      </button>
    </div>
  );
}
