"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "../lib/hooks";
import { sendEmail } from "../actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const senderEmail = formData.get("senderEmail") as string;
    const message = formData.get("message") as string;

    try {
      const result = await sendEmail(senderEmail, message);

      if (result.success) {
        toast.success("Email sent successfully!");
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 flex flex-col items-center justify-center min-h-[80vh] px-4 text-white"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="w-full max-w-md text-center">
        <SectionHeading>Contact me</SectionHeading>

        <p className="text-gray-700 -mt-6 mb-10 dark:text-white/80">
          Please contact me directly at{" "}
          <a className="underline" href="mailto:alkaalvinn@gmail.com">
            alkaalvinn@gmail.com
          </a>{" "}
          or through this form.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            className="h-14 w-full px-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:bg-white/20 focus:scale-105 focus:outline-none active:scale-100 transition-all duration-300 shadow-lg"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your email"
            disabled={isSubmitting}
          />
          <textarea
            className="h-52 w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:bg-white/20 focus:scale-105 focus:outline-none active:scale-100 transition-all duration-300 resize-none shadow-lg"
            name="message"
            placeholder="Your message"
            required
            maxLength={5000}
            disabled={isSubmitting}
          />
          <div className="flex justify-center pt-2">
            <SubmitBtn disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </motion.section>
  );
}