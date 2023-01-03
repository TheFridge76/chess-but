import {Rules} from "../model/rules";
import RadioGroup from "./RadioGroup";

type GameSetupProps = {
    setRules: (rules: Rules) => void,
}

export default function GameSetup(props: GameSetupProps) {
    return (
        <>
            <h2>Setup</h2>
            <form>
                <RadioGroup name={"preset"} value={"std"} items={[
                    {id: "std", label: "Completely normal"},
                    {id: "anarchy", label: "Anarchy"},
                ]}/>
            </form>
            <button onClick={() => props.setRules({
                titleText: "it's completely normal",
                description: "This is local chess with the normal chess rules.\n" +
                    "Detecting checkmate is left as an exercise to the players."
            })}>Ready</button>
        </>
    );
}