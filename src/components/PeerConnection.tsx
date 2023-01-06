import {useEffect, useState} from "react";
import TextField from "./TextField";

import styles from "../style/connection.module.css"
import {webrtcConfig} from "../webrtc";

type PeerConnectionProps = {
    onDataChannel: (channel: RTCDataChannel) => void,
}

export default function PeerConnection(props: PeerConnectionProps) {
    const [state] = useState(() => {
        const connection = new RTCPeerConnection(webrtcConfig);
        return {
            connection: connection,
        };
    });

    const [offer, setOffer] = useState<string | undefined>(undefined);
    const [answer, setAnswer] = useState<string | undefined>(undefined);

    const onDataChannel = props.onDataChannel;

    useEffect(() => {
        state.connection.ondatachannel = (e) => {
            onDataChannel(e.channel);
            e.channel.onmessage = (e) => {
                console.log(e.data);
            };
        };
    }, [state.connection, onDataChannel]);

    useEffect(() => {
        if (offer === undefined) {
            return;
        }
        state.connection.setRemoteDescription({
            type: "offer",
            sdp: window.atob(offer),
        })
            .then((_e) => state.connection.createAnswer())
            .then((answer) => state.connection.setLocalDescription(answer));
        state.connection.onicecandidate = (e) => {
            if (e.candidate !== null) {
                return;
            }
            if (state.connection.localDescription !== null) {
                setAnswer(window.btoa(state.connection.localDescription.sdp));
            }
        };
    }, [offer, state.connection]);

    return (
        <div className={styles.connection}>
            <p>
                <TextField name={"offer"} value={""} label={"Offer: "}
                           onEnter={setOffer} disabled={offer !== undefined}/>
            </p>
            <p className={styles.offer}><b>Answer: </b>{answer}</p>
        </div>
    );
}