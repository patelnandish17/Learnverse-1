import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const LEARNBOT_SYSTEM_PROMPT = `
You are LearnBot, the AI learning assistant for LearnVerse —
an EdTech platform aggregating courses from Udemy, Coursera, and YouTube.

Your role:
- Help students understand course concepts clearly
- Recommend what to learn next based on their goals
- Explain complex topics simply (ask for preferred depth)
- Keep learners motivated and accountable
- Answer questions about tech, design, data science, business

Communication style:
- Concise by default (3-5 sentences), detailed when asked
- Use markdown: bullets for lists, code blocks for code
- Address user by name if provided in context
- Be encouraging, not patronizing

Hard limits:
- Never invent course prices, ratings, or availability
- If asked about a specific course: "Check the course page for current details"
- Never discuss topics completely unrelated to learning/education
- Max response: 400 words unless user asks for more
`;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuthStore();

  const sendMessage = async (text: string, context?: string) => {
    if (!text.trim()) return;

    setError(null);
    const userMessage: ChatMessage = { role: 'user', content: text };
    const assistantMessage: ChatMessage = { role: 'assistant', content: '', isStreaming: true };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const systemPrompt = [
        LEARNBOT_SYSTEM_PROMPT,
        context && `Current page context: ${context}`,
        profile?.full_name && `User's name: ${profile.full_name}`,
      ].filter(Boolean).join('\n\n');

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemPrompt,
        },
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      });

      const response = await chat.sendMessageStream({
        message: text,
      });

      let fullContent = '';
      for await (const chunk of response) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullContent += chunkText;
          setMessages((prev) => {
            const newMessages = [...prev];
            const last = newMessages[newMessages.length - 1];
            if (last && last.role === 'assistant') {
              last.content = fullContent;
            }
            return newMessages;
          });
        }
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        const last = newMessages[newMessages.length - 1];
        if (last && last.role === 'assistant') {
          last.isStreaming = false;
        }
        return newMessages;
      });
      setIsStreaming(false);

    } catch (err) {
      console.error('Chat error:', err);
      setError('Something went wrong. Please try again.');
      setMessages((prev) => prev.slice(0, -2)); // Remove optimistic messages
      setIsStreaming(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return { messages, isStreaming, error, sendMessage, clearChat };
}
