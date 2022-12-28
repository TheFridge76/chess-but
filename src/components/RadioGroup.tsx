import {useState} from "react";

import styles from "../style/radiogroup.module.css"

type RadioItem = {
    id: string,
    label: string,
}

type RadioGroupProps = {
    name: string,
    value: string,
    items: RadioItem[],
}

export default function RadioGroup(props: RadioGroupProps) {
    const [value, setValue] = useState(props.value);

    return (
        <fieldset className={styles.set}>
            <div className={styles.container}>
                {props.items.map((item) =>
                    <div key={item.id}>
                        <input
                            type="radio"
                            value={item.id}
                            checked={item.id === value}
                            onChange={() => setValue(item.id)}
                        />
                        <label htmlFor={item.id}>
                            {item.label}
                        </label>
                    </div>
                )}
            </div>
        </fieldset>
    );
}