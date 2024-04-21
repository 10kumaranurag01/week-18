"use client";

import { useBalance } from "@repo/store/useBalance";

export default function() {
  console.log("hi there in master");
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}