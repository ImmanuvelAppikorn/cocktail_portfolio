import WineCard from "./components/home";
import ScaleContainer from "@/components/scale-container";

export default function Home() {
  return (
    <ScaleContainer minScale={0.3} designHeight={100} className="full-screen-container">
      <WineCard />
    </ScaleContainer>
  );
}
