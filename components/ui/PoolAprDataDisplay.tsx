interface IPoolAprDataDisplayProps {
  title: string;
  data: string;
}

export const PoolAprDataDisplay = ({ title, data }: IPoolAprDataDisplayProps) => {
  return (
    <div
      className="w-full flex flex-col mt-[4px]"
      style={{ position: "relative" }}
    >
      <div className="text-xs text-center font-semibold">{title}</div>

      <div className={`flex flex-row justify-center ${parseFloat(data) > 0 ? "text-black" : "text-gray-500"}`}>
        <div className="truncate" style={{ position: "relative" }}>
          {data}
        </div>
        <span>%</span>
      </div>
    </div>
  );
};
