import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface Section {
  title: string;
  content: string[];
}

interface TermsData {
  lastUpdated: string;
  sections: Section[];
}

const TermsPage: React.FC = () => {

  const [data, setData] = useState<TermsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/terms");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!data) {
    return <p className="text-center py-10">No Terms Found</p>;
  }

  return (
    <div className="min-h-screen md:pb-0 pb-[63px] bg-gray-50">

      {/* Header */}
      <Header />

      <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 md:p-12 lg:p-20 px-6 md:px-0">

        <h1 className="text-xl md:text-2xl font-bold mb-2 text-black">
          Terms of Service
        </h1>

        <p className="text-sm mb-6">
          Last Updated: {data.lastUpdated}
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">

          {data.sections.map((section, index) => (
            <section key={index} className="px-1 md:px-2">

              {section.title && (
                <h2 className="text-lg md:text-xl mb-2 flex items-center">
                  <span className="mr-2 font-normal">{index + 1}.</span>
                  <span className="font-bold text-black uppercase">
                    {section.title}
                  </span>
                </h2>
              )}

              {section.content.map((para, i) => (
                <p key={i} className="mt-4">
                  {para}
                </p>
              ))}

            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TermsPage;