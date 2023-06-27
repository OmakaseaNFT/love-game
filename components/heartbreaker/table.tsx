import { useContext, useEffect } from "react";
import { HeartBreakerContext } from "../../system/context/HeartbreakerContext";

const HeartBreakTable = () => {
  const headerList = ["Round", "Crash", "Date/Time", "Total Play", "Total Won"];
  const { gameHistory } = useContext(HeartBreakerContext);

  useEffect(() => {
    console.log("gameHistory", gameHistory);
  }, [gameHistory]);
  return (
    <div className="flex flex-col mt-2">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-600">
              <thead>
                <tr>
                  {headerList.map((item, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="border px-3 py-1 text-left text-[10px] font-medium text-[#000000] uppercase tracking-wider border-gray-600"
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {!!gameHistory.length &&
                  gameHistory.map((game, index) => {
                    const date = game.date_created?.split("T")[0]
                    return (
                      <tr key={`history-${index}`}>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {game.game_number}
                        </td>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {game.crash}
                        </td>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {date?.toString()}
                        </td>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {Number(game.total_amount).toFixed(2)}
                        </td>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {Number(game.total_profit).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartBreakTable;
