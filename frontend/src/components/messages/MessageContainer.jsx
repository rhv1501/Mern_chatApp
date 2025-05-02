import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { BiLogOut } from "react-icons/bi";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  if (!selectedConversation) return <NoChatSelected />;

  return (
    <div className="md:min-w-[450px] flex flex-col h-[85vh] md:h-full w-full">
      {/* Chat header */}
      <div className="bg-red-500 px-4 py-2 mb-2 flex-shrink-0">
        <span className="label-text text-white">To:</span>{" "}
        <span className="text-white font-bold">
          {selectedConversation.fullName}
        </span>
      </div>

      {/* Messages container - fixed height with overflow */}
      <div className="flex-grow overflow-hidden relative h-[calc(100%-120px)]">
        <Messages />
      </div>

      {/* Message input */}
      <div className="flex-shrink-0 mt-auto">
        <MessageInput />
      </div>

      {/* Back button for mobile */}
      <div className="flex md:hidden flex-shrink-0">
        <button
          onClick={() => setSelectedConversation(null)}
          className="mb-2 px-2 flex items-center"
        >
          <BiLogOut className="w-6 h-6 text-white cursor-pointer mr-1" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
