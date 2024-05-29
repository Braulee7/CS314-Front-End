import { useState } from "react";
import Api from "../../util/api";

interface MessageInputProps {
  user: Api;
  room_id: number;
}

function MessageInput(props: MessageInputProps) {
  const { user, room_id } = props;
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    try {
      await user.sendMessage(room_id, message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[5vh] w-[100%] bg-cyan-800">
        <form className="w-full " onSubmit={sendMessage}>
          <div className="flex items-center ">
            <input
              data-testid="message-input"
              className="appearance-none bg-cyan-800 border-b border-teal-800 text-stone-200 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-lg w-full"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              data-testid="submit-btn"
              type="submit"
              className="flex-shrink-0 bg-tal-0 hover:bg-teal-700 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MessageInput;
