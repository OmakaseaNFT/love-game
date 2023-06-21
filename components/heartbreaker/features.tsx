import { useState } from "react";
import { StakingSelectTab } from "../ui/StakingSelectTab";
import HeartBreakTable from "./table";
import { HeartBreakTab } from "./tab";
import ChatBox from "./chatbox";

const Features = () => {
  const [tab, setTab] = useState<string>("history");
  const tabList = [
    {
      title: "History",
      key: "history",
    },
    {
      title: "LeaderBoard",
      key: "leaderboard",
    },
    {
      title: "Chat",
      key: "chat",
    },
  ];

  const renderBody = () => {
    switch (tab) {
      case "history":
        return <HeartBreakTable />;
      case "leaderboard":
        return <HeartBreakTable />;
      case "chat":
        return <ChatBox />;
      default:
        break;
    }
  };
  return (
    <div className="border mt-2 h-[247px] border-b-gray-600 border-r-gray-600">
      <div className="flex flex-row text-xl ">
        {tabList.map((list, index) => {
          return (
            <HeartBreakTab
              key={index}
              title={list.title}
              onClick={() => {
                setTab(list.key);
              }}
              isSelected={tab == list.key}
            />
          );
        })}
      </div>
      <div>{renderBody()}</div>
    </div>
  );
};

export default Features;
