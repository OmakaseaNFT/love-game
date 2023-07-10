import { useContext, useState } from "react";
import { HeartBreakerContext } from "../../system/context/HeartbreakerContext";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IHeartbreakHistorySortOrder } from "../../interfaces/ISortOrder";

const HeartBreakTable = () => {
  const headerList = ["Round", "Crash", "Date/Time", "Total Play", "Total Won"];
  const [currentSort, setcurrentSort] = useState<IHeartbreakHistorySortOrder>();
  const { gameHistory, onSortGameHistory } = useContext(HeartBreakerContext);

  const sortBy: any = {
    'Round': 'game_number',
    'Crash': 'crash',
    'Date/Time': 'date_created',
    'Total Play': 'total_amount',
    'Total Won': 'total_profit',
  }
  return (
    <div className="flex flex-col mt-2">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-600 mb-[5rem]">
              <thead>
                <tr>
                  {headerList.map((item, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="border px-3 py-1 text-left text-[10px] font-medium text-[#000000] uppercase tracking-wider border-gray-600 relative"
                      >
                        {item}

                        <div className="grid grid-rows-2 absolute right-0 top-[12%] h-4">
                          <button
                            onClick={() => {
                              if (currentSort?.sortBy == sortBy[item].toLocaleLowerCase() && currentSort?.order == 'ASC') {
                                return
                              }

                              onSortGameHistory({
                                sortBy: sortBy[item].toLocaleLowerCase(),
                                order: 'ASC',
                              })
                              setcurrentSort({
                                sortBy: sortBy[item].toLocaleLowerCase(),
                                order: 'ASC',
                              })
                            }}>
                            <MdArrowDropUp className={`${(currentSort?.sortBy == sortBy[item].toLocaleLowerCase() && currentSort?.order == 'ASC' ? `text-black` : `text-gray-500`)}`} />
                          </button>
                          <button
                            onClick={() => {
                              if (currentSort?.sortBy == sortBy[item].toLocaleLowerCase() && currentSort?.order == 'DESC') {
                                return
                              }

                              onSortGameHistory({
                                sortBy: sortBy[item].toLocaleLowerCase(),
                                order: 'DESC',
                              })
                              setcurrentSort({
                                sortBy: sortBy[item].toLocaleLowerCase(),
                                order: 'DESC',
                              })
                            }}>
                            <MdArrowDropDown className={`${(currentSort?.sortBy == sortBy[item].toLocaleLowerCase() && currentSort?.order == 'DESC' ? `text-black` : `text-gray-500`)}`} />
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {!!gameHistory.length &&
                  gameHistory.map((game, index) => {
                    const date = game.date_created?.split("T")[0];
                    return (
                      <tr
                        key={`history-${index}`}
                        className={` bg-[${index % 2 === 0 ? "white" : "gray"
                          }]`}
                      >
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
