const ChatBox = () => {
  return (
    <div className="my-[5px] mx-[5px]">
      <div className="bg-white px-[8px] py-[20px] h-[180px] border border-l-gray-600 border-t-gray-500 border-r-gray-200 border-b-gray-200">
        <div className="flex flex-row text-[10px]">
          <div>0x23234..:</div>
          <div>asdasd</div>
        </div>
      </div>
      <input
        placeholder="type something here..."
        type="text"
        className="text-[#000] mt-[5px] px-[3px] py-[3px] text-[10px] border border-l-gray-600 border-t-gray-500 border-r-gray-200 border-b-gray-200 w-full"
      />
    </div>
  );
};

export default ChatBox;
