"use client";

import { useState } from "react";
import Image from "next/image";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import type { CreativeEffectOptions } from "swiper/types";
import { Cover2HeroSampleVideo } from "@/components/home/design-2/cover-2-hero-sample-video";
import { useOmsKvDim } from "@/components/home/design-2/cover-2-oms-kv-dim";
import { STORY_SOCIAL, StorySocialIcon } from "@/components/home/design-2/story-section";

const OMS_SOCIAL = [...STORY_SOCIAL].reverse();
import "swiper/css";
import "swiper/css/effect-creative";

/** greatpretender.jp → monogatari-series.com/oms `top.js` (#js-kvSwiper) */
const OMS_KV_CREATIVE: CreativeEffectOptions = {
  limitProgress: 2,
  shadowPerProgress: false,
  prev: {
    translate: ["-108.5%", "37.5%", 0],
    opacity: 1,
    scale: 1,
  },
  next: {
    translate: ["112.11%", "-37.5%", 0],
    opacity: 1,
    scale: 1,
  },
};

type Cover2OmsKvProps = {
  slides: string[];
  slideEvery?: number;
};

export function Cover2OmsKv({ slides, slideEvery = 0 }: Cover2OmsKvProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const canLoop = slides.length > 1;
  const kvDim = useOmsKvDim();

  return (
    <div className="cover-2-hero__oms" aria-label="Portada ilustrada">
      <div className="cover-2-hero__oms-stage">
        <Swiper
          className="cover-2-hero__oms-swiper"
          modules={[EffectCreative, Autoplay]}
          effect="creative"
          creativeEffect={OMS_KV_CREATIVE}
          speed={800}
          slidesPerView={1}
          watchSlidesProgress
          loop={canLoop}
          onSwiper={(instance) => {
            setSwiper(instance);
            kvDim.bindKvSwiper(instance);
          }}
          onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
          onTouchStart={() => kvDim.startKvDimLoop()}
          onTouchEnd={() => kvDim.onKvTouchEnd()}
          onSlideChangeTransitionStart={() => kvDim.beginKvDimTransition()}
          onSlideChangeTransitionEnd={() => kvDim.endKvDimTransition()}
          onSlideResetTransitionStart={() => kvDim.beginKvDimTransition()}
          onSlideResetTransitionEnd={() => kvDim.endKvDimTransition()}
          autoplay={
            slideEvery > 0
              ? {
                  delay: slideEvery * 1000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }
              : false
          }
        >
          {slides.map((src) => (
            <SwiperSlide key={src} className="cover-2-hero__oms-swiper-slide">
              <Image
                src={src}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 700px) 72vw, 42vw"
                className="cover-2-hero__oms-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="cover-2-hero__oms-rail">
        <Cover2HeroSampleVideo />
        {canLoop ? (
          <ul className="cover-2-hero__oms-switch">
            {slides.map((src, index) => (
              <li key={`thumb-${src}`}>
                <button
                  type="button"
                  className={index === activeIndex ? "is-active" : undefined}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => swiper?.slideToLoop(index)}
                >
                  <Image src={src} alt="" fill unoptimized sizes="80px" className="cover-2-hero__oms-thumb" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="cover-2-hero__oms-social-wrap">
          <nav className="cover-2-hero__oms-social" aria-label="Redes">
            {OMS_SOCIAL.map((red) => (
              <a key={red.id} href={red.href} target="_blank" rel="noopener noreferrer" aria-label={red.label}>
                <StorySocialIcon id={red.id} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
