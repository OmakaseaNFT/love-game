const Error = () => {
  return (
    <div className="text-[22px] w-[800px] h-[600px] flex bg-[#000EB6] flex flex-col justify-center mx-auto">
      <div className="mx-[80px] ">
        <div className="flex flex-row justify-center">
          <div className="bg-white px-2">System Error</div>
        </div>
        <div className="mt-12 mb-4 text-[#DBE3FF]">
          A fatal exception 0E76543801 has occurred at 0027:C87123 in TMIL TMIL.
          Operating system has been stopped to prevent damage to your computer.
        </div>
        <div className="text-[#DBE3FF]">* Press any key to send dev money.</div>
        <div className="text-[#DBE3FF]">
          * Press 2 to send dev love. You will lose ETH to send dev love.
        </div>
        <div className="text-center mt-8 text-[#DBE3FF]">
          Press f5 to continue _
        </div>
      </div>
    </div>
  );
};
export default Error;
