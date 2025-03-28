import { useEffect, useRef } from "react";
import Close from "./Close";
import Footer from "./Footer";
import Information from "./Information";

export interface InfoModalProps {
    show: boolean;
    handleClose: () => void;
}

export default function InfoModal({ show, handleClose }: InfoModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: globalThis.MouseEvent) {
            event.preventDefault();
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        }
        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [show]);

    return (
        <div
            className="info-modal-shadow-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
                opacity: show ? 1 : 0,
                pointerEvents: show ? "auto" : "none",
                transition: "opacity 0.3s ease-in-out",
            }}
        >
            <div
                className="info-modal"
                ref={modalRef}
                style={{
                    position: "fixed",
                    top: show ? "50%" : "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#e7b26d",
                    padding: "20px",
                    border: "1px solid #D68C2C",
                    borderRadius: "20px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                    width: "65vw",
                    minWidth: "200px",
                    maxWidth: "800px",
                    height: "70vh",
                    minHeight: "300px",
                    zIndex: 1000,
                    opacity: show ? 1 : 0,
                    pointerEvents: show ? "auto" : "none",
                    transition: "opacity 0.3s ease-in-out, top 0.3s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "Gill Sans, sans-serif"
                }}
            >
                <Close handleClose={handleClose} />
                <Information />
                <Footer />
            </div>
        </div>
    );
}
