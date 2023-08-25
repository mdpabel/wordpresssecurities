import React from "react";
import { Subscription } from "@prisma/client";
import SubscriptionButtons from "./SubscriptionButtons";
import clsx from "clsx";
import { formateDate } from "@/lib/utils";
import { Card } from "@/components/common/Card";
import { SubTitle } from "@/components/common/Title";

const Subscription = ({ subscription }: { subscription: Subscription }) => {
  const interval = subscription.interval_count + " " + subscription.interval;
  const packageName =
    interval === "1 year"
      ? "Annual"
      : interval === "3 month"
      ? "Quarterly"
      : "Half annual";

  const price =
    packageName === "Annual" ? 99 : packageName === "Quarterly" ? 39 : 59;

  const formateExpiredDate = formateDate(subscription.current_period_end);
  const isActive = !!!subscription.cancellation_date;

  return (
    <Card className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center justify-between p-4 md:p-8 rounded shadow">
      <div className="space-y-2">
        <SubTitle>{packageName}</SubTitle>
        <h3>
          Expires on {formateExpiredDate} | {price} USD | https://mdpabel.com |
          <span
            className={clsx({
              "font-bold": true,
              "text-green-500 ": isActive,
              "text-red-500 ": !isActive,
            })}
          >
            {" "}
            {isActive ? "Active" : "Cancelled"}
          </span>
        </h3>
      </div>
      <SubscriptionButtons subscription_id={subscription.subscription_id} />
    </Card>
  );
};

export default Subscription;
