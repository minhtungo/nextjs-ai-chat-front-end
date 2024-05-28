"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PAYMENT_METHODS } from "@/lib/constant";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import CardPayment from "./CardPayment";
import MoMoPayment from "./MoMoPayment";

interface PaymentMethodsProps {}

const PaymentMethods: FC<PaymentMethodsProps> = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PAYMENT_METHODS[0].key,
  );
  const t = useTranslations("common");

  return (
    <Card noBorder>
      <CardContent className="grid gap-6" noBorder>
        <RadioGroup
          defaultValue={PAYMENT_METHODS[0].key}
          className="grid grid-cols-3 gap-4"
          onValueChange={(value: string) => setSelectedPaymentMethod(value)}
        >
          {PAYMENT_METHODS.map(({ key, title, icon }) => (
            <div key={key}>
              <RadioGroupItem
                value={key}
                id={key}
                className="peer sr-only"
                aria-label={title}
              />
              <Label
                htmlFor={key}
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {icon}
                <span>{title}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {selectedPaymentMethod === "card" ? <CardPayment /> : <MoMoPayment />}
      </CardContent>
      <CardFooter noBorder>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethods;
