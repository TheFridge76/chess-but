import {useEffect, useState} from "react";
import TextField from "./TextField";

import styles from "../style/connection.module.css"
import {webrtcConfig} from "../webrtc";

export default function HostConnection() {
    const [state] = useState(() => {
        const connection = new RTCPeerConnection(webrtcConfig);
        const dataChannel = connection.createDataChannel("results");
        dataChannel.onopen = (_e) => {
        };
        dataChannel.onmessage = (e) => {
            console.log(e.data);
        };
        return {
            connection: connection,
            dataChannel: dataChannel,
        };
    });

    const [offer, setOffer] = useState("");
    const [answer, setAnswer] = useState<string | undefined>(undefined);

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
            <p className={styles.offer}><b>Offer: </b>{offer}</p>
            <p>
                <TextField name={"answer"} value={""} label={"Answer: "}
                           onEnter={setAnswer} disabled={answer !== undefined}/>
            </p>
        </div>
    );
}