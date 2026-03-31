import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface Section {
  title: string;
  content: string[];
}

interface PrivacyData {
  lastUpdated: string;
  sections: Section[];
}

const PrivacyPolicy: React.FC = () => {

  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const res = await axios.get("https://crickpluse.onrender.com/api/privacy");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen md:pb-0 pb-[64px] bg-gray-50">

      <Header />

      <div className="max-w-5xl mx-auto  bg-white shadow-lg px-6 py-10 md:px-12 md:py-16">

        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Privacy Notice
        </h1>

        <p className="text-sm mb-6">
          Last Updated: {data?.lastUpdated}
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">

          {data?.sections.map((section, index) => (
            <section key={index}>
              {section.title && (
                <h2 className="text-lg md:text-xl font-bold mb-2">
                  {section.title}
                </h2>
              )}

              {section.content.map((para, i) => (
                <p key={i} className="mt-2">
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

export default PrivacyPolicy;