import {useEffect, useState} from "react";

import styles from "../style/radiogroup.module.css"

type RadioItem<T extends string> = {
    id: T,
    label: string,
}

type RadioGroupProps<T extends string> = {
    name: string,
    value: T,
    items: RadioItem<T>[],
    onChange?: (value: T) => void,
}

export default function RadioGroup<T extends string>(props: RadioGroupProps<T>) {
    const [value, setValue] = useState(props.value);
    const onChange = props.onChange;

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value, onChange])

    return (
        <fieldset className={styles.set}>
            <div className={styles.container}>
                {props.items.map((item) =>
                    <div key={item.id}>
                        <label>
                            <input
                                type="radio"
                                value={item.id}
                                checked={item.id === value}
                                onChange={() => setValue(item.id)}
                            />
                            {item.label}
                        </label>
                    </div>
                )}
            </div>
        </fieldset>
    );
}