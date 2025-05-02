import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";



const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      const scrollToBottom = () => {
        try {
          // Direct container scroll - most reliable for mobile
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
              messagesContainerRef.current.scrollHeight;
          }
        } catch (error) {
          // Fallback to element scrolling
          if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
          }
        }
      };

      // Execute multiple times to ensure it works on mobile
      scrollToBottom();
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll w-full px-4"
      style={{
        WebkitOverflowScrolling: "touch",
        maxHeight: "100%",
      }}
    >
      {!loading && messages.length > 0 && (
        <div className="pb-2">
          {messages.map((message, index) => (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className="mb-2"
            >
              <Message message={message} />
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-center">
            Send a message to start the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
