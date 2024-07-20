import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_NAMES } from "@/lib/constant";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface CardPaymentProps {}

const CardPayment: FC<CardPaymentProps> = () => {
  const t = useTranslations("common");

  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="First Last" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="number">Card number</Label>
        <Input id="number" placeholder="" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="month">Expires</Label>
          <Select>
            <SelectTrigger id="month" aria-label="Month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {MONTH_NAMES.map((month) => (
                <SelectItem key={t(month.title)} value={month.value.toString()}>
                  {t(month.title)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Select>
            <SelectTrigger id="year" aria-label="Year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                  {new Date().getFullYear() + i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="CVC" />
        </div>
      </div>
    </>
  );
};

export default CardPayment;
