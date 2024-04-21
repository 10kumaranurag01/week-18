"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import React, { useState } from "react";
import { P2pTranfer } from "../app/lib/actions/P2pTransfer";
import { PaymentSuccessCard } from "./PaymentSuccessCard";
import Spinner from "./Spinner";

const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Card title="Send">
      <div className="w-full">
        <TextInput
          label="Number"
          placeholder="Enter number"
          onChange={(value) => {
            setNumber(value);
          }}
        />
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <div className="flex justify-center pt-4">
          {loading ? (
            <Spinner />
          ) : (
            <Button
              onClick={async () => {
                setLoading(true);
                await P2pTranfer(number, amount * 100);
                setLoading(false);
                setShowCard(true);
              }}
            >
              Send
            </Button>
          )}
        </div>
        {showCard ? (
          <PaymentSuccessCard onClick={() => setShowCard(false)} />
        ) : null}
      </div>
    </Card>
  );
};

export default SendCard;
