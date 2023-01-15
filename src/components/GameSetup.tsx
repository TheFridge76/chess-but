import {Rules} from "../model/rules";
import RadioGroup from "./RadioGroup";
import {Side} from "../model/types";

type Props = {
    setRules: (rules: Rules) => void,
}

export default function GameSetup(props: Props) {
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
                    "Detecting checkmate is left as an exercise to the players.",
                playableSides: [Side.White, Side.Black],
            })}>Ready</button>
        </>
    );
}