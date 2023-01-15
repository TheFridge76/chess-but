import {useEffect, useState} from "react";
import TextField from "./TextField";

import styles from "../style/connection.module.css"
import {webrtcConfig} from "../webrtc";
import ConnectionStringDisplay from "./ConnectionStringDisplay";

type HostConnectionProps = {
    onDataChannel: (channel: RTCDataChannel) => void,
}

export default function HostConnection(props: HostConnectionProps) {
    const [state] = useState(() => {
        const connection = new RTCPeerConnection(webrtcConfig);
        const dataChannel = connection.createDataChannel("results");
        return {
            connection: connection,
            dataChannel: dataChannel,
        };
    });

    const [offer, setOffer] = useState("");
    const [answer, setAnswer] = useState<string | undefined>(undefined);

    const onDataChannel = props.onDataChannel;

    useEffect(() => {
        state.dataChannel.onopen = () => {
            onDataChannel(state.dataChannel);
        };
    }, [state.dataChannel, onDataChannel]);

    useEffect(() => {
        state.connection.onicecandidate = (e) => {
            if (e.candidate !== null) {
                return;
            }
            if (state.connection.localDescription !== null) {
                setOffer(window.btoa(state.connection.localDescription.sdp));
            }
        };
        // TODO Try to get this to fire only once, even in React Strict Mode
        state.connection.createOffer()
            .then((offer) => state.connection.setLocalDescription(offer));
    }, [state.connection]);

    useEffect(() => {
        if (answer === undefined) {
            return;
        }
        state.connection.setRemoteDescription({
            type: "answer",
            sdp: window.atob(answer),
        }).then((_e) => {
            // Successful
        }).catch((_e) => {
            // Error
        });
    }, [answer, state.connection]);

    return (
        <div className={styles.connection}>
            <ConnectionStringDisplay label="Offer:" content={offer}/>
            <p>
                <TextField name={"answer"} value={""} label={"Answer: "}
                           onEnter={setAnswer} disabled={answer !== undefined}/>
            </p>
        </div>
    );
}