import {
  getConnectionTokenAction,
  getPublishMessageTokenAction,
  getSubscriptionTokenAction,
} from "@/actions/centrifuge";
import { createPayload, encodeData } from "@/lib/utils";
import { Centrifuge } from "centrifuge";

export const getConnectionToken = async () => {
  const [data, err] = await getConnectionTokenAction();

  if (err) {
    throw new Centrifuge.UnauthorizedError("Unauthorized");
  }

  return data.token;
};

export const getSubscriptionToken = async (channel: string) => {
  const [data, err] = await getSubscriptionTokenAction({
    channel,
  });

  if (err) {
    throw new Centrifuge.UnauthorizedError("Unauthorized");
  }

  return data.token;
};

export const getChannelSubscriptionToken = async (channel: string) => {
  return getSubscriptionToken(channel);
};

export const getPublishMessageToken = async (
  channel: string,
  message: string,
) => {
  const [data, err] = await getPublishMessageTokenAction({
    channel,
    message,
  });

  if (err) {
    throw new Centrifuge.UnauthorizedError("Unauthorized");
  }

  return data.token;
};

export const encodeDataUseCase = async ({ userId }: { userId: string }) => {
  const payload = createPayload({
    uid: userId,
  });

  return encodeData(payload);
};
