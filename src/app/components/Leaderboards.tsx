
const data = [
  {
    rank:1,
    username:"Username",
    tokens: "1.879.989 Tokens"
  },
  {
    rank: 2,
    username: "User2",
    tokens: "1.500.000 Tokens"
  },
  {
    rank: 3,
    username: "User3",
    tokens: "1.200.000 Tokens"
  },
  {
    rank: 4,
    username: "User4",
    tokens: "1.100.000 Tokens"
  },
  {
    rank: 5,
    username: "User5",
    tokens: "1.000.000 Tokens"
  },
  {
    rank: 6,
    username: "User6",
    tokens: "950.000 Tokens"
  },
  {
    rank: 7,
    username: "User7",
    tokens: "900.000 Tokens"
  },
  {
    rank: 8,
    username: "User8",
    tokens: "850.000 Tokens"
  },
  {
    rank: 9,
    username: "User9",
    tokens: "800.000 Tokens"
  },
  {
    rank: 10,
    username: "User10",
    tokens: "750.000 Tokens"
  },
  {
    rank: 11,
    username: "User11",
    tokens: "700.000 Tokens"
  },
  {
    rank: 12,
    username: "User12",
    tokens: "650.000 Tokens"
  },
  {
    rank: 13,
    username: "User13",
    tokens: "600.000 Tokens"
  },
  {
    rank: 14,
    username: "User14",
    tokens: "550.000 Tokens"
  },
  {
    rank: 15,
    username: "User15",
    tokens: "500.000 Tokens"
  },
  {
    rank: 16,
    username: "User16",
    tokens: "450.000 Tokens"
  }
]

export const Leaderboards = () => {
  return (
    <>
      <div className="h-[calc(100vh-4.5rem)] w-full py-8 px-5 bg-white">
        <div className="relative w-full h-[25%]">
          <div className="absolute top-0 left-0 w-full h-24 bg-[#CAEB45] z-10 rounded-2xl px-5 py-4 space-y-3">
            <h2 className="text-xl font-semibold">Your Rank</h2>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-5">
                <p>210</p>
                <p>Username</p>
              </div>
              <p>1.879.989 Tokens</p>
            </div>
          </div>

          <div className="absolute top-14 left-0 h-24 w-full bg-black z-0 rounded-2xl flex px-5 py-4 justify-center items-end">
            <p className="font-light text-lg text-white w-full text-start">
              <span className="font-semibold text-xl text-white">
                5.324.123
              </span>{" "}
              Holders
            </p>
          </div>
        </div>

        <div className="h-[75%] mt-3 overflow-y-scroll space-y-3 py-2">
          {data.map((item) => (
            <div
              key={item.rank}
              className={`flex flex-row justify-between items-center px-5 py-5 rounded-lg ${
                item.rank <= 3 ? "bg-[#F3F3F3]" : ""
              }`}
            >
              <div className="flex flex-row space-x-5 text-lg font-normal">
                <p>{item.rank}</p>
                <p>{item.username}</p>
              </div>
              <p className="font-light">{item.tokens}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
