import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "../lib/data";
import { useSectionInView } from "../lib/hooks";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40 text-white">
      <SectionHeading>My Experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "left",
                padding: "1.3rem 2rem",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
              }}
              contentArrowStyle={{
                borderRight: "0.4rem solid rgba(255, 255, 255, 0.3)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background: "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="font-semibold capitalize text-white">{item.title}</h3>
              <p className="font-normal !mt-0 text-gray-200">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-300">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}