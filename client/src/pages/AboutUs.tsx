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
        const res = await axios.get("http://localhost:5000/api/about");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!data) {
    return <p className="text-center py-10">No About Data Found</p>;
  }

  return (
    <div className="min-h-screen  md:pb-0 pb-[70px] flex flex-col bg-white md:bg-gray-50">

      <Header />

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

      <div className="hidden md:block">
        <Footer />
      </div>

    </div>
  );
};

export default AboutUs;