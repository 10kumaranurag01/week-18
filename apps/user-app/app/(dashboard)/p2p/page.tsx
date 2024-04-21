"use server";

import React from "react";
import SendCard from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import P2pTransactions from "../../../components/P2pTransactions";

const page = async () => {
  const session = await getServerSession(authOptions);

  async function getP2PTransactions() {
    const txns = await prisma.p2pTransfer.findMany({
      where: {
        OR: [
          { toUserId: Number(session?.user?.id) },
          { fromUserId: Number(session?.user?.id) },
        ],
      },
    });
    return txns.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      fromUserId: t.fromUserId,
      toUserId: t.toUserId,
    }));
  }

  /*   const transactions = await getP2PTransactions(); */

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 w-full">
        <div>
          <SendCard />
        </div>
        <div>
          <P2pTransactions
            transactions={await getP2PTransactions()}
            sessionUserId={session?.user?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
