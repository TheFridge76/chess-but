import {Rules} from "../model/rules";
import RadioGroup from "./RadioGroup";
import {Side} from "../model/types";
import {ConnectionType} from "./ConnectionSetup";
import {useState} from "react";

type Props = {
    setRules: (rules: Rules, partnerRules: Rules) => void,
    connectionType: ConnectionType,
}

export default function GameSetup(props: Props) {
    const [side, setSide] = useState<Side | undefined>(undefined);

    return (
        <>
            <h2>Setup</h2>
            <form>
                <RadioGroup name={"preset"} value={"std"} items={[
                    {id: "std", label: "Completely normal"},
                    {id: "anarchy", label: "Anarchy"},
                ]}/>
                {
                    props.connectionType === ConnectionType.Local
                        ? null
                        : <>
                            <h3>Choose your side</h3>
                            <RadioGroup name={"side"} value={Side.White} onChange={setSide} items={[
                                {id: Side.White, label: "White"},
                                {id: Side.Black, label: "Black"},
                            ]}/>
                        </>
                }
            </form>
            <button onClick={() => {
                const myRules: Rules = {
                    titleText: "it's completely normal",
                    description: "This is local chess with the normal chess rules.\n" +
                        "Detecting checkmate is left as an exercise to the players.",
                    playableSides: side ? [side] : [Side.White, Side.Black],
                    baseRuleSet: "std",
                    modifiers: ["ana::addKnook"],
                };
                if (props.connectionType !== ConnectionType.Local) {
                    const yourRules = {...myRules};
                    switch (side) {
                        case Side.White:
                            yourRules.playableSides = [Side.Black];
                            break;
                        case Side.Black:
                            yourRules.playableSides = [Side.White];
                            break;
                    }
                    props.setRules(myRules, yourRules);
                } else {
                    props.setRules(myRules, myRules);
                }
            }}>Ready
            </button>
        </>
    );
}