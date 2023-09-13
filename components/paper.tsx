const Paper = () => {
  const menuBars = [
    {
      text: "<u>F</u>ile",
    },
    {
      text: "<u>E</u>dit",
    },
    {
      text: "<u>V</u>iew",
    },
    {
      text: "<u>H</u>elp",
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <div className="text-reduced-text mt-1">
        {menuBars.map((item, idx) => (
          <span
            key={idx}
            dangerouslySetInnerHTML={{ __html: item.text }}
            className="mr-2"
          />
        ))}
      </div>
      <div className="border-l-gray-600 border-t-gray-600 border-r-gray-200 border-b-gray-200 border-[1.6px] bg-white w-[100%] flex aspect-[1.15] m-auto mt-1 py-1 px-2 overflow-auto">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontWeight: "bold" }}>Launch Timeline & Overview</h2>
          <ul style={{ listStyleType: "circle", marginLeft: "15px" }}>
            <li>$LOVE smart contract will be on Ethereum Mainnet</li>
            <li>
              Community will review contract code for transparency and safety
            </li>
            <li>
              Transactions via love.game UI enabled after code review period
            </li>
            <li>Eligible wallet holders can claim $LOVE on love.game UI</li>
            <li>
              To get ≥1 $LOVE token: purchase or obtain from existing holder
            </li>
            <li>Revenue mechanisms managed by $LOVE token holders</li>
            <li>
              Token liquidity supported by holders through yield incentives on
              bonding curve
            </li>
          </ul>

          <h2 style={{ fontWeight: "bold" }}>Purchasing $LOVE Tokens</h2>

          <ul style={{ listStyleType: "circle", marginLeft: "15px" }}>
            <li>
              {`The $LOVE smart contract will be deployed on the Ethereum Mainnet.
              To ensure transparency and safety, we'll provide a few hours for
              the community to review the contract code. Only after this review
              period, we'll enable transactions to occur through the love.game
              user interface (UI).`}
            </li>
            <li>
              Once transactions are allowed, those with eligible wallets can
              claim $LOVE tokens via the love.game UI.
            </li>
            <li>
              {`However, there's a prerequisite.`}
              <strong>
                To conduct any transaction or to interact with the $LOVE
                contract, you must already own at least 1 $LOVE token in your
                wallet.
              </strong>{" "}
              {`Therefore, if you wish to acquire $LOVE tokens and didn't qualify
              for an airdrop, you'll need to obtain 1 $LOVE token from an
              existing $LOVE holder.`}
            </li>
            <li>
              The entire revenue mechanisms are managed by $LOVE token holders.
              These holders also support token liquidity by receiving yield
              incentives on a bonding curve.
            </li>
          </ul>

          <h2 style={{ fontWeight: "bold" }}>Claiming $LOVE Tokens</h2>

          <ul style={{ listStyleType: "circle", marginLeft: "15px" }}>
            <li>
              Once the love.game UI is active, wallets that completed the 0ETH
              transaction before the snapshot can claim their $LOVE tokens.
            </li>
            <li>This claiming opportunity will be available for a week.</li>
          </ul>

          <h2 style={{ fontWeight: "bold" }}>Staking $LOVE Tokens</h2>

          <ul style={{ listStyleType: "circle", marginLeft: "15px" }}>
            <li>
              $LOVE token holders can supply liquidity to LOVE/ETH farms and
              earn $LOVE emissions.
            </li>
            <li>
              A single-sided staking pool will be introduced in the future.
            </li>
            <li>
              Additionally, other farming pairs will be made available over
              time.
            </li>
          </ul>

          <h2 style={{ fontWeight: "bold" }}>Upcoming Features & Utility</h2>

          <ul style={{ listStyleType: "circle", marginLeft: "15px" }}>
            <li>
              LIPS Governance portal: This will facilitate $LOVE Improvement
              Proposals.
            </li>
            <li>
              AI Compute: You will be able to use your $LOVE tokens to buy AI
              compute power from the OmakaseaDev supercomputer.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Paper;
