import "./App.css";
import GameCanvas from "./components/GameCanvas";
import GameplayProvider from "./contexts/GameplayContext";

export default function App() {
  return (
    <GameplayProvider>
      <GameCanvas />
    </GameplayProvider>
  );
}
