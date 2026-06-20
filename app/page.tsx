"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

type CarColor = { name: string; hex: string; file: string };
type Car = {
  id: number;
  name: string;
  folder: string;
  type: string;
  tagline: string;
  range: string;
  power: string;
  accel: string;
  speed: string;
  battery: string;
  seats: string;
  price: string;
  accent: string;
  desc: string;
  colors: CarColor[];
};

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #06b6d4, #a78bfa, #86efac)",
      }}
      className="fixed top-0 left-0 right-0 h-1 z-50"
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Models", "Technology", "Showrooms", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-1 left-0 right-0 z-40 flex justify-between items-center px-4 md:px-10 py-3 md:py-4"
      style={{
        background: scrolled ? "rgba(10,15,35,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(6,182,212,0.15)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src="/BYDLogo/BYD.png"
          alt="BYD"
          className="h-9 md:h-12 w-auto object-contain"
        />
      </motion.div>

      <div className="hidden md:flex gap-10">
        {links.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.3 }}
            whileHover={{ color: "#06b6d4", y: -2 }}
            className="text-gray-300 text-sm font-medium tracking-widest uppercase cursor-pointer transition-colors"
          >
            {link}
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <motion.a
          href="#contact"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(6,182,212,0.4)",
          }}
          className="hidden sm:inline-block px-4 py-2 md:px-6 md:py-2 rounded-full text-white text-xs md:text-sm font-bold cursor-pointer whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #06b6d4, #a78bfa)" }}
        >
          Book Test Drive
        </motion.a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block h-0.5 w-full bg-white rounded"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block h-0.5 w-full bg-white rounded"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block h-0.5 w-full bg-white rounded"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 flex flex-col gap-1 px-4 py-4"
            style={{
              background: "rgba(10,15,35,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(6,182,212,0.15)",
            }}
          >
            {links.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                whileHover={{ x: 6, color: "#06b6d4" }}
                className="text-gray-300 text-sm font-medium tracking-widest uppercase py-3 border-b border-white/5 block"
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              whileHover={{ scale: 1.02 }}
              className="mt-3 px-6 py-3 rounded-full text-white text-sm font-bold text-center block"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a78bfa)",
              }}
            >
              Book Test Drive
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen relative flex items-center overflow-hidden py-24 md:py-0">
      <div className="absolute inset-0 z-0">
        <img
          src="/Cars/Seal/SpaceBlack.png"
          alt="BYD Seal"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(5,10,30,0.92) 40%, rgba(10,15,40,0.7) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-60 h-60 md:w-96 md:h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/3 w-52 h-52 md:w-80 md:h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #a78bfa, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-black text-white leading-none mb-4"
          style={{
            fontSize: "clamp(3.5rem, 15vw, 12rem)",
            textShadow: "0 0 80px rgba(6,182,212,0.4)",
          }}
        >
          BYD
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-3xl font-light mb-4 md:mb-6 tracking-[0.2em]"
          style={{ color: "#06b6d4" }}
        >
          Electric Future ⚡
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed max-w-lg"
        >
          World&apos;s #1 electric vehicle manufacturer. Cutting-edge technology
          meets breathtaking design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 md:gap-4 flex-wrap"
        >
          <motion.a
            href="#models"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(6,182,212,0.5)",
            }}
            className="px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-bold text-sm md:text-lg inline-block cursor-pointer"
            style={{ background: "linear-gradient(135deg, #06b6d4, #a78bfa)" }}
          >
            Explore Models ↓
          </motion.a>
          <motion.a
            href="#showrooms"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg text-white inline-block cursor-pointer"
            style={{ border: "2px solid rgba(6,182,212,0.4)" }}
          >
            Find Showroom 📍
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-6 md:gap-10 mt-10 md:mt-14 flex-wrap"
        >
          {[
            ["#1", "EV Worldwide"],
            ["70+", "Countries"],
            ["5M+", "Sold 2023"],
            ["30yr", "Innovation"],
          ].map(([n, l]) => (
            <div key={l}>
              <div
                className="text-xl md:text-2xl font-black"
                style={{ color: "#06b6d4" }}
              >
                {n}
              </div>
              <div className="text-xs text-gray-500 tracking-widest uppercase">
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 rounded-full"
            style={{ background: "#06b6d4" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

const oceanCars: Car[] = [
  {
    id: 1,
    name: "BYD Seal",
    folder: "Seal",
    type: "Sport Sedan",
    tagline: "Born to Perform",
    range: "570 km",
    power: "523 hp",
    accel: "3.8s",
    speed: "180 km/h",
    battery: "82.5 kWh",
    seats: "5",
    price: "PKR 8,50,00,000",
    accent: "#06b6d4",
    desc: "The ultimate sports sedan with lightning-fast acceleration, premium interior, and revolutionary Blade Battery technology.",
    colors: [
      { name: "Atlantis Grey", hex: "#6b7280", file: "AtlantisGrey" },
      { name: "Ice Blue", hex: "#a5d8ff", file: "IceBlue" },
      { name: "Indigo Grey", hex: "#4b5563", file: "IndigoGrey" },
      { name: "Polar White", hex: "#f8fafc", file: "PolarWhite" },
      { name: "Shadow Green", hex: "#14532d", file: "ShadowGreen" },
      { name: "Space Black", hex: "#0a0a1a", file: "SpaceBlack" },
    ],
  },
  {
    id: 2,
    name: "BYD Seal U DM-i",
    folder: "SealUDMi",
    type: "Mid-Size SUV Hybrid",
    tagline: "Versatile Power",
    range: "100km EV + 1000km",
    power: "218 hp",
    accel: "7.9s",
    speed: "180 km/h",
    battery: "18.3 kWh + Fuel",
    seats: "5",
    price: "PKR 8,00,00,000",
    accent: "#fdba74",
    desc: "Versatile plug-in hybrid SUV offering exceptional range, spacious interior, and smooth dual-power performance.",
    colors: [
      { name: "Emperor Red", hex: "#dc2626", file: "EmperorRed" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Delos Grey", hex: "#4b5563", file: "DelosGray" },
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Boundless Sea Blue", hex: "#0ea5e9", file: "BoundlessSeaBlue" },
      { name: "Quartz Black", hex: "#1a1a2e", file: "QuartzBlack" },
    ],
  },
  {
    id: 3,
    name: "BYD Sealion 5",
    folder: "Sealion5",
    type: "Compact SUV PHEV",
    tagline: "Adventure Ready",
    range: "80km EV + 900km",
    power: "190 hp",
    accel: "8.5s",
    speed: "175 km/h",
    battery: "18.3 kWh + Fuel",
    seats: "5",
    price: "PKR 6,80,00,000",
    accent: "#f87171",
    desc: "Compact hybrid SUV built for everyday adventures with confident handling and efficient dual power.",
    colors: [
      { name: "Emperor Red", hex: "#dc2626", file: "EmperorRed" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Delos Grey", hex: "#4b5563", file: "DelosGray" },
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Quartz Black", hex: "#1a1a2e", file: "QuartzBlack" },
    ],
  },
  {
    id: 4,
    name: "BYD Sealion 7",
    folder: "Sealion7",
    type: "Mid-Size SUV",
    tagline: "Bold & Electric",
    range: "482 km",
    power: "312 hp",
    accel: "4.5s",
    speed: "215 km/h",
    battery: "82.5 kWh",
    seats: "5",
    price: "PKR 11,00,00,000",
    accent: "#c084fc",
    desc: "A bold all-electric SUV with sporty performance, futuristic design, and long-range Blade Battery.",
    colors: [
      { name: "Emperor Red", hex: "#dc2626", file: "EmperorRed" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Delos Grey", hex: "#4b5563", file: "DelosGray" },
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Boundless Sea Blue", hex: "#0ea5e9", file: "BoundlessSeaBlue" },
      { name: "Quartz Black", hex: "#1a1a2e", file: "QuartzBlack" },
    ],
  },
  {
    id: 5,
    name: "BYD Atto 3",
    folder: "Atto3",
    type: "Compact SUV",
    tagline: "Urban Explorer",
    range: "480 km",
    power: "204 hp",
    accel: "7.3s",
    speed: "160 km/h",
    battery: "60.5 kWh",
    seats: "5",
    price: "PKR 6,50,00,000",
    accent: "#86efac",
    desc: "Perfect city companion with spacious interior, advanced safety features, and playful design language.",
    colors: [
      { name: "Ski White", hex: "#f8fafc", file: "SkiWhite" },
      { name: "Harbour Grey", hex: "#9ca3af", file: "HarbourGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Surf Blue", hex: "#38bdf8", file: "SurfBlue" },
      { name: "Parkour Red", hex: "#dc2626", file: "ParkourRed" },
    ],
  },
  {
    id: 6,
    name: "BYD Atto 3 EVO",
    folder: "Atto3EVO",
    type: "Compact SUV (Updated)",
    tagline: "Evolved Explorer",
    range: "500 km",
    power: "201 hp",
    accel: "7.0s",
    speed: "160 km/h",
    battery: "64 kWh",
    seats: "5",
    price: "PKR 7,00,00,000",
    accent: "#67e8f9",
    desc: "The next evolution of the Atto 3, with refined styling, improved range, and upgraded tech features.",
    colors: [
      { name: "Ski White", hex: "#f8fafc", file: "SkiWhite" },
      { name: "Harbour Grey", hex: "#9ca3af", file: "HarbourGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Surf Blue", hex: "#38bdf8", file: "SurfBlue" },
      { name: "Parkour Red", hex: "#dc2626", file: "ParkourRed" },
    ],
  },
  {
    id: 7,
    name: "BYD Atto 2",
    folder: "Atto2",
    type: "Subcompact SUV",
    tagline: "Smart City Crossover",
    range: "400 km",
    power: "174 hp",
    accel: "8.1s",
    speed: "150 km/h",
    battery: "45.1 kWh",
    seats: "5",
    price: "PKR 5,00,00,000",
    accent: "#fde68a",
    desc: "A compact, smart crossover designed for city living with efficient electric performance.",
    colors: [
      { name: "Ski White", hex: "#f8fafc", file: "SkiWhite" },
      { name: "Harbour Grey", hex: "#9ca3af", file: "HarbourGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Surf Blue", hex: "#38bdf8", file: "SurfBlue" },
      { name: "Parkour Red", hex: "#dc2626", file: "ParkourRed" },
    ],
  },
  {
    id: 8,
    name: "BYD Dolphin",
    folder: "Dolphin",
    type: "Hatchback",
    tagline: "Fun & Efficient",
    range: "405 km",
    power: "178 hp",
    accel: "7.0s",
    speed: "160 km/h",
    battery: "60.5 kWh",
    seats: "5",
    price: "PKR 4,50,00,000",
    accent: "#67e8f9",
    desc: "Playful and efficient hatchback perfect for city driving with vibrant colors and smart technology.",
    colors: [
      { name: "Apricity White", hex: "#f5f5f0", file: "ApricityWhite" },
      { name: "Atlantis Grey", hex: "#6b7280", file: "AtlantisGrey" },
      { name: "Coral Pink", hex: "#f9a8d4", file: "CoralPink" },
      { name: "Taro Purple", hex: "#c084fc", file: "TaroPurple" },
      { name: "Lime Green", hex: "#a3e635", file: "LimeGreen" },
      {
        name: "Coral Pink / Urban Grey",
        hex: "#f9a8d4",
        file: "DualToneCoralPinkAndUrbanGrey",
      },
      {
        name: "Skiing White / Urban Grey",
        hex: "#f8fafc",
        file: "DualToneSkiingWhiteAndUrbanGrey",
      },
      {
        name: "Surfing Blue / Urban Grey",
        hex: "#38bdf8",
        file: "DualToneSurfingBlueAndUrbanGrey",
      },
    ],
  },
  {
    id: 9,
    name: "BYD Dolphin Surf",
    folder: "DolphinSurf",
    type: "Compact Hatchback",
    tagline: "Ride the Wave",
    range: "320 km",
    power: "95 hp",
    accel: "12.7s",
    speed: "130 km/h",
    battery: "44.9 kWh",
    seats: "5",
    price: "PKR 3,50,00,000",
    accent: "#86efac",
    desc: "Compact and stylish hatchback with vibrant dual-tone color options, perfect for everyday city rides.",
    colors: [
      { name: "Apricity White", hex: "#f5f5f0", file: "ApricityWhite" },
      { name: "Atlantis Grey", hex: "#6b7280", file: "AtlantisGrey" },
      { name: "Coral Pink", hex: "#f9a8d4", file: "CoralPink" },
      { name: "Taro Purple", hex: "#c084fc", file: "TaroPurple" },
      {
        name: "Coral Pink / Urban Grey",
        hex: "#f9a8d4",
        file: "DualToneCoralPinkAndUrbanGrey",
      },
      {
        name: "Skiing White / Urban Grey",
        hex: "#f8fafc",
        file: "DualToneSkiingWhiteAndUrbanGrey",
      },
      {
        name: "Surfing Blue / Urban Grey",
        hex: "#38bdf8",
        file: "DualToneSurfingBlueAndUrbanGrey",
      },
    ],
  },
  {
    id: 10,
    name: "BYD Seagull",
    folder: "DolphinMiniSeagull",
    type: "Budget City Car",
    tagline: "Smart & Affordable",
    range: "405 km",
    power: "74 hp",
    accel: "12.9s",
    speed: "130 km/h",
    battery: "38.8 kWh",
    seats: "5",
    price: "PKR 2,50,00,000",
    accent: "#fde68a",
    desc: "Most affordable BYD perfect for first-time EV buyers with smart features and stylish design.",
    colors: [
      { name: "Apricity White", hex: "#f5f5f0", file: "ApricityWhite" },
      { name: "Atlantis Grey", hex: "#6b7280", file: "AtlantisGrey" },
      { name: "Coral Pink", hex: "#f9a8d4", file: "CoralPink" },
      { name: "Taro Purple", hex: "#c084fc", file: "TaroPurple" },
      { name: "Lime Green", hex: "#a3e635", file: "LimeGreen" },
    ],
  },
  {
    id: 11,
    name: "BYD Seal 5 DM-i",
    folder: "Seal5DMi",
    type: "Hybrid Sedan",
    tagline: "Efficient Performance",
    range: "100km EV + 1200km",
    power: "218 hp",
    accel: "7.9s",
    speed: "175 km/h",
    battery: "18.3 kWh + Fuel",
    seats: "5",
    price: "PKR 5,50,00,000",
    accent: "#7dd3fc",
    desc: "A smart hybrid sedan combining electric efficiency with petrol range for worry-free long drives.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Delos Grey", hex: "#4b5563", file: "DelosGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Sage Green", hex: "#86efac", file: "SageGreen" },
    ],
  },
  {
    id: 12,
    name: "BYD Seal 05 DM-i",
    folder: "Seal05DMi",
    type: "Compact Hybrid Sedan",
    tagline: "City Smart Hybrid",
    range: "80km EV + 1000km",
    power: "195 hp",
    accel: "8.5s",
    speed: "170 km/h",
    battery: "15.8 kWh + Fuel",
    seats: "5",
    price: "PKR 4,80,00,000",
    accent: "#a78bfa",
    desc: "A compact hybrid sedan offering great fuel economy with an electric-first driving experience.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Delos Grey", hex: "#4b5563", file: "DelosGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Sage Green", hex: "#86efac", file: "SageGreen" },
    ],
  },
  {
    id: 13,
    name: "BYD Seal 6 DM-i",
    folder: "Seal6DMi",
    type: "Hybrid Sedan",
    tagline: "Power Meets Efficiency",
    range: "100km EV + 1300km",
    power: "238 hp",
    accel: "7.5s",
    speed: "180 km/h",
    battery: "19.5 kWh + Fuel",
    seats: "5",
    price: "PKR 6,00,00,000",
    accent: "#fdba74",
    desc: "A refined hybrid sedan delivering strong performance and outstanding total driving range.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Sage Green", hex: "#86efac", file: "SageGreen" },
    ],
  },
  {
    id: 14,
    name: "BYD Seal 6 DM-i Touring",
    folder: "Seal6DMiTouring",
    type: "Hybrid Estate Wagon",
    tagline: "Space & Efficiency",
    range: "100km EV + 1300km",
    power: "238 hp",
    accel: "7.6s",
    speed: "180 km/h",
    battery: "19.5 kWh + Fuel",
    seats: "5",
    price: "PKR 6,50,00,000",
    accent: "#f9a8d4",
    desc: "A spacious hybrid estate wagon combining family-friendly cargo space with efficient hybrid power.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGray" },
      { name: "Delos Grey", hex: "#4b5563", file: "DelosGray" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Sage Green", hex: "#86efac", file: "SageGreen" },
    ],
  },
];

const dynastyCars: Car[] = [
  {
    id: 101,
    name: "BYD Han",
    folder: "Han",
    type: "Luxury Flagship Sedan",
    tagline: "Redefine Luxury",
    range: "610 km",
    power: "469 hp",
    accel: "3.9s",
    speed: "180 km/h",
    battery: "85.4 kWh",
    seats: "5",
    price: "PKR 12,00,00,000",
    accent: "#a78bfa",
    desc: "Flagship luxury sedan combining elegance with extraordinary performance and premium craftsmanship.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGrey" },
      { name: "Space Black", hex: "#0a0a1a", file: "SpaceBlack" },
      { name: "Emperor Red", hex: "#dc2626", file: "EmperorRed" },
      { name: "AI Jade Green", hex: "#34d399", file: "AIJadeGreen" },
    ],
  },
  {
    id: 102,
    name: "BYD Qin L",
    folder: "QinL",
    type: "Compact Sedan EV",
    tagline: "Smart Everyday Drive",
    range: "510 km",
    power: "215 hp",
    accel: "7.0s",
    speed: "175 km/h",
    battery: "65.9 kWh",
    seats: "5",
    price: "PKR 5,80,00,000",
    accent: "#7dd3fc",
    desc: "A smart compact sedan offering excellent range, sleek design, and advanced driver-assist features.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGrey" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Xuanwu Blue", hex: "#1e3a8a", file: "XuanwuBlue" },
      { name: "Runyu Jade White", hex: "#f5f5f0", file: "RunyuJadeWhite" },
    ],
  },
  {
    id: 103,
    name: "BYD Qin Plus",
    folder: "QinPlus",
    type: "Compact Hybrid Sedan",
    tagline: "Efficiency Redefined",
    range: "100km EV + 1200km",
    power: "201 hp",
    accel: "7.3s",
    speed: "175 km/h",
    battery: "15.8 kWh + Fuel",
    seats: "5",
    price: "PKR 5,20,00,000",
    accent: "#86efac",
    desc: "A practical and efficient hybrid sedan offering low running costs and a comfortable ride.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGrey" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Xuanwu Blue", hex: "#1e3a8a", file: "XuanwuBlue" },
      { name: "Runyu Jade White", hex: "#f5f5f0", file: "RunyuJadeWhite" },
    ],
  },
  {
    id: 104,
    name: "BYD Qin Max",
    folder: "QinMax",
    type: "Performance Hybrid Sedan",
    tagline: "Maximum Power",
    range: "120km EV + 1400km",
    power: "238 hp",
    accel: "5.9s",
    speed: "185 km/h",
    battery: "19.5 kWh + Fuel",
    seats: "5",
    price: "PKR 6,50,00,000",
    accent: "#f87171",
    desc: "The performance flagship of the Qin family with sharper handling and stronger acceleration.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGrey" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Xuanwu Blue", hex: "#1e3a8a", file: "XuanwuBlue" },
      { name: "Runyu Jade White", hex: "#f5f5f0", file: "RunyuJadeWhite" },
    ],
  },
  {
    id: 105,
    name: "BYD Tang",
    folder: "Tang",
    type: "Large Premium SUV",
    tagline: "Command the Road",
    range: "505 km",
    power: "604 hp",
    accel: "4.6s",
    speed: "180 km/h",
    battery: "108.8 kWh",
    seats: "7",
    price: "PKR 15,00,00,000",
    accent: "#fdba74",
    desc: "Commanding 7-seater SUV with breathtaking power, spacious interior, and advanced all-wheel drive.",
    colors: [
      { name: "Snow White Pearl", hex: "#f8fafc", file: "SnowWhitePearl" },
      { name: "Mountain Grey", hex: "#71717a", file: "MountainGrey" },
      { name: "Silver Sand Black", hex: "#18181b", file: "SilverSandBlack" },
      { name: "Emperor Red", hex: "#dc2626", file: "EmperorRed" },
    ],
  },
  {
    id: 106,
    name: "BYD Song",
    folder: "Song",
    type: "Compact SUV Hybrid",
    tagline: "Smart Family Choice",
    range: "120km EV + 1100km",
    power: "196 hp",
    accel: "7.9s",
    speed: "175 km/h",
    battery: "18.3 kWh + Fuel",
    seats: "5",
    price: "PKR 5,50,00,000",
    accent: "#67e8f9",
    desc: "A versatile family SUV balancing efficiency, comfort, and everyday practicality.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Qinghai Lake Blue", hex: "#0ea5e9", file: "QinghaiLakeBlue" },
      { name: "Emerald Green", hex: "#10b981", file: "EmeraldGreen" },
    ],
  },
  {
    id: 107,
    name: "BYD Song Pro",
    folder: "SongPro",
    type: "Mid-Size SUV Hybrid",
    tagline: "Pro Level Comfort",
    range: "130km EV + 1200km",
    power: "218 hp",
    accel: "7.5s",
    speed: "180 km/h",
    battery: "19.5 kWh + Fuel",
    seats: "5",
    price: "PKR 6,80,00,000",
    accent: "#c084fc",
    desc: "An upgraded family SUV with more power, more space, and a more premium cabin experience.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGrey" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Qinghai Lake Blue", hex: "#0ea5e9", file: "QinghaiLakeBlue" },
      { name: "Emerald Green", hex: "#10b981", file: "EmeraldGreen" },
    ],
  },
  {
    id: 108,
    name: "BYD Song Max",
    folder: "SongMax",
    type: "Large MPV SUV",
    tagline: "Maximum Space",
    range: "130km EV + 1300km",
    power: "238 hp",
    accel: "7.2s",
    speed: "180 km/h",
    battery: "21.3 kWh + Fuel",
    seats: "7",
    price: "PKR 8,50,00,000",
    accent: "#fde68a",
    desc: "A spacious 7-seater MPV-SUV hybrid perfect for large families and long journeys.",
    colors: [
      { name: "Snow White", hex: "#f8fafc", file: "SnowWhite" },
      { name: "Time Grey", hex: "#6b7280", file: "TimeGrey" },
      { name: "Cosmos Black", hex: "#1a1a2e", file: "CosmosBlack" },
      { name: "Qinghai Lake Blue", hex: "#0ea5e9", file: "QinghaiLakeBlue" },
      { name: "Emerald Green", hex: "#10b981", file: "EmeraldGreen" },
    ],
  },
  {
    id: 109,
    name: "BYD Yuan",
    folder: "Yuan",
    type: "Compact SUV",
    tagline: "Ready for Anything",
    range: "430 km",
    power: "95 hp",
    accel: "9.5s",
    speed: "130 km/h",
    battery: "50.1 kWh",
    seats: "5",
    price: "PKR 4,00,00,000",
    accent: "#86efac",
    desc: "A practical and affordable compact electric SUV built for daily commuting.",
    colors: [
      { name: "Ski White", hex: "#f8fafc", file: "SkiWhite" },
      { name: "Climbing Grey", hex: "#9ca3af", file: "ClimbingGrey" },
      { name: "Parkour Red", hex: "#dc2626", file: "ParkourRed" },
      { name: "Adventuring Green", hex: "#4ade80", file: "AdventuringGreen" },
      { name: "Surf Blue", hex: "#38bdf8", file: "SurfBlue" },
    ],
  },
  {
    id: 110,
    name: "BYD Yuan Plus",
    folder: "YuanPlus",
    type: "Compact Electric SUV",
    tagline: "Plus Performance",
    range: "480 km",
    power: "204 hp",
    accel: "7.3s",
    speed: "160 km/h",
    battery: "60.5 kWh",
    seats: "5",
    price: "PKR 6,50,00,000",
    accent: "#06b6d4",
    desc: "An upgraded version of the Yuan with extra range, power, and premium features.",
    colors: [
      { name: "Ski White", hex: "#f8fafc", file: "SkiWhite" },
      { name: "Climbing Grey", hex: "#9ca3af", file: "ClimbingGrey" },
      { name: "Parkour Red", hex: "#dc2626", file: "ParkourRed" },
      { name: "Adventuring Green", hex: "#4ade80", file: "AdventuringGreen" },
      { name: "Surf Blue", hex: "#38bdf8", file: "SurfBlue" },
    ],
  },
  {
    id: 111,
    name: "BYD Shark 6",
    folder: "Shark6Truck",
    type: "Plug-in Hybrid Pickup",
    tagline: "Conquer Everything",
    range: "100km EV + 800km",
    power: "430 hp",
    accel: "5.7s",
    speed: "180 km/h",
    battery: "29.6 kWh + Fuel",
    seats: "5",
    price: "PKR 9,50,00,000",
    accent: "#f97316",
    desc: "Unstoppable plug-in hybrid pickup with V2L power export, off-road capability, and massive power.",
    colors: [
      { name: "Blizzard White", hex: "#f1f5f9", file: "BlizzardWhite" },
      { name: "Sand Gold", hex: "#d4a574", file: "SandGold" },
      { name: "Sapphire Blue", hex: "#1d4ed8", file: "SapphireBlue" },
      { name: "Charcoal Black", hex: "#18181b", file: "CharcoalBlack" },
    ],
  },
  {
    id: 112,
    name: "BYD e7",
    folder: "ESeriesE7",
    type: "Electric Sedan",
    tagline: "Effortless Electric",
    range: "530 km",
    power: "215 hp",
    accel: "8.2s",
    speed: "175 km/h",
    battery: "71.8 kWh",
    seats: "5",
    price: "PKR 7,00,00,000",
    accent: "#7dd3fc",
    desc: "A comfortable electric sedan ideal for ride-hailing fleets and daily commuters alike.",
    colors: [
      { name: "Crystal White", hex: "#f8fafc", file: "CrystalWhite" },
      { name: "Quartz Black", hex: "#1a1a2e", file: "QuartzBlack" },
      { name: "Mineral Grey", hex: "#6b7280", file: "MineralGrey" },
    ],
  },
  {
    id: 113,
    name: "BYD e9",
    folder: "ESeriesE9",
    type: "Premium Electric MPV",
    tagline: "Executive Comfort",
    range: "460 km",
    power: "245 hp",
    accel: "8.5s",
    speed: "180 km/h",
    battery: "85.4 kWh",
    seats: "7",
    price: "PKR 13,00,00,000",
    accent: "#a78bfa",
    desc: "A premium electric MPV designed for executive travel with first-class comfort.",
    colors: [
      { name: "Crystal White", hex: "#f8fafc", file: "CrystalWhite" },
      { name: "Quartz Black", hex: "#1a1a2e", file: "QuartzBlack" },
      { name: "Mineral Grey", hex: "#6b7280", file: "MineralGrey" },
    ],
  },
  {
    id: 114,
    name: "BYD eMAX 7",
    folder: "ESeriesEMax7",
    type: "Electric MPV",
    tagline: "Family Electric Hub",
    range: "420 km",
    power: "218 hp",
    accel: "9.0s",
    speed: "170 km/h",
    battery: "70.9 kWh",
    seats: "7",
    price: "PKR 9,00,00,000",
    accent: "#f9a8d4",
    desc: "A spacious 7-seater electric MPV built for families who need room without compromise.",
    colors: [
      { name: "Crystal White", hex: "#f8fafc", file: "CrystalWhite" },
      { name: "Quartz Black", hex: "#1a1a2e", file: "QuartzBlack" },
      { name: "Mineral Grey", hex: "#6b7280", file: "MineralGrey" },
    ],
  },
];

