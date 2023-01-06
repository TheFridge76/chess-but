import RadioGroup from "./RadioGroup";
import {useState} from "react";

export enum ConnectionType {
    Local = "local",
    RemoteHost = "remoteHost",
    RemoteJoin = "remoteJoin",
}

const defaultType = ConnectionType.Local;

type ConnectionSetupProps = {
    onConfirm: (type: ConnectionType) => void,
}

export default function ConnectionSetup(props: ConnectionSetupProps) {
    const [type, setType] = useState<ConnectionType>(defaultType);

    return (
        <>
            <h2>How do you want to play?</h2>
            <RadioGroup name={"connectionType"} value={defaultType} items={
                [{
                    id: ConnectionType.Local,
                    label: "Play locally",
                },{
                    id: ConnectionType.RemoteHost,
                    label: "Host online game",
                },{
                    id: ConnectionType.RemoteJoin,
                    label: "Join online game",
                }]
            }
            onChange={setType}/>
            <button onClick={() => props.onConfirm(type)}>Confirm</button>
        </>
    );
}