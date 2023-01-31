import {Rules} from "../model/rules";
import RadioGroup from "./RadioGroup";
import {Side} from "../model/types";
import {ConnectionType} from "./ConnectionSetup";
import {useState} from "react";
import {AnaModifier} from "../rules/anarchy/enums";

type Props = {
    setRules: (rules: Rules, partnerRules: Rules) => void,
    connectionType: ConnectionType,
}

enum Preset {
    Std = "std",
    Anarchy = "ana",
}

export default function GameSetup(props: Props) {
    const [side, setSide] = useState<Side | undefined>(undefined);
    const [preset, setPreset] = useState(Preset.Std);

    function getRulesFromPreset(preset: Preset): Rules {
        switch(preset) {
            case Preset.Std:
                return {
                    titleText: "it's completely normal",
                    description: "This is local chess with the normal chess rules.\n" +
                        "Detecting checkmate is left as an exercise to the players.",
                    playableSides: side ? [side] : [Side.White, Side.Black],
                    baseRuleSet: "std",
                    modifiers: [],
                };
            case Preset.Anarchy:
                return {
                    titleText: "it's mostly normal",
                    description: "This is local chess with the normal chess rules.\n" +
                        "And also some other ones.",
                    playableSides: side ? [side] : [Side.White, Side.Black],
                    baseRuleSet: "std",
                    modifiers: [AnaModifier.AddKnook],
                };
        }
    }

    return (
        <>
            <h2>Setup</h2>
            <form>
                <RadioGroup name={"preset"} value={preset} onChange={setPreset} items={[
                    {id: Preset.Std, label: "Completely normal"},
                    {id: Preset.Anarchy, label: "Anarchy"},
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
                const myRules = getRulesFromPreset(preset);
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