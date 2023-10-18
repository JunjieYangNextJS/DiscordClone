import {Server, Member, Profile, Channel} from "@prisma/client";
import {Server as NetServer, Socket} from "net";
import {NextApiResponse} from "next";
import {Server as SocketIOServer} from "socket.io"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & {profile: Profile})[];
};

export type ServerWithChannelsAndWithMembersWithProfiles = Server & {
    members: (Member & {profile: Profile})[];
}& {
    channels: Channel[];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}

export type IIndexable = {
    [key: string]: any;
  }