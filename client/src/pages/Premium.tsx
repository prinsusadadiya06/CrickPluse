import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import SubscribeModal from "../components/SubscribeModal";
import axios from "axios";
import Header from "../components/Header";

interface Plan {
  _id: string;
  name: string;
  price: string;
  features: string[];
}

const Premium: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // FETCH FROM BACKEND
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plans");
        setPlans(res.data || []);
      } catch (err) {
        console.log("Error fetching plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden">
        <Header />
      </div>

      <div className="min-h-screen bg-[#ECF0F1] flex justify-center">
        {/* mobile */}
        <div className="w-full md:w-[70%] bg-[#F5F5F5] flex flex-col items-center pb-20 md:pb-0">

          {/* DESKTOP HEADER */}
          <div className="w-full bg-blue-600 justify-between items-center px-4 md:px-10 hidden md:flex h-12">
            <img
              src="/HeaderLogo.png"
              alt="CrickPulse"
              className="h-14 w-auto transform scale-150"
            />
            <Link to="/login" className="text-white text-xl">
              <User size={20} />
            </Link>
          </div>

          {/* TITLE */}
          <div className="w-[90%] text-center mt-5">
            <h2 className="text-sm md:text-xl font-semibold">
              SELECT YOUR PLAN
            </h2>
            <div className="md:border-b border-gray-300 mt-6"></div>
          </div>

          {/* Loading */}
          {loading && (
            <p className="mt-10 text-gray-500">Loading plans...</p>
          )}

          {/* No Plans */}
          {!loading && plans.length === 0 && (
            <p className="mt-10 text-gray-500">No plans available</p>
          )}

          {/* Plans */}
          {!loading && plans.length > 0 && (
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:mt-10 md:w-[90%] w-[95%] justify-center">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className={`bg-white rounded-xl shadow-md px-5 py-4 flex flex-col justify-between w-full border-2 transition-all ${
                    selectedPlan === plan._id
                      ? "border-blue-600 scale-105"
                      : "border-transparent"
                  }`}
                >
                  <div>
                    <div className="flex justify-between border-b pb-3 mb-5">
                      <h3 className="font-semibold text-base md:text-lg">
                        {plan.name}
                      </h3>
                      <span className="font-semibold">{plan.price}</span>
                    </div>

                    <ul className="ml-5 text-sm text-gray-800 space-y-2">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className={
                            f.startsWith("(") ? "list-none" : "list-disc"
                          }
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-10">
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setSelectedPlan(plan._id);
                      }}
                      className="border border-gray-300 rounded-full px-6 py-2 bg-[#EBEBEB]"
                    >
                      Know More
                    </button>

                    <Link
                      to="/login"
                      className="flex-1 bg-blue-600 text-white rounded-full py-2 text-center"
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MODAL */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div ref={modalRef}>
                <SubscribeModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Premium;