import { useState, forwardRef } from "react";
import Api from "../../util/api";
import Socket from "../../util/socket";
interface MessageInputProps {
  user: Api;
  room_id: number;
}

const MessageInput = forwardRef<Socket, MessageInputProps>(function (
  props,
  ref: React.Ref<Socket>
) {
  const { user, room_id } = props;
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    try {
      const message_obj = await user.sendMessage(room_id, message);
      ref?.current.sendMessage(message_obj);
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
});

export default MessageInput;
