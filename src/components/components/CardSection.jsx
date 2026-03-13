import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cards } from "../../data/cards";

export default function CardSection() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardData = cards(t);

  const openOrderModal = (card) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  return (
    <section className="pb-16 pt-32 bg-[#f5f5f5]">
      <div className="max-w-[1400px] mx-auto px-4 space-y-10">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center justify-between gap-10 p-8 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl lg:flex-row hover:shadow-md"
          >
            
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-black">{card.title}</h2>
              <p className="text-lg text-gray-600">{card.description}</p>
              <p className="text-lg text-gray-600">{card.subDescription}</p>

              <div className="flex flex-wrap gap-10 pt-4">
                <div>
                  <h3 className="text-2xl font-bold text-black">{card.price}</h3>
                  <p className="text-gray-500">{card.priceLabel}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">{card.deposit}</h3>
                  <p className="text-gray-500">{card.depositLabel}</p>
                </div>
              </div>

              {/* BUYURTMA BUTTON */}
              <button
                onClick={() => openOrderModal(card)}
                className="px-6 py-3 mt-4 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
              >
                {t("buyurtma")}
              </button>
            </div>

            <div className="flex justify-center flex-1">
              <img
                src={card.image}
                alt={card.title}
                className="w-[550px] max-w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-8 bg-white rounded-2xl">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {selectedCard?.title}
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <p className="mb-4 text-gray-600">
              {t("buyurtma_text")}
            </p>

            <input
              type="text"
              placeholder={t("ism")}
              className="w-full p-3 mb-3 border rounded-lg"
            />

            <input
              type="tel"
              placeholder={t("telefon")}
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <button className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700">
              {t("yuborish")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}