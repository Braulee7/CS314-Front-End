import { useState, useContext } from "react";
import Api from "../../util/api";
import { WebSocketContext } from "../../context/socket-context";
import ErrorMessage from "../error-message";

interface MessageInputProps {
  user: Api;
  room_id: number;
}
function MessageInput(props: MessageInputProps) {
  const { user, room_id } = props;
  const [message, setMessage] = useState<string>("");
  const { emitMessage } = useContext(WebSocketContext);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "")
      {
        setErrorMessage("Message cannot be empty");
        return;
      }
    try {
      const message_obj = await user.sendMessage(room_id, message);
      emitMessage(message_obj);
      setMessage("");
      setErrorMessage("");
    } catch (error) {
      const e = error as Error;
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[5vh] w-[100%] bg-cyan-800">
        <form className="w-full " onSubmit={handleMessageSubmit}>
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
      <ErrorMessage message={errorMessage} />
    </>
  );
}

export default MessageInput;
