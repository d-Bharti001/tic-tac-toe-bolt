export default function RestartIcon() {
    return (
        <svg
            width="60%"
            height="60%"
            viewBox="0 0 16 16"
            fill="rgb(200, 134, 50)"
            stroke="rgb(200, 134, 50)"
            filter="url(#restart-shadow)"
        >
            <defs>
                <filter id="restart-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="rgba(0, 0, 0, 0.5)" />
                </filter>
            </defs>

            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
    );
}
