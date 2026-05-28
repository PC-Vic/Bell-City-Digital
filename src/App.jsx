import { MotionConfig } from "framer-motion";
import Home from "./pages/Home";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Home />
    </MotionConfig>
  );
}

export default App;