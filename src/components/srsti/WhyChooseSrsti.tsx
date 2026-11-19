import { motion, useReducedMotion } from "framer-motion";

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

const PILLARS: Pillar[] = [
  {
    id: "native-sourcing",
    title: "Native Sourcing",
    description: "Highest quality raw material from native regions all over India.",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-16 sm:size-20 text-[#B5741E] dark:text-[#E8BE72]"
        aria-hidden="true"
      >
        {/* Heritage Banyan / Neem Tree Canopy */}
        <path
          d="M40 10C34.5 10 30 14 29 19C25 19.5 21 23 21 27.5C21 28.5 21.3 29.5 21.8 30.5C18 31.8 15 35.5 15 40C15 45.5 19.5 50 25 50C26.5 50 28 49.6 29.3 48.9C31 51.5 34 53 37.5 53C38.3 53 39.2 52.8 40 52.5C40.8 52.8 41.7 53 42.5 53C46 53 49 51.5 50.7 48.9C52 49.6 53.5 50 55 50C60.5 50 65 45.5 65 40C65 35.5 62 31.8 58.2 30.5C58.7 29.5 59 28.5 59 27.5C59 23 55 19.5 51 19C50 14 45.5 10 40 10Z"
          fill="currentColor"
        />
        {/* Leaf texture accents */}
        <circle cx="33" cy="24" r="2.2" fill="#FAF6EE" opacity="0.45" />
        <circle cx="47" cy="24" r="2.2" fill="#FAF6EE" opacity="0.45" />
        <circle cx="40" cy="32" r="2.5" fill="#FAF6EE" opacity="0.45" />
        <circle cx="28" cy="38" r="2" fill="#FAF6EE" opacity="0.45" />
        <circle cx="52" cy="38" r="2" fill="#FAF6EE" opacity="0.45" />
        {/* Tree trunk */}
        <path
          d="M37 46H43V64C43 64 47 67 49 70H31C33 67 37 64 37 64V46Z"
          fill="currentColor"
        />
        {/* Root grass strokes */}
        <path
          d="M26 70C28.5 66.5 32 64.5 35 64.5M54 70C51.5 66.5 48 64.5 45 64.5"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "traditional-processing",
    title: "Traditional Processing",
    description:
      "Minimally processed using time-tested methods, made better. For maximum nutrition.",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-16 sm:size-20 text-[#B5741E] dark:text-[#E8BE72]"
        aria-hidden="true"
      >
        {/* Ghani frame posts */}
        <path
          d="M27 18V68M43 26V68"
          stroke="currentColor"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Cross rungs */}
        <path
          d="M27 34H43M27 48H43"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Wooden mortar pot */}
        <path
          d="M44 48C40 48 37 51 37 55C37 63 43 68 51 68C59 68 65 63 65 55C65 51 62 48 58 48H44Z"
          fill="currentColor"
        />
        {/* Pot rim & leaf accent */}
        <ellipse cx="51" cy="48" rx="7" ry="2.5" fill="currentColor" />
        <path
          d="M48 42C48 42 51 38 54 40C57 42 53 45 53 45"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Base platform */}
        <path
          d="M20 68H68"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "quality-checks",
    title: "Extensive Quality Checks",
    description:
      "Everything goes through 20+ lab tests, to make sure that you get only what is best.",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-16 sm:size-20 text-[#B5741E] dark:text-[#E8BE72]"
        aria-hidden="true"
      >
        {/* Clipboard board */}
        <rect
          x="22"
          y="18"
          width="36"
          height="48"
          rx="5"
          fill="currentColor"
        />
        {/* Inner sheet area cut out */}
        <rect
          x="26"
          y="23"
          width="28"
          height="38"
          rx="2"
          fill="#FAF6EE"
          opacity="0.32"
        />
        {/* Clipboard top clip */}
        <path
          d="M32 15C32 13.5 33.5 12 35 12H45C46.5 12 48 13.5 48 15V19H32V15Z"
          fill="currentColor"
        />
        <circle cx="40" cy="15.5" r="1.8" fill="#FAF6EE" />
        {/* Checklist lines */}
        <path
          d="M30 30H48M30 37H44M30 44H40"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* Checkmark dots */}
        <circle cx="28" cy="30" r="1.3" fill="currentColor" />
        <circle cx="28" cy="37" r="1.3" fill="currentColor" />
        <circle cx="28" cy="44" r="1.3" fill="currentColor" />
        {/* Large magnifying glass with checkmark */}
        <circle cx="52" cy="52" r="13" fill="currentColor" />
        <circle cx="52" cy="52" r="9" fill="#FAF6EE" />
        {/* Magnifier handle */}
        <path
          d="M61 61L70 70"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Verified checkmark inside lens */}
        <path
          d="M48 52L51 55L57 48"
          stroke="#B5741E"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "rural-lives",
    title: "Better Rural Lives",
    description:
      "5000+ farmer families are empowered with every SRSTI product you buy.",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-16 sm:size-20 text-[#B5741E] dark:text-[#E8BE72]"
        aria-hidden="true"
      >
        {/* Tractor engine hood & chassis */}
        <path
          d="M26 40H46V54H24C24 49 26 43 26 40Z"
          fill="currentColor"
        />
        {/* Cabin post & steering column */}
        <path
          d="M44 30V40M41 33H47M34 32V40"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Exhaust pipe */}
        <path
          d="M32 25V35"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 25H34"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Small front tire */}
        <circle cx="28" cy="55" r="7" fill="currentColor" />
        <circle cx="28" cy="55" r="3.2" fill="#FAF6EE" />
        {/* Big rear tire with tractor treads */}
        <circle cx="56" cy="50" r="14" fill="currentColor" />
        <circle cx="56" cy="50" r="7" fill="#FAF6EE" />
        <circle cx="56" cy="50" r="3" fill="currentColor" />
        {/* Treads */}
        <path
          d="M56 33V36M56 64V67M39 50H42M70 50H73M44 38L46 40M66 60L68 62M44 62L46 60M66 40L68 38"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function WhyChooseSrsti() {
  const reduce = useReducedMotion();

  return (
    <section
      id="why-choose-srsti"
      aria-labelledby="why-choose-heading"
      className="relative z-10 bg-veil px-5 py-14 sm:py-18 md:py-22 md:px-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading matching reference image layout */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2
            id="why-choose-heading"
            className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold tracking-tight text-foreground"
          >
            Why Choose SRSTI?
          </h2>
        </motion.div>

        {/* 4 Clean Columns Grid matching reference layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: reduce ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
              className="group flex flex-col items-center text-center px-2"
            >
              {/* Feature Icon */}
              <div className="mb-5 sm:mb-6 flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center transition-transform duration-300 ease-silk group-hover:scale-110">
                {pillar.icon}
              </div>

              {/* Feature Title */}
              <h3 className="font-display text-xl sm:text-[22px] font-bold tracking-tight text-foreground mb-2 sm:mb-3">
                {pillar.title}
              </h3>

              {/* Feature Description */}
              <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-[270px] mx-auto">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
