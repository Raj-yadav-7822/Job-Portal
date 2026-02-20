import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Science",
  "UI UX Designer",
  "DevOps Engineer",
  "Mobile App Developer",
];

const CategoryCarousel = () => {
  return (
    <div className="max-w-6xl mx-auto my-24 px-4">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Explore Jobs by <span className="text-emerald-600">Category</span>
      </h2>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="group cursor-pointer">
                <div className="px-6 py-4 text-center rounded-xl border border-slate-200 bg-white shadow-sm
                                hover:shadow-md hover:border-emerald-500 transition-all duration-300">
                  <p className="font-medium text-slate-700 group-hover:text-emerald-600">
                    {cat}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
