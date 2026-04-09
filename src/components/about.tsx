import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 text-white"
    >
      <div className="relative">
        <motion.img
          src="https://media.licdn.com/dms/image/v2/D5603AQGIP_4GeDTAPw/profile-displayphoto-scale_400_400/B56Z0ouyQ.HkAg-/0/1774504851653?e=1777507200&v=beta&t=B0EiXaZczNOtGvyyl90xYUmwLdGdwqFmiIx2MQRe7LI"
          alt="Alka Alvin"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <motion.h1
        className="text-3xl sm:text-5xl font-bold mt-6 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hello, I'm Alka
      </motion.h1>
      <motion.p
        className="max-w-xl text-base sm:text-lg text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        a tech enthusiast who enjoys exploring cloud computing, DevOps, and web development.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <a
          href="#contact"
          className="group bg-black/80 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-black transition"
        >
          Contact me <BsArrowRight className="group-hover:translate-x-1 transition" />
        </a>

        <a
          href="/CV.pdf"
          download
          className="group bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition"
        >
          Download CV <HiDownload className="group-hover:translate-y-1 transition" />
        </a>

        <a
          href="https://linkedin.com/in/alkaalvinn"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-full hover:scale-110 transition text-white text-xl"
        >
          <BsLinkedin />
        </a>

        <a
          href="https://github.com/alkaalvinn"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-full hover:scale-110 transition text-white text-2xl"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
};

export default About;
