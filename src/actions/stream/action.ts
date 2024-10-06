"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export async function getToken() {
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
  const streamApiSecret = process.env.STREAM_VIDEO_API;

  if (!streamApiKey || !streamApiSecret) {
    throw new Error("Stream API key or secret not set");
  }

  const user = await currentUser();

  console.log("Generating token for user: ", user?.id);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp: expirationTime,
    iat: issuedAt,
  });

  console.log("Successfully generated token: ", token);

  return token;
}

export async function getUserIds(emailAddresses: string[]) {
  const response = await clerkClient.users.getUserList({
    emailAddress: emailAddresses,
  });

  return response.data.map((user) => user.id);
}
