import CloseIcon from "../icons/CloseIcon";

interface CloseProps {
    handleClose: () => void;
}

export default function Close({ handleClose }: CloseProps) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
            }}
        >
            <div
                className="modal-close-button"
                role="button"
                onClick={handleClose}
                style={{
                    width: "14%",
                    maxWidth: "40px",
                    height: "auto",
                    cursor: "pointer",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CloseIcon />
            </div>
        </div>
    );
}