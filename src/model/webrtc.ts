import {Rules} from "./rules";
import {Result} from "./results";

export const webrtcConfig = {
    "iceServers": [{urls: "stun:stun.hosteurope.de:3478"}]
};

export enum MessageType {
    Rules,
    Move,
}

export type Message = {
    type: MessageType.Rules,
    content: {
        rules: Rules,
        partnerRules: Rules,
    },
} | {
    type: MessageType.Move,
    content: Result,
};

export function encodeMessage(message: Message) {
    return JSON.stringify(message);
}

export function decodeMessage(message: string) {
    //TODO Validation
    return JSON.parse(message) as Message;
}