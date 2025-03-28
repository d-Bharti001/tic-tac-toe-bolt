export default function InfoIcon() {
    return (
        <svg
            width="80%"
            height="80%"
            viewBox="0 0 256 256"
            fill="rgb(200, 134, 50)"
            stroke="rgb(200, 134, 50)"
            strokeLinecap="round"
            filter="url(#info-shadow)"
        >
            <defs>
                <filter id="info-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="rgba(0, 0, 0, 0.5)" />
                </filter>
            </defs>

            <g transform="scale(2,2)">
                <path d="M64,30c-4.97056,0 -9,4.02944 -9,9c0,4.97056 4.02944,9 9,9c4.97056,0 9,-4.02944 9,-9c0,-4.97056 -4.02944,-9 -9,-9zM64,59c-5,0 -9,4 -9,9v24c0,5 4,9 9,9c5,0 9,-4 9,-9v-24c0,-5 -4,-9 -9,-9z" />
            </g>
        </svg>
    );
}
