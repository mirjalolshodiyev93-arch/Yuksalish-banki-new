
import ServiceCard from "../components/_compoint_/ServiceCard";
import Bank from "../components/skroll/Bank";
import Stats from "../components/_compoint_/Stats";
import Hero from "../components/components/Hero";
import { Testimonials } from "./Testimonials";


export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Bank />
      <ServiceCard />
      <Testimonials/>
    </>
  );
}
