import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function LiveChatButton({ chatLink, chatText }) {
  const [clicked, setClicked] = useState(false);

  const openChat = () => {
    if (!chatLink) {
      console.warn("Chat link missing from API");
      return;
    }

    const cleanLink = chatLink.replace(/\\/g, "");

    setClicked(true);

    window.open(cleanLink, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={openChat}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition
        ${clicked
          ? "bg-gray-500 text-white"
          : "bg-green-600 hover:bg-green-700 text-white"
        }`}
    >
      <MessageCircle size={18} />
      {chatText || "Live Chat"}
    </button>
  );
}
