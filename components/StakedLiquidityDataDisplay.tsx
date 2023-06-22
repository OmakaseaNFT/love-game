interface IStakedLiquidityDataDisplayProps {
  title: string;
  data: string;
}

export const StakedLiquidityDataDisplay = ({
  data,
  title,
}: IStakedLiquidityDataDisplayProps) => {
  return (
    <div className="w-full flex flex-col m-auto">
      <div className="text-xs">{title}</div>
      <div className="flex flex-row justify-between text-xs">{data}</div>
    </div>
  );
};
