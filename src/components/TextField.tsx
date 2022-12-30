import {useState} from "react";

type TextFieldProps = {
    name: string,
    label: string,
    value: string,
    onEnter?: (value: string) => void,
    disabled?: boolean,
}

export default function TextField(props: TextFieldProps) {
    const [value, setValue] = useState(props.value);
    const onEnter = props.onEnter;

    return (
        <>
            <label htmlFor={props.name}><b>{props.label}</b></label>
            <input name={props.name} type="text" value={value} disabled={props.disabled}
                   onChange={(e) => setValue(e.target.value)}
            />
            {onEnter
                ? <button onClick={() => onEnter(value)} disabled={props.disabled}>
                    Enter
                </button>
                : undefined}
        </>
    );
}