import { NextApiRequest } from "next";
import {v4 as uuidv4} from "uuid"
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    
    const { content, fileUrl, memberWithProfile } = req.body;

   
    const { channelId } = req.query;

    
    const now = new Date().toISOString()

    const message = {
        content,
        fileUrl,
        channelId,
        member : memberWithProfile,
        memberId: memberWithProfile.id,
        delete: false,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now
    }

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[SOCKET-MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" }); 
  }
}