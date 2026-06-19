import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard.jsx";

export default function ProductSlider({ products, sliderId, autoplay = false }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1.08}
        speed={650}
        navigation={{
          nextEl: `.${sliderId}-next`,
          prevEl: `.${sliderId}-prev`,
        }}
        pagination={{ clickable: true }}
        autoplay={autoplay ? { delay: 2800, disableOnInteraction: false } : false}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          900: { slidesPerView: 3 },
          1180: { slidesPerView: 4 },
        }}
        className="product-swiper pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute -top-16 right-0 hidden gap-2 md:flex">
        <button className={`${sliderId}-prev focus-ring grid h-10 w-10 place-items-center border border-amber-200 bg-white text-stone-700 transition hover:border-rosewood hover:text-rosewood hover:shadow-[0_10px_24px_rgba(126,88,24,0.12)]`} type="button" aria-label="Previous products">
          <ArrowLeft size={18} />
        </button>
        <button className={`${sliderId}-next focus-ring grid h-10 w-10 place-items-center border border-amber-200 bg-white text-stone-700 transition hover:border-rosewood hover:text-rosewood hover:shadow-[0_10px_24px_rgba(126,88,24,0.12)]`} type="button" aria-label="Next products">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
