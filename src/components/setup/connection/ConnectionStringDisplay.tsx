import styles from "../../../style/connection.module.css";

type Props = {
    label: string,
    content: string,
}

export default function ConnectionStringDisplay(props: Props) {
    function copyToClipboard() {
        navigator.clipboard.writeText(props.content).catch(() => {
            console.log(`Something went wrong: {e}`);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.label}><b>{props.label}</b></div>
            <div className={styles.offer}>{props.content}</div>
            <button onClick={copyToClipboard}>Copy</button>
        </div>
    );
}