const luxuryCars: Car[] = [
  {
    id: 201,
    name: "Denza D9",
    folder: "DenzaD9",
    type: "Luxury MPV",
    tagline: "Premium Family Travel",
    range: "190km EV + 1000km",
    power: "326 hp",
    accel: "5.9s",
    speed: "180 km/h",
    battery: "41.5 kWh + Fuel",
    seats: "7",
    price: "PKR 18,00,00,000",
    accent: "#fde68a",
    desc: "A flagship luxury MPV offering first-class comfort, advanced tech, and effortless long-distance travel.",
    colors: [
      { name: "Whales Sea Blue", hex: "#0c4a6e", file: "WhalesSeaBlue" },
      { name: "Midnight Black", hex: "#0a0a1a", file: "MidnightBlack" },
      { name: "Frost White", hex: "#f0f9ff", file: "FrostWhite" },
      { name: "Harbour Gold", hex: "#d4af37", file: "HarbourGold" },
      { name: "Meadow Green", hex: "#4ade80", file: "MeadowGreen" },
      { name: "Eclipse Grey", hex: "#52525b", file: "EclipseGrey" },
    ],
  },
  {
    id: 202,
    name: "Denza Z9",
    folder: "DenzaZ9",
    type: "Luxury Sedan",
    tagline: "Executive Excellence",
    range: "200km EV + 1100km",
    power: "435 hp",
    accel: "4.5s",
    speed: "200 km/h",
    battery: "53.1 kWh + Fuel",
    seats: "5",
    price: "PKR 22,00,00,000",
    accent: "#c084fc",
    desc: "A sophisticated executive sedan combining hybrid efficiency with luxury sedan elegance.",
    colors: [
      { name: "Whales Sea Blue", hex: "#0c4a6e", file: "WhalesSeaBlue" },
      { name: "Midnight Black", hex: "#0a0a1a", file: "MidnightBlack" },
      { name: "Frost White", hex: "#f0f9ff", file: "FrostWhite" },
      { name: "Harbour Gold", hex: "#d4af37", file: "HarbourGold" },
      { name: "Meadow Green", hex: "#4ade80", file: "MeadowGreen" },
      { name: "Eclipse Grey", hex: "#52525b", file: "EclipseGrey" },
    ],
  },
  {
    id: 203,
    name: "Denza N7",
    folder: "DenzaN7",
    type: "Luxury Electric SUV Coupe",
    tagline: "Bold Elegance",
    range: "630 km",
    power: "449 hp",
    accel: "4.4s",
    speed: "210 km/h",
    battery: "87.0 kWh",
    seats: "5",
    price: "PKR 20,00,00,000",
    accent: "#06b6d4",
    desc: "A striking coupe-SUV with cutting-edge electric performance and a head-turning silhouette.",
    colors: [
      { name: "Whales Sea Blue", hex: "#0c4a6e", file: "WhalesSeaBlue" },
      { name: "Midnight Black", hex: "#0a0a1a", file: "MidnightBlack" },
      { name: "Frost White", hex: "#f0f9ff", file: "FrostWhite" },
      { name: "Harbour Gold", hex: "#d4af37", file: "HarbourGold" },
      { name: "Meadow Green", hex: "#4ade80", file: "MeadowGreen" },
      { name: "Eclipse Grey", hex: "#52525b", file: "EclipseGrey" },
    ],
  },
  {
    id: 204,
    name: "Denza N8",
    folder: "DenzaN8",
    type: "Luxury Hybrid SUV",
    tagline: "Power & Prestige",
    range: "200km EV + 1100km",
    power: "482 hp",
    accel: "4.5s",
    speed: "190 km/h",
    battery: "41.5 kWh + Fuel",
    seats: "6",
    price: "PKR 24,00,00,000",
    accent: "#f87171",
    desc: "A powerful luxury hybrid SUV with 6-seat configuration and commanding road presence.",
    colors: [
      { name: "Whales Sea Blue", hex: "#0c4a6e", file: "WhalesSeaBlue" },
      { name: "Midnight Black", hex: "#0a0a1a", file: "MidnightBlack" },
      { name: "Frost White", hex: "#f0f9ff", file: "FrostWhite" },
      { name: "Harbour Gold", hex: "#d4af37", file: "HarbourGold" },
      { name: "Meadow Green", hex: "#4ade80", file: "MeadowGreen" },
    ],
  },
  {
    id: 205,
    name: "FangChengBao Bao 3",
    folder: "FangChengBaoBao3",
    type: "Off-Road SUV",
    tagline: "Built for Adventure",
    range: "80km EV + 900km",
    power: "215 hp",
    accel: "8.5s",
    speed: "170 km/h",
    battery: "18.3 kWh + Fuel",
    seats: "5",
    price: "PKR 8,00,00,000",
    accent: "#86efac",
    desc: "A rugged entry-level off-roader with bold styling and capable hybrid powertrain.",
    colors: [
      { name: "Storm Peak Grey", hex: "#71717a", file: "StormPeakGrey" },
      { name: "Mountain Green", hex: "#4d7c0f", file: "MountainGreen" },
      { name: "Snow Peak White", hex: "#f8fafc", file: "SnowPeakWhite" },
      { name: "Night Shadow Black", hex: "#0a0a1a", file: "NightShadowBlack" },
      { name: "Peak Gold", hex: "#d4af37", file: "PeakGold" },
    ],
  },
  {
    id: 206,
    name: "FangChengBao Bao 5",
    folder: "FangChengBaoBao5",
    type: "Rugged Off-Road SUV",
    tagline: "Conquer Terrain",
    range: "90km EV + 1000km",
    power: "391 hp",
    accel: "6.7s",
    speed: "180 km/h",
    battery: "31.8 kWh + Fuel",
    seats: "5",
    price: "PKR 13,00,00,000",
    accent: "#fdba74",
    desc: "A serious off-road SUV with a tank-like body-on-frame design and powerful hybrid system.",
    colors: [
      { name: "Storm Peak Grey", hex: "#71717a", file: "StormPeakGrey" },
      { name: "Mountain Green", hex: "#4d7c0f", file: "MountainGreen" },
      { name: "Snow Peak White", hex: "#f8fafc", file: "SnowPeakWhite" },
      { name: "Night Shadow Black", hex: "#0a0a1a", file: "NightShadowBlack" },
      { name: "Peak Gold", hex: "#d4af37", file: "PeakGold" },
    ],
  },
  {
    id: 207,
    name: "FangChengBao Bao 8",
    folder: "FangChengBaoBao8",
    type: "Premium Off-Road SUV",
    tagline: "Ultimate Explorer",
    range: "100km EV + 1100km",
    power: "500 hp",
    accel: "5.5s",
    speed: "190 km/h",
    battery: "35.5 kWh + Fuel",
    seats: "5",
    price: "PKR 18,00,00,000",
    accent: "#f9a8d4",
    desc: "The flagship off-roader of the FangChengBao lineup, blending luxury with serious capability.",
    colors: [
      { name: "Storm Peak Grey", hex: "#71717a", file: "StormPeakGrey" },
      { name: "Mountain Green", hex: "#4d7c0f", file: "MountainGreen" },
      { name: "Snow Peak White", hex: "#f8fafc", file: "SnowPeakWhite" },
      { name: "Night Shadow Black", hex: "#0a0a1a", file: "NightShadowBlack" },
      { name: "Peak Gold", hex: "#d4af37", file: "PeakGold" },
    ],
  },
  {
    id: 208,
    name: "Yangwang U8",
    folder: "YangwangU8",
    type: "Ultra Luxury Off-Road SUV",
    tagline: "Beyond Limits",
    range: "180km EV + Hybrid",
    power: "1,100 hp",
    accel: "3.6s",
    speed: "200 km/h",
    battery: "49 kWh + Fuel",
    seats: "5",
    price: "PKR 35,00,00,000",
    accent: "#14532d",
    desc: "Ultra-luxury off-road SUV with 1100hp quad-motor. Can float on water and perform tank-turns.",
    colors: [
      {
        name: "Dragon Stone Green (Gloss)",
        hex: "#14532d",
        file: "DragonStoneGlossGreen",
      },
      {
        name: "Dragon Stone Green (Matte)",
        hex: "#166534",
        file: "DragonStoneMatteGreen",
      },
      { name: "Obsidian Black", hex: "#0a0a1a", file: "ObsidianBlack" },
      { name: "Fluorite White", hex: "#f8fafc", file: "FluoriteWhite" },
      { name: "Firefly Yellow", hex: "#fde047", file: "FireflyYellow" },
    ],
  },
  {
    id: 209,
    name: "Yangwang U9",
    folder: "YangwangU9",
    type: "Electric Hypercar",
    tagline: "Pure Performance Art",
    range: "380 km",
    power: "1,287 hp",
    accel: "2.36s",
    speed: "309 km/h",
    battery: "80 kWh",
    seats: "2",
    price: "PKR 60,00,00,000",
    accent: "#fde047",
    desc: "A jaw-dropping electric hypercar with active suspension that lets it jump and dance.",
    colors: [
      { name: "Argus Black", hex: "#0a0a1a", file: "ArgusBlack" },
      { name: "Gloss Yellow", hex: "#fde047", file: "GlossYellow" },
      { name: "Satin Silver", hex: "#c0c0c0", file: "SatinSilver" },
      { name: "Electric Purple", hex: "#a855f7", file: "ElectricPurple" },
    ],
  },
];

