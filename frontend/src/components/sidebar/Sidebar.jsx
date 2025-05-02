import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      {/* Search Input */}
      <SearchInput />

      {/* Divider */}
      <div className="divider px-3"></div>

      {/* Conversations - Make this scrollable */}
      <div className="flex-1 overflow-y-auto">
        <Conversations />
      </div>

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
