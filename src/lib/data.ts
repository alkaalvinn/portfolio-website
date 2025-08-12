import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap, LuCloudy } from "react-icons/lu";

export const links = [
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Achievement",
    hash: "#achievement",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const projectsData = [
  {
    title: "24PDInsight",
    description:
      "24PDInsight offers specialized speech analytics for the 2024 presidential debate. It uses advanced speech recognition and NLP to deliver valuable insights and detailed analysis.",
    tags: ["React", "Express", "Tailwind"],
    imageUrl: "https://i.imgur.com/PfSRsj4.png",
  },
  {
    title: "Website WSL",
    description:
      "Sawah Lungguh Tourism Website: Book tickets for the Sawah Lungguh attraction and explore the profile of Desa Bareng, Ponorogo Regency.",
    tags: ["HTML", "CSS", "JS"],
    imageUrl: "https://i.imgur.com/g52qbw4.png",
  },
  {
    title: "MICO.",
    description:
      "Mobile Application for Diabetes Prevention in Productive-Aged Populations within Semi-Urban Regions via Healthy Lifestyle Interventions and Posbindu Health Screening Analysis.",
    tags: ["UI/UX", "Figma", "Design"],
    imageUrl: "https://i.imgur.com/RQhpgYA.png",
  },
  {
    title: "Kubernetes Monitoring System",
    description:
      "Detects and notifies of cluster deployments, changes, and new services. It considers WAF and offers optional visualization.",
    tags: ["React", "Vite", "Tailwind"],
    imageUrl: "https://i.imgur.com/FVbYvrn.png",
  },
  {
    title: "SINGALAM",
    description:
      "SINGALAM: Malang City's inclusive, AI-powered public service platform. It provides voice-first access for all citizens, especially the visually impaired, with transparent tracking.",
    tags: ["React", "Vite", "Tailwind"],
    imageUrl: "https://i.imgur.com/xTWZVdB.png",
  },
  {
    title: "PARU",
    description:
      "Mobile App to Help Smokers Achieve a Healthier Lifestyle Through Quitting.",
    tags: ["UI/UX", "Figma", "Design"],
    imageUrl: "https://i.imgur.com/fbq24l0.png",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "SQL",
  "TypeScript",
  "Figma",
  "React",
  "Next.js",
  "Vite",
  "Node.js",
  "Git",
  "Tailwind",
  "MySQL",
  "PostgreSQL",
  "Python",
  "Framer Motion",
  "AWS",
  "Google Cloud Platform",
  "Docker",
] as const;

export const experiencesData = [
  {
    title: "Front-End Developer at kitapilah.",
    location: "Malang, Indonesia",
    description:
      "I was responsible for crafting engaging and responsive user interfaces. My work primarily involved developing the platform's front-end using HTML and CSS, leveraging the utility-first framework Tailwind CSS for efficient styling.",
    icon: React.createElement(CgWorkAlt),
    date: "Jan - Apr 2024",
  },
  {
    title: "Bangkit Academy Batch 1 2024",
    location: "Malang, Indonesia",
    description:
      "Graduated with Distinction from Bangkit Academy Batch 1 2024, successfully completing all comprehensive coursework from Coursera, Dicoding, and Google Cloud Skill Boost.",
    icon: React.createElement(LuGraduationCap),
    date: "Feb - Jul 2024",
  },
  {
    title: "Telkomsel Cloud Platform Engineering Intern",
    location: "Jakarta Selatan, Indonesia",
    description:
      "At Telkomsel, I optimized costs by automating EBS volume/snapshot management using AWS Lambda (SAM), contributed to Karpenter migration for Kubernetes autoscaling, and designed an AWS Lambda/RDS PostgreSQL monitoring system for improved cluster visibility.",
    icon: React.createElement(LuCloudy),
    date: "Sep 2024 - Mar 2025",
  },
] as const;

export const certificationsData = {
  row1: [
    { id: 1, src: "https://i.imgur.com/ip8n4X4.png", alt: "AWS Cloud Practitioner", title: "AWS Certified Cloud Practitioner" },
    { id: 2, src: "https://i.imgur.com/G2mLXkk.jpeg", alt: "Oracle", title: "Database Programming" },
    { id: 3, src: "https://i.imgur.com/zZatZl0.jpeg", alt: "Introduction to FinOps", title: "Introduction to FinOps Certificate" },
    { id: 4, src: "https://i.imgur.com/sci2aE7.jpeg", alt: "Introduction to FOCUS", title: "Introduction to FOCUS Certificate" },
    { id: 5, src: "https://i.imgur.com/97GsjOc.png", alt: "Google Cloud Computing Foundations", title: "Google Cloud Computing Foundations Certificate" },
  ],
  row2: [
    { id: 6, src: "https://i.imgur.com/bw91U9E.png", alt: "System Administration and IT Infrastructure Services Certificate", title: "System Administration and IT Infrastructure Services" },
    { id: 7, src: "https://i.imgur.com/Xh3k42T.jpeg", alt: "LinkedIn Learning Certificate of Completion", title: "Cloud DevOps Concepts: Understanding Processes and Services" },
    { id: 8, src: "https://i.imgur.com/Nz07cgk.png", alt: "The Bits and Bytes of Computer Networking Certificate", title: "The Bits and Bytes of Computer Networking" },
    { id: 9, src: "https://i.imgur.com/Zs0bRDS.png", alt: "Develop Your Google Cloud Network Skill Badge", title: "Develop Your Google Cloud Network Skill Badge" },
    { id: 10, src: "https://i.imgur.com/pZNgdQp.png", alt: "Build Infrastructure with Terraform on Google Cloud Skill Badge Certificate", title: "Build Infrastructure with Terraform on Google Cloud Skill Badge" },
  ],
  row3: [
    { id: 11, src: "https://i.imgur.com/3Lw9BEH.jpeg", alt: "UXvidia UI/UX Design Competition Arkavidia 9.0 ITB Bandung 2025", title: "3rd Place UXvidia UI/UX Design Competition Arkavidia 9.0 ITB Bandung 2025" },
    { id: 12, src: "https://i.imgur.com/EDXzETE.jpeg", alt: "Hackathon FIND IT! UGM Yogyakarta 2025", title: "Top 10 Hackathon FIND IT! UGM Yogyakarta 2025" },
    { id: 13, src: "https://i.imgur.com/rVJICDc.jpeg", alt: "UI/UX Championship 2024 by GDSC UIN Jakarta", title: "Winner of UI/UX Championship 2024 by GDSC UIN Jakarta" },
    { id: 14, src: "https://i.imgur.com/WrYZ2Vn.jpeg", alt: "UI/UX Design Competition Techcomfest POLINES Semarang 2024", title: "2nd Place UI/UX Design Competition Techcomfest POLINES Semarang 2024" },
    { id: 15, src: "https://i.imgur.com/yV3t4bO.jpg", alt: "Cloud Computing Learning Path", title: "Bangkit Academy 2024" },
  ],
} as const;