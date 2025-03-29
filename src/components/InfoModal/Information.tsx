import StartGameImg from "../../assets/start-game.png";
import OldMoveImg from "../../assets/old-move.png";
import GameWinImg from "../../assets/game-win.png";

function HorizontalLine() {
    return (
        <hr
            className="horizontal-line"
            style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.5)",
                borderLeft: "none", borderRight: "none",
                borderBottom: "none",
                width: "60%",
                margin: "0px"
            }}
        />
    );
}

export default function Information() {
    return (
        <div
            className="game-information"
            style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                alignItems: "center",
            }}
        >
            <HorizontalLine />
            <div
                className="scrollable-game-information"
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    alignItems: "center",
                    fontSize: "1.1em",
                }}
            >
                <p>An extended version of the classic Tic-Tac-Toe</p>
                <p>You start with "X".&nbsp;Your opponent is an automated player.</p>
                <img src={StartGameImg} alt="Start Game" style={{ maxWidth: "60%" }} />
                <p>Maximum 3 symbols of a kind can be present at a time.&nbsp;Your oldest move gets reverted to maintain this count.</p>
                <img src={OldMoveImg} alt="Old Move" style={{ maxWidth: "100%" }} />
                <p>The game continues till someone wins.</p>
                <img src={GameWinImg} alt="Game Win" style={{ maxWidth: "60%" }} />
                <br />
            </div>
            <HorizontalLine />
        </div>
    );
}