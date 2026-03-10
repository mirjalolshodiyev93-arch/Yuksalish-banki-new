import visaImg from "../assets/visa.png";
import MASTERCARDImg from "../assets/MASTERCARD.png";


export const cards = (t) => [
  {
    id: 1,
    title: t("cards.visa.title"),
    description: t("cards.visa.description"),
    subDescription: t("cards.visa.subDescription"),
    price: t("cards.visa.price"),
    priceLabel: t("cards.visa.priceLabel"),
    deposit: t("cards.visa.deposit"),
    depositLabel: t("cards.visa.depositLabel"),
    image: visaImg
  },
  {
    id: 2,
    title: t("cards.mastercard.title"),
    description: t("cards.mastercard.description"),
    subDescription: t("cards.mastercard.subDescription"),
    price: t("cards.mastercard.price"),
    priceLabel: t("cards.mastercard.priceLabel"),
    deposit: t("cards.mastercard.deposit"),
    depositLabel: t("cards.mastercard.depositLabel"),
    image: MASTERCARDImg
  }
];