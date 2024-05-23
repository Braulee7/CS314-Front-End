import { useState } from "react";
import Api from "../../api";

interface MessageInputProps {
  user: Api;
  room_id: number;
}

function MessageInput(props: MessageInputProps) {
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <div className="flex items-center justify-center">
        <form className="w-full max-w-sm">
          <div className="flex items-center ">
            <input
              data-testid="message-input"
              className="appearance-none bg-cyan-950 bg-opacity-30 border-b border-teal-800 text-stone-200 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-lg w-full"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
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
