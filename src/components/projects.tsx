import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "../lib/data";
import Project from "./Project";
import { useSectionInView } from "../lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  const midpoint = Math.ceil(projectsData.length / 2);
  const leftProjects = projectsData.slice(0, midpoint);
  const rightProjects = projectsData.slice(midpoint);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 text-white px-4 max-w-7xl mx-auto">
      <SectionHeading>My projects</SectionHeading>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-8 w-full max-w-2xl mx-auto lg:mx-0">
          {leftProjects.map((project, index) => (
            <React.Fragment key={index}>
              <Project {...project} />
            </React.Fragment>
          ))}
        </div>
        
        <div className="space-y-8 w-full max-w-2xl mx-auto lg:mx-0">
          {rightProjects.map((project, index) => (
            <React.Fragment key={index + midpoint}>
              <Project {...project} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}