import { useEffect, useState } from "react";
import { useGameplay } from "../contexts/GameplayContext";

export default function Restart() {
    const { gameState, reset } = useGameplay();

    const [showButton, setShowButton] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        reset();
    };

    useEffect(() => {
        // Show button only when the game starts
        setShowButton(Boolean(gameState));
        setIsHovering(false);
    }, [gameState]);

    return (
        <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minHeight: 80,
        }}>
            {
                showButton &&
                <button
                    onClick={handleClick}
                    style={{
                        width: 60,
                        height: 60,
                        backgroundColor: "#00ACC1",
                        border: "none",
                        borderRadius: 12,
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        transition: "background 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                        e.preventDefault();
                        setIsHovering(true);
                    }}
                    onMouseLeave={(e) => {
                        e.preventDefault();
                        setIsHovering(false);
                    }}
                >
                    {/* 🔄 */}
                    <svg
                        width="75%"  // Increased from 60% to 75% of button size
                        height="75%"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5" // Slightly bolder stroke
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M23 4v6h-6" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                </button>
            }
            {
                showButton && isHovering &&
                <div
                    style={{
                        position: "absolute",
                        top: "70px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)", // Faded white
                        padding: "6px 12px",
                        borderRadius: 8,
                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                        whiteSpace: "nowrap",
                        opacity: (showButton && isHovering) ? 1 : 0,
                        transition: "opacity 0.2s ease-in-out",
                        pointerEvents: "none",
                    }}
                >
                    {"Restart"}
                </div>
            }
        </div>
    );

}
