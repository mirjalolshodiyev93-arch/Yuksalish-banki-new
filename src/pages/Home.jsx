
import ServiceCard from "../components/_compoint_/ServiceCard";
import Bank from "../components/skroll/Bank";
import Stats from "../components/_compoint_/Stats";
import Hero from "../components/components/Hero";
import Hero1 from "../components/_compoint_navbar/YuksalishPage";
import { Testimonials } from "./Testimonials";
import SignIn from "./SignIn111";
import SignUp from "./SignUp111";



export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Bank />
      <ServiceCard />
      <Testimonials/>
      <Hero1/>
      
    </>
  );
}
