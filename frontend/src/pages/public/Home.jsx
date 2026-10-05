import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Hero from "../../components/public/Hero";
import AboutSection from "../../components/public/AboutSection";
import SkillsSection from "../../components/public/SkillsSection";
import ProjectsSection from "../../components/public/ProjectsSection";
import ServicesSection from "../../components/public/ServicesSection";
import ExperienceSection from "../../components/public/ExperienceSection";
import TestimonialsSection from "../../components/public/TestimonialsSection";
import BlogPreview from "../../components/public/BlogPreview";
import ContactSection from "../../components/public/ContactSection";

export default function Home() {
  const { data: about } = useFetch("/about");
  const { data: skills } = useFetch("/skills");
  const { data: projects } = useFetch("/projects");
  const { data: services } = useFetch("/services");
  const { data: experience } = useFetch("/experience");
  const { data: testimonials } = useFetch("/testimonials");
  const { data: blogs } = useFetch("/blogs?published=true");

  useEffect(() => {
    if (about?.name) document.title = `${about.name} · ${about.title || "Portfolio"}`;
  }, [about]);

  return (
    <>
      <Hero about={about} />
      <AboutSection about={about} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ServicesSection services={services} />
      <ExperienceSection experience={experience} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview blogs={blogs} />
      <ContactSection about={about} />
    </>
  );
}