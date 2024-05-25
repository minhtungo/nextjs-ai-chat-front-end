import { FC } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackProps {}

const Feedback: FC<FeedbackProps> = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={`area`}>Area</Label>
        <Select defaultValue="billing">
          <SelectTrigger id={`area`} aria-label="Area">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="account">Account</SelectItem>
            <SelectItem value="deployments">Deployments</SelectItem>
            <SelectItem value="support">Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`subject`}>Subject</Label>
        <Input id={`subject`} placeholder="I need help with..." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`description`}>Description</Label>
        <Textarea
          id={`description`}
          placeholder="Please include all information relevant to your issue."
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-end space-x-2">
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default Feedback;
