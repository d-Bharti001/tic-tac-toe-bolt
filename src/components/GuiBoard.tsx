import GuiCell from "./GuiCell";

const BOARD_COLOR = "#D68C2C"; // Darker orange for the board

export default function GuiBoard() {
    return (
        <div
            className="board"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",  // Creates a 3x3 grid
                gap: "4%",
                background: BOARD_COLOR,
                padding: "5%",
                borderRadius: 20,
                position: "relative",
                width: "80%",  // Board takes 80% of GameCanvas
                maxWidth: "360px",  // Prevents excessive scaling
                height: "auto",  // Adjusts dynamically
                aspectRatio: "1",  // Ensures it's always square
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",  // Adds a shadow for depth
            }}
        >
            <GuiCell cellPosition={{ row: 0, col: 0 }} />
            <GuiCell cellPosition={{ row: 0, col: 1 }} />
            <GuiCell cellPosition={{ row: 0, col: 2 }} />
            <GuiCell cellPosition={{ row: 1, col: 0 }} />
            <GuiCell cellPosition={{ row: 1, col: 1 }} />
            <GuiCell cellPosition={{ row: 1, col: 2 }} />
            <GuiCell cellPosition={{ row: 2, col: 0 }} />
            <GuiCell cellPosition={{ row: 2, col: 1 }} />
            <GuiCell cellPosition={{ row: 2, col: 2 }} />
        </div>
    );
}
