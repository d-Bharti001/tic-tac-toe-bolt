import { useEffect, useState } from "react";
import { useGameplay } from "../contexts/GameplayContext";
import RestartIcon from "./icons/RestartIcon";

export default function RestartButton() {
    const { gameState, reset } = useGameplay();

    const [showButton, setShowButton] = useState(false);
    const [glow, setGlow] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        reset();
    };

    useEffect(() => {
        // Show button only when the game starts
        setShowButton(Boolean(gameState));
        setGlow(false);

        if (gameState?.completed) {
            setTimeout(() => setGlow(true), 1000);
        }
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
                <div
                    className="restart-button"
                    role="button"
                    onClick={handleClick}
                    onMouseEnter={(e) => {
                        e.preventDefault();
                        setGlow(true);
                    }}
                    onMouseLeave={(e) => {
                        e.preventDefault();
                        setGlow(false);
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        background: glow ? "rgba(255, 249, 196, 0.5)" : "transparent",
                        borderRadius: 50,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.4s ease-in-out",
                        boxShadow: "inset 0px 0px 6px rgba(0, 0, 0, 0.5)"
                    }}
                >
                    <RestartIcon />
                </div>
            }
        </div>
    );

}
