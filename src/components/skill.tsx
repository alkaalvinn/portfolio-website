import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "../lib/data";
import { useSectionInView } from "../lib/hooks";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 scroll-mt-28 text-center sm:mb-40 text-white px-4 max-w-4xl mx-auto"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-3 text-lg">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-5 py-3 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default shadow-lg"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}