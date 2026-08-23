import React from "react";
import { Music, Mic, Guitar, ListMusic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Dance",
    color: "from-pink-500 to-red-500",
    glow: "shadow-pink-500/50",
    Icon: Music,
  },
  {
    title: "Singing",
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/50",
    Icon: Mic,
  },
  {
    title: "Instrument",
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/50",
    Icon: Guitar,
  },
  {
    title: "Playlist",
    color: "from-purple-500 to-fuchsia-500",
    glow: "shadow-purple-500/50",
    Icon: ListMusic,
  },
];

function CardGrid() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 sm:px-8 lg:px-10 py-10 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {cards.map(({ title, color, glow, Icon }, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(
                title === "Playlist"
                  ? "/playlist"
                  : `/videos/${title}`
              )
            }
            className={`
              w-full
              h-[260px]
              bg-gradient-to-br ${color}
              rounded-3xl
              border border-white/10
              shadow-xl
              ${glow}
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-2xl
              relative
              overflow-hidden
              text-white
              text-center
              cursor-pointer
              flex
              flex-col
              items-center
              justify-center
              group
            `}
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Icon */}
            <div
              className="
                bg-white/10
                w-20
                h-20
                rounded-full
                flex
                items-center
                justify-center
                border
                border-white/20
                shadow-md
                mb-6
                group-hover:scale-110
                group-hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <Icon className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-extrabold tracking-wide">
              {title} Videos
            </h2>

            {/* Background Glow */}
            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-white/5
                blur-xl
                opacity-20
                group-hover:opacity-40
                transition-opacity
                duration-300
                pointer-events-none
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;