interface IPoolDataDisplayProps {
  title: string;
  data: string;
}

export const PoolDataDisplay = ({ title, data }: IPoolDataDisplayProps) => {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="text-xs">{title}</div>
        <div className={title === "Multiplier" ? "text-black" : "text-gray-500"}>
          <div>{data}</div>
        </div>
      </div>
    </div>
  );
};
