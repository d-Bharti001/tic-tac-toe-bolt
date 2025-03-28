import { useState } from "react";
import InfoIcon from "./icons/InfoIcon";

export default function Info() {

    const [glow, setGlow] = useState(false);

    return (
        <div
            className="info-section"
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                minHeight: 60,
            }}
        >
            <div
                className="info-button"
                onMouseEnter={(e) => {
                    e.preventDefault();
                    setGlow(true);
                }}
                onMouseLeave={(e) => {
                    e.preventDefault();
                    setGlow(false);
                }}
                style={{
                    width: "14%",
                    height: "auto",
                    aspectRatio: "1",
                    background: glow ? "rgba(255, 249, 196, 0.4)" : "transparent",
                    borderRadius: 50,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.4s ease-in-out",
                    boxShadow: "inset 0px 0px 6px rgba(0, 0, 0, 0.5)"
                }}
            >
                <InfoIcon />
            </div>
        </div>
    );
}