const categories = [
  { name: "Ocean Series", icon: "🌊", cars: oceanCars, color: "#06b6d4" },
  { name: "Dynasty Series", icon: "👑", cars: dynastyCars, color: "#a78bfa" },
  {
    name: "Luxury & Specialty",
    icon: "💎",
    cars: luxuryCars,
    color: "#fde68a",
  },
];

const allCars = [...oceanCars, ...dynastyCars, ...luxuryCars];

function Models() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedCar, setSelectedCar] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const category = categories[activeCategory];
  const carList = category.cars;
  const currentCar = carList[selectedCar];
  const currentColor = currentCar.colors[selectedColor];

  const selectCategory = (i: number) => {
    setActiveCategory(i);
    setSelectedCar(0);
    setSelectedColor(0);
  };
  const selectCar = (i: number) => {
    setSelectedCar(i);
    setSelectedColor(0);
  };

  return (
    <section
      id="models"
      className="py-16 md:py-28 px-4 md:px-8"
      style={{
        background: "linear-gradient(180deg, #0a0f23, #0d1330, #0a0f23)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-10"
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "#06b6d4" }}
        >
          Complete Lineup
        </p>
        <h2 className="text-3xl md:text-6xl font-black text-white">
          Choose Your BYD
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10 px-2">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            onClick={() => selectCategory(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-lg transition-all"
            style={{
              background:
                activeCategory === i
                  ? `linear-gradient(135deg, ${cat.color}, ${cat.color}99)`
                  : "rgba(255,255,255,0.06)",
              border: `1px solid ${activeCategory === i ? cat.color : "rgba(255,255,255,0.12)"}`,
              color: activeCategory === i ? "white" : "#9ca3af",
            }}
          >
            {cat.icon} {cat.name}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-14 max-w-5xl mx-auto px-2">
        {carList.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => selectCar(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all"
            style={{
              background:
                selectedCar === i
                  ? `linear-gradient(135deg, ${c.accent}, ${c.accent}99)`
                  : "rgba(255,255,255,0.06)",
              border: `1px solid ${selectedCar === i ? c.accent : "rgba(255,255,255,0.12)"}`,
              color: selectedCar === i ? "white" : "#9ca3af",
              boxShadow: selectedCar === i ? `0 0 20px ${c.accent}44` : "none",
            }}
          >
            {c.name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${selectedCar}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl md:rounded-3xl overflow-hidden mb-8"
            style={{ border: `1px solid ${currentCar.accent}33` }}
          >
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #1a1f3a, #0a0f23)",
                minHeight: "260px",
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={selectedColor}
                  src={`/Cars/${currentCar.folder}/${currentColor.file}.png`}
                  alt={`${currentCar.name} ${currentColor.name}`}
                  className="w-full h-full object-contain p-4 md:p-8 absolute inset-0"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div
                className="absolute top-3 left-3 md:top-5 md:left-5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-xs md:text-sm font-bold z-10"
                style={{
                  background: `linear-gradient(135deg, ${currentCar.accent}, ${currentCar.accent}99)`,
                }}
              >
                {currentCar.price}
              </div>
              <div
                className="absolute bottom-3 left-3 md:bottom-5 md:left-5 px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold text-white z-10"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: `1px solid ${currentCar.accent}55`,
                }}
              >
                {currentCar.type}
              </div>
            </div>

            <div
              className="p-6 md:p-10 flex flex-col justify-between"
              style={{ background: "rgba(10,15,35,0.95)" }}
            >
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: currentCar.accent }}
                >
                  {currentCar.type}
                </p>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">
                  {currentCar.name}
                </h3>
                <p
                  className="text-lg md:text-xl font-light mb-3 md:mb-4"
                  style={{ color: currentCar.accent }}
                >
                  {currentCar.tagline}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {currentCar.desc}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-6">
                  {[
                    { label: "Range", value: currentCar.range, icon: "🔋" },
                    { label: "Power", value: currentCar.power, icon: "⚡" },
                    { label: "0-100", value: currentCar.accel, icon: "🚀" },
                    { label: "Top Speed", value: currentCar.speed, icon: "💨" },
                    { label: "Battery", value: currentCar.battery, icon: "🔌" },
                    { label: "Seats", value: currentCar.seats, icon: "💺" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl md:rounded-2xl p-2.5 md:p-3 text-center"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${currentCar.accent}22`,
                      }}
                    >
                      <div className="text-base md:text-lg mb-1">{s.icon}</div>
                      <div className="text-white font-bold text-xs">
                        {s.value}
                      </div>
                      <div className="text-gray-500 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase mb-3 text-gray-500">
                  Color:{" "}
                  <span style={{ color: currentCar.accent }}>
                    {currentColor.name}
                  </span>
                </p>
                <div className="flex gap-2.5 md:gap-3 mb-6 flex-wrap">
                  {currentCar.colors.map((c, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={c.name}
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full transition-all"
                      style={{
                        background: c.hex,
                        border:
                          selectedColor === i
                            ? `3px solid ${currentCar.accent}`
                            : "3px solid rgba(255,255,255,0.2)",
                        boxShadow:
                          selectedColor === i ? `0 0 15px ${c.hex}` : "none",
                      }}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 25px ${currentCar.accent}55`,
                    }}
                    className="px-4 py-2.5 md:px-6 md:py-3 rounded-full text-white font-bold text-xs md:text-sm flex-1"
                    style={{
                      background: `linear-gradient(135deg, ${currentCar.accent}, ${currentCar.accent}88)`,
                    }}
                  >
                    Order Now ⚡
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2.5 md:px-6 md:py-3 rounded-full text-white font-bold text-xs md:text-sm"
                    style={{ border: `1px solid ${currentCar.accent}55` }}
                  >
                    Test Drive
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Technology() {
  const features = [
    {
      icon: "⚡",
      title: "Blade Battery",
      desc: "Revolutionary LFP battery with 50% more energy density. Ultra-safe, long-lasting performance.",
      color: "#06b6d4",
    },
    {
      icon: "🧠",
      title: "DiLink AI System",
      desc: 'Advanced AI infotainment with rotating 15.6" screen, voice control, and 5G connectivity.',
      color: "#a78bfa",
    },
    {
      icon: "🛡️",
      title: "e-Platform 3.0",
      desc: "1000V ultra-fast charging architecture with intelligent thermal management system.",
      color: "#86efac",
    },
    {
      icon: "🚀",
      title: "iTAC Control",
      desc: "Intelligent Torque Adaptation for maximum grip and stability in all road conditions.",
      color: "#fdba74",
    },
    {
      icon: "🌊",
      title: "Vehicle-to-Load",
      desc: "V2L technology turns your BYD into a mobile power station for any device or appliance.",
      color: "#f9a8d4",
    },
    {
      icon: "🔮",
      title: "DiPilot ADAS",
      desc: "Advanced driver assistance with lane keeping, adaptive cruise, and emergency braking.",
      color: "#fde68a",
    },
  ];

  return (
    <section
      id="technology"
      className="py-16 md:py-28 px-4 md:px-8 relative overflow-hidden"
      style={{ background: "#0a0f23" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-16 relative z-10"
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "#06b6d4" }}
        >
          Innovation
        </p>
        <h2 className="text-3xl md:text-6xl font-black text-white">
          Cutting Edge Technology
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto relative z-10">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8, boxShadow: `0 20px 60px ${f.color}22` }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl md:rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${f.color}33`,
            }}
          >
            <div className="text-3xl md:text-4xl mb-4 md:mb-5">{f.icon}</div>
            <h3 className="text-base md:text-lg font-bold text-white mb-3">
              {f.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Showrooms() {
  const locations = [
    {
      city: "Karachi",
      address: "Plot 5, Shahrah-e-Faisal, Karachi",
      phone: "+92 21 111-293-293",
      query: "BYD+showroom+Karachi+Pakistan",
    },
    {
      city: "Lahore",
      address: "Main Boulevard, Gulberg III, Lahore",
      phone: "+92 42 111-293-293",
      query: "BYD+showroom+Lahore+Pakistan",
    },
    {
      city: "Islamabad",
      address: "Blue Area, Jinnah Avenue, Islamabad",
      phone: "+92 51 111-293-293",
      query: "BYD+showroom+Islamabad+Pakistan",
    },
    {
      city: "Rawalpindi",
      address: "Murree Road, Saddar, Rawalpindi",
      phone: "+92 51 111-293-293",
      query: "BYD+showroom+Rawalpindi+Pakistan",
    },
    {
      city: "Peshawar",
      address: "University Road, Peshawar",
      phone: "+92 91 111-293-293",
      query: "BYD+showroom+Peshawar+Pakistan",
    },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <section
      id="showrooms"
      className="py-16 md:py-28 px-4 md:px-8"
      style={{ background: "linear-gradient(180deg, #0a0f23, #0d1330)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-16"
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "#06b6d4" }}
        >
          Pakistan
        </p>
        <h2 className="text-3xl md:text-6xl font-black text-white">
          Our Showrooms
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-3 md:mt-4">
          Visit us at any of our showrooms across Pakistan
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        <div className="md:col-span-2 flex flex-col gap-3">
          {locations.map((loc, i) => (
            <motion.button
              key={loc.city}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 md:p-5 rounded-xl md:rounded-2xl text-left transition-all w-full"
              style={{
                background:
                  selected === i
                    ? "rgba(6,182,212,0.15)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${selected === i ? "#06b6d4" : "rgba(255,255,255,0.1)"}`,
                boxShadow:
                  selected === i ? "0 0 20px rgba(6,182,212,0.1)" : "none",
              }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">📍</span>
                <span className="text-white font-bold text-base md:text-lg">
                  {loc.city}
                </span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm ml-9">
                {loc.address}
              </p>
              <p
                className="text-xs md:text-sm ml-9 mt-1"
                style={{ color: "#06b6d4" }}
              >
                {loc.phone}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selected}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-3 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(6,182,212,0.2)", height: "320px" }}
        >
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{
              border: 0,
              filter: "invert(90%) hue-rotate(180deg) saturate(0.8)",
            }}
            src={`https://maps.google.com/maps?q=${locations[selected].query}&output=embed`}
            allowFullScreen
            loading="lazy"
            title={`BYD Showroom ${locations[selected].city}`}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-28 px-4 md:px-8 relative overflow-hidden"
      style={{ background: "#0a0f23" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #a78bfa, transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#06b6d4" }}
          >
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6">
            Drive the <br />
            <span
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Future
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
            Book a test drive, get a quote, or visit your nearest BYD showroom
            in Pakistan.
          </p>
          <div className="flex flex-col gap-4 md:gap-5">
            {[
              { icon: "📞", label: "Call Us", value: "+92 21 111 293 293" },
              { icon: "📧", label: "Email", value: "info@bydpakistan.com" },
              { icon: "🌐", label: "Website", value: "www.bydpakistan.com" },
              { icon: "⏰", label: "Hours", value: "Mon-Sat: 9AM - 7PM" },
            ].map((c) => (
              <motion.div
                key={c.label}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4"
              >
                <span className="text-xl md:text-2xl">{c.icon}</span>
                <div>
                  <p className="text-gray-500 text-xs tracking-widest uppercase">
                    {c.label}
                  </p>
                  <p className="text-white font-medium text-sm md:text-base">
                    {c.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl md:rounded-3xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(6,182,212,0.2)",
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-5 md:mb-6">
            Book a Test Drive
          </h3>
          <div className="flex flex-col gap-4">
            {[
              "Full Name",
              "Phone Number",
              "Email Address",
              "Preferred City",
            ].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="w-full px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-white text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            ))}
            <select
              className="w-full px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-gray-300 text-sm outline-none"
              style={{
                background: "rgba(10,15,35,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <option value="">Select Car Model</option>
              {allCars.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} — {c.price}
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(6,182,212,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 md:py-4 rounded-xl text-white font-bold text-base md:text-lg"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a78bfa)",
              }}
            >
              Book Now ⚡
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-10 md:py-14 px-4 md:px-8"
      style={{
        borderTop: "1px solid rgba(6,182,212,0.1)",
        background: "#080c1d",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          {[
            {
              title: "Ocean Series",
              items: [
                "BYD Seal",
                "BYD Atto 3",
                "BYD Dolphin",
                "BYD Sealion 7",
                "BYD Seagull",
              ],
            },
            {
              title: "Dynasty Series",
              items: [
                "BYD Han",
                "BYD Tang",
                "BYD Song",
                "BYD Qin L",
                "BYD Shark 6",
              ],
            },
            {
              title: "Luxury",
              items: [
                "Denza D9",
                "Denza N7",
                "Yangwang U8",
                "Yangwang U9",
                "FangChengBao",
              ],
            },
            {
              title: "Connect",
              items: [
                "Facebook",
                "Instagram",
                "YouTube",
                "Twitter",
                "LinkedIn",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-xs tracking-widest uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 4, color: "#06b6d4" }}
                    className="text-gray-400 text-xs md:text-sm cursor-pointer transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 md:pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-gray-500 text-xs md:text-sm text-center sm:text-left">
            © 2024 BYD Auto Pakistan. Build Your Dreams. ⚡
          </p>
          <p className="text-gray-500 text-xs md:text-sm">
            Built by{" "}
            <span style={{ color: "#06b6d4" }}>Muhammad Ammad Aamir</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-[#0a0f23] text-white overflow-x-hidden">
      <ScrollBar />
      <Navbar />
      <Hero />
      <Models />
      <Technology />
      <Showrooms />
      <Contact />
      <Footer />
    </main>
  );
}
