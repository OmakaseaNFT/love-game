const HeartBreakTable = () => {
  const headerList = ["Round", "Crash", "Date/Time", "Total Play", "Total Won"];
  return (
    <div className="flex flex-col mt-2">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden flex flex-row w-full">
            {headerList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="text-left px-3 py-1 text-[10px] font-medium text-[#000000] uppercase tracking-wider border-l-gray-200  border-t-gray-600 border-r-gray-600 border-b-gray-600 border ml-[0.5px] borderBottomShadow flex-auto"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartBreakTable;
