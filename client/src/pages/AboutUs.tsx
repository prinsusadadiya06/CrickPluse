import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Section {
  content: string;
}

interface AboutData {
  title: string;
  sections: Section[];
}

const AboutUs: React.FC = () => {

  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://crickpluse.onrender.com/api/about");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="min-h-screen md:pb-0 pb-[70px] flex flex-col bg-white md:bg-gray-50">

      <Header />

      {loading ? (
        // FULL SCREEN LOADER
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-blue-600">
              Loading About Us...
            </p>
          </div>
        </div>
      ) : !data ? (
        <div className="flex items-center justify-center flex-grow">
          <p className="text-center py-10">No About Data Found</p>
        </div>
      ) : (
        <div className="py-0 md:py-10 px-0 md:px-6 flex-grow">

          <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 md:rounded-md md:shadow">

            <h1 className="text-2xl md:text-3xl font-bold md:mb-8 mb-2">
              {data.title}
            </h1>

            <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">

              {data.sections.map((section, index) => (
                <p key={index}>
                  {section.content}
                </p>
              ))}

            </div>

          </div>
        </div>
      )}

      <div className="hidden md:block">
        <Footer />
      </div>

    </div>
  );
};

export default AboutUs;