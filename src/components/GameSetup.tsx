import {Rules} from "../model/rules";

type GameSetupProps = {
    setRules: (rules: Rules) => void,
}

export default function GameSetup(props: GameSetupProps) {
    return (
        <>
            <h2>Setup</h2>
            <button onClick={() => props.setRules({
                titleText: "it's completely normal",
                description: "This is local chess with the normal chess rules.\n" +
                    "Detecting checkmate is left as an exercise to the players."
            })}>Ready</button>
        </>
    );
}