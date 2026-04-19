import React from "react";
import { Star, MapPin } from "lucide-react";
import Reveal from "../ui/Reveal";

const suggestions = [
  {
    city: "Paris",
    desc: "The city of light awaits your discovery.",
    imgUrl:
      "https://images.unsplash.com/photo-1559126765-6dcd7f5f211d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxzZWFyY2h8M3x8cGFyaXMlMjBlaWZmZWwlMjB0b3dlcnx8MHx8fA&ixlib=rb-1.2.1&q=80&w=1080",
    rating: 4.9,
  },
  {
    city: "Rome",
    desc: "Eternal wonders and world-class pasta.",
    imgUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
  },
  {
    city: "Tokyo",
    desc: "Where ancient tradition meets the future.",
    imgUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
    rating: 5.0,
  },
];

export default function SuggestionsGrid() {
  return (
    <div className="space-y-8">
      <Reveal animation="reveal" className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Trending Destinations
        </h2>
        <button className="text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:underline">
          Explore More
        </button>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {suggestions.map((item, idx) => (
          <Reveal key={idx} animation="reveal" delay={idx * 0.1}>
            <div className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 dark:shadow-black/50 cursor-pointer">
              <img
                src={item.imgUrl}
                alt={item.city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Rating Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">
                    {item.rating}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-1 text-cyan-400 mb-2">
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Explore
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {item.city}
                </h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
