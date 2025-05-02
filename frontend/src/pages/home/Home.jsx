import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 max-h-screen">
      {/* Sidebar */}
      <div
        className={`flex-1 h-full w-screen md:w-full  max-h-screen ${
          selectedConversation ? "hidden md:flex" : "flex"
        }`}
      >
        <Sidebar />
      </div>

      {/* Message Container */}
      <div
        className={`flex-1 h-full w-screen md:w-full max-h-screen ${
          selectedConversation ? "flex" : "hidden md:flex"
        }`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
