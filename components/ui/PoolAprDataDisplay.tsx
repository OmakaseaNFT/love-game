interface IPoolAprDataDisplayProps {
  title: string;
  data: string;
}

export const PoolAprDataDisplay = ({ title, data }: IPoolAprDataDisplayProps) => {
  return (
    <div
      className="w-full flex flex-col m-auto"
      style={{ position: "relative" }}
    >
      <div className="text-xs">{title}</div>
      <div className="truncate" style={{ position: "relative" }}>
        {data}
      </div>
      <span
        style={{
          position: "absolute",
          right: "-4px",
          bottom: "0px",
        }}
      >
        %
      </span>
    </div>
  );
};
