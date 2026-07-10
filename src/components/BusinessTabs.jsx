"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function BusinessTabs() {
  const tabs = ["Services", "Products", "Digital Products"];

  const [activeTab, setActiveTab] = useState("Services");


  const data = {
    Services: [
      {
        id: "1",
        name: "Professional Web Design",
        description:
          "Complete website design and development services.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
        button: "Book Now",
      },
      {
        id: "2",
        name: "Residential Cleaning",
        description:
          "Professional home cleaning services.",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600",
        button: "Book Now",
      },
    ],


    Products: [
      {
        id: "3",
        name: "Office Chair",
        description:
          "Premium ergonomic office chair.",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600",
        button: "Buy Now",
      },
      {
        id: "4",
        name: "Designer Table",
        description:
          "Modern wooden office table.",
        price: 500,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600",
        button: "Buy Now",
      },
    ],


    "Digital Products": [
      {
        id: "5",
        name: "Website Template",
        description:
          "Modern React website template.",
        price: 50,
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
        button: "Download",
      },
      {
        id: "6",
        name: "UI Design Kit",
        description:
          "Complete Figma UI component library.",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600",
        button: "Download",
      },
    ],
  };


  const titles = {
    Services: "Services",
    Products: "Products",
    "Digital Products": "Digital Products",
  };


  const currentItems = data[activeTab];


  return (
    <section>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <h2 className="text-3xl font-bold">
          {titles[activeTab]}
        </h2>


        <div className="flex overflow-hidden rounded border border-zinc-200 bg-white text-xs">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-3 font-medium text-zinc-700"
            >
              {tab}

              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-rose-600"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

            </button>
          ))}

        </div>

      </div>



      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {currentItems.map((item) => (

          <article
            key={item.id}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
          >

            <div className="flex gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-36 rounded object-cover"
              />


              <div>

                <p className="text-sm font-bold">
                  {item.name}
                </p>


                <p className="mt-2 line-clamp-4 text-xs leading-5 text-zinc-600">
                  {item.description}
                </p>

              </div>

            </div>



            <div className="mt-4 flex items-center justify-between">

              <Heart size={23} className="text-zinc-600" />


              <span className="text-xl font-bold">
                ${item.price}
              </span>


              <button className="rounded bg-[#10105e] px-3 py-2 text-xs font-semibold text-white">
                {item.button}
              </button>

            </div>


          </article>

        ))}

      </div>

    </section>
  );
}