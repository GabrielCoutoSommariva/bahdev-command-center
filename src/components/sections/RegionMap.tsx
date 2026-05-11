import { useEffect, useState } from "react";
import bahdevRegionMap from "@/assets/bahdev_region_map.png";
import bahdevGramadoStand from "@/assets/bahdev-gramado-stand.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";

const newsItems = [
  {
    title: "Onde a Bahdev já chegou",
    description:
      "A Bahdev já está presente em diferentes regiões, levando tecnologia, dados e automação para transformar operações em todo o Brasil.",
    image: bahdevRegionMap,
    alt: "Mapa das regiões onde a Bahdev já chegou",
  },
  {
    title: "Bahdev no estande em Gramado",
    description:
      "Estivemos em Gramado falando sobre o mercado de cooperativas e associações no Brasil e mostrando oportunidades para crescer com mais inteligência.",
    image: bahdevGramadoStand,
    alt: "Estande em Gramado com apresentação sobre associações e cooperativas",
  },
];

const RegionMap = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());

    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  return (
    <SectionWrapper className="bg-muted/30" id="onde-chegou">

      <AnimatedBlock>
        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="mx-auto max-w-5xl">
          <CarouselContent>
            {newsItems.map((item) => (
              <CarouselItem key={item.title}>
                <article className="grid overflow-hidden rounded-lg border border-border bg-card shadow-product md:grid-cols-[0.92fr_1.08fr]">
                  <div className="flex min-h-[300px] flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
                    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      Em destaque
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative min-h-[260px] bg-muted md:min-h-[420px]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 top-auto bottom-3 translate-y-0 border-white/70 bg-white/90 text-foreground shadow-card hover:bg-white sm:left-4" />
          <CarouselNext className="right-3 top-auto bottom-3 translate-y-0 border-white/70 bg-white/90 text-foreground shadow-card hover:bg-white sm:right-4" />
        </Carousel>

        <div className="mt-5 flex justify-center gap-2" aria-label="Slides do carrossel de notícias">
          {newsItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`h-2.5 rounded-full transition-all ${
                current === index ? "w-8 bg-primary" : "w-2.5 bg-primary/25"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Ir para ${item.title}`}
              aria-current={current === index ? "true" : undefined}
            />
          ))}
        </div>
      </AnimatedBlock>
    </SectionWrapper>
  );
};

export default RegionMap;
