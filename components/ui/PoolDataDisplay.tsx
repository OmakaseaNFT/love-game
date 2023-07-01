interface IPoolDataDisplayProps {
  title: string;
  data: string;
}

export const PoolDataDisplay = ({ title, data }: IPoolDataDisplayProps) => {
  return (
    <div className="w-full flex flex-col h-[40px] mt-[4px]">
      <div className="text-xs whitespace-nowrap h-[20px] text-center font-semibold">{title}</div>
      <div className={`text-center ${parseFloat(data) > 0 ? "text-black" : "text-gray-500"}`}>
        {data}
      </div>
    </div>
  );
};
