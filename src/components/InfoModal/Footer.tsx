import LinkArrow from "../icons/LinkArrow";

export default function Footer() {
    return (
        <div className="modal-footer">
            <p style={{ fontSize: "1.2em" }}>
                Tic Tac Toe Bolt
                <span style={{ textShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}> ⚡️ </span>
                <a
                    href="https://github.com/d-Bharti001/tic-tac-toe-bolt"
                    target="_blank"
                >
                    Github <LinkArrow />
                </a>
            </p>
        </div>
    );
}