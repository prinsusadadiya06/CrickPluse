import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import axios from "axios";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const FAQs: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQCategory[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://crickpluse.onrender.com/api/faqs");
        setFaqData(res.data || []);
      } catch (error) {
        console.log("Error fetching FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col md:bg-[#ECF0F1]">
      <Header />

      {/* FULL PAGE LOADER */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-blue-600">Loading FAQs...</p>
          </div>
        </div>
      )}

      {/* Page Wrapper */}
      <div className="flex-1 min-h-[110vh] bg-[#ECF0F1] md:min-h-[120vh] md:py-10 md:px-6">

        {/* White Card */}
        <div className="max-w-5xl mx-auto md:bg-white bg-[#ECF0F1] md:rounded-md md:shadow p-6 md:p-10">

          <h1 className="md:text-3xl text-2xl font-bold mb-2">
            CrickPluse FAQs
          </h1>

          <p className="text-gray-600 mb-8">
            Find quick answers about subscriptions, live streaming availability,
            billing, and troubleshooting.
          </p>

          {/* No Data */}
          {!loading && faqData.length === 0 && (
            <p className="text-gray-500">No FAQs available</p>
          )}

          {/* Data */}
          {!loading && faqData.length > 0 && (
            <div className="space-y-4">
              {faqData.map((category, index) => (
                <div
                  key={index}
                  className="bg-[#FAFAFA] border border-[#e5e7eb] rounded-xl"
                >

                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left px-6 py-4 font-bold flex items-center gap-3"
                  >
                    <ChevronRight
                      className={`text-black transition-transform ${
                        openIndex === index ? "rotate-90" : ""
                      }`}
                      size={18}
                      strokeWidth={4}
                    />
                    {category.title}
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-6 space-y-4">
                      {category.items.map((item, i) => (
                        <div key={i}>
                          <h4 className="font-semibold">{item.question}</h4>
                          <p className="text-sm text-gray-600">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-8">
            Note: Live streaming availability depends on your region and rights availability.
          </p>

        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default FAQs;