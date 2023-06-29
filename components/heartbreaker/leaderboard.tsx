import { useContext } from "react";
import { HeartBreakerContext } from "../../system/context/HeartbreakerContext";

const LeaderBoard = () => {
  const headerList = ["Account", "Total Play", "Total Won"];
  const { leaderboard } = useContext(HeartBreakerContext);

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
                {!!leaderboard.length &&
                  leaderboard.map((leader, index) => {
                    return (
                      <tr key={`history-${index}`}>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {leader.user_address}
                        </td>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {Number(leader.total_amount).toFixed(2)}
                        </td>
                        <td className="border px-3 py-1 text-left text-xs font-medium text-gray-500">
                          {Number(leader.total_profit).toFixed(2)}
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

export default LeaderBoard;
