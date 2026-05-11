import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import bahdevRegionMap from "@/assets/bahdev_region_map.png";

const RegionMap = () => (
  <SectionWrapper className="bg-muted/30" id="onde-chegou">
    <AnimatedBlock className="text-center mb-8">
      <p className="text-caption font-semibold mb-2 uppercase tracking-wider opacity-60">
        Regiões atendidas
      </p>
      <h2 className="text-section text-foreground">
        Onde a bahdev já chegou
      </h2>
      <p className="text-body text-muted-foreground max-w-2xl mx-auto mt-3">
        Veja a presença da Bahdev em diferentes regiões com nosso mapa de atuação.
      </p>
    </AnimatedBlock>

    <AnimatedBlock>
      <div className="rounded-[2rem] overflow-hidden border border-muted/10 shadow-card">
        <img
          src={bahdevRegionMap}
          alt="Mapa das regiões onde a bahdev já chegou"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </AnimatedBlock>
  </SectionWrapper>
);

export default RegionMap;
