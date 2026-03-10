import { CreditCard, Landmark, PiggyBank, RefreshCcw } from "lucide-react";
import { defaultFunnelProps } from "recharts/types/cartesian/Funnel";

export const services = [
  {
    id: 1,
    title: "Plastik kartalar",
    desc: "Barcha turdagi xalqaro Visa/Mastercard va milliy Humo/Uzcard kartalari.",
    icon: CreditCard,
    color: "blue"
  },
  {
    id: 2,
    title: "Kreditlar",
    desc: "Imtiyozli foiz stavkalari va tezkor rasmiylashtirish bilan mikroqarzlar.",
    icon: Landmark,
    color: "green",
    active: true

  
  },
  {
    id: 3,
    title: "Omonatlar",
    desc: "Mablag'laringizni ishonchli va yuqori daromad bilan ko'paytiring.",
    icon: PiggyBank,
    color: "blue"
  },
  {
    id: 4,
    title: "Valyuta",
    desc: "Eng foydali kurslarda 24/7 onlayn valyuta ayirboshlash xizmati.",
    icon: RefreshCcw,
    color: "green"
  }
];
