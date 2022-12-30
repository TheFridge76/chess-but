import {useEffect, useState} from "react";
import TextField from "./TextField";

import styles from "../style/connection.module.css"

export default function HostConnection() {
    const [state, _setState] = useState(() => {
        const connection = new RTCPeerConnection();
        const dataChannel = connection.createDataChannel("results");
        dataChannel.onopen = (e) => {
            console.log("Channel opened", e);
            dataChannel.send("Test");
        };
        dataChannel.onmessage = (e) => {
            console.log(e);
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
            .then((offer) => {
                return state.connection.setLocalDescription(offer);
            });
    }, []);

    useEffect(() => {
        if (answer === undefined) {
            return;
        }
        state.connection.setRemoteDescription({
            type: "answer",
            sdp: window.atob(answer),
        }).then((e) => {
            console.log("Yay?", e);
        }).catch((e) => {
            console.log("Nay?", e);
        });
    }, [answer]);

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