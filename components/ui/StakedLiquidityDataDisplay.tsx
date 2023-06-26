interface IStakedLiquidityDataDisplayProps {
  title: string;
  data: string;
}

export const StakedLiquidityDataDisplay = ({
  data,
  title,
}: IStakedLiquidityDataDisplayProps) => {
  return (
    <div className="w-full flex flex-col mt-[4px]">
      <div className="text-xs mb-[-7px] h-[27px] text-center font-semibold">{title}</div>
      <div className="text-xs text-center">{data}</div>
    </div>
  );
};
