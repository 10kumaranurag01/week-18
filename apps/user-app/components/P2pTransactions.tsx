import { Card } from "@repo/ui/card";

const P2pTransactions = ({
  transactions,
  sessionUserId,
}: {
  transactions: {
    time: Date;
    amount: number;
    fromUserId: number;
    toUserId: number;
  }[];
  sessionUserId: number;
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">
                {sessionUserId == t.fromUserId ? "Sent" : "Recieved"} INR
              </div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div>
              {sessionUserId == t.fromUserId ? (
                <Sent amount={t.amount} />
              ) : (
                <Received amount={t.amount} />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

function Sent({ amount }: { amount: number }) {
  return (
    <div className="flex flex-col justify-center text-red-500">
      - Rs {amount / 100}
    </div>
  );
}
function Received({ amount }: { amount: number }) {
  return (
    <div className="flex flex-col justify-center text-green-500">
      + Rs {amount / 100}
    </div>
  );
}

export default P2pTransactions;
