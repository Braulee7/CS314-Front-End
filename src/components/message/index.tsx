interface MessageProps {
  content: string;
  sender: string;
  timestamp: string;
}

function Message(props: MessageProps) {
  const { content, sender, timestamp } = props;
  return (
    <div className="group w-full flex gap-2 border-b-2 border-slate-950 bg-gray-600">
      <span>
        <div className=" bg-cyan-950 text-gray-300 p-2 rounded-md max-w-80">
          {sender}
        </div>
      </span>
      <span>
        <div className="absolute translate-y-1 hidden bg-teal-950 p-2 rounded-md text-xs text-gray-200 group-hover:block">
          {timestamp}
        </div>
      </span>
      <span>
        <div className="text-white w-full bg-red ">{content}</div>
      </span>
    </div>
  );
}

export default Message;
