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
        setLoading(true);
        const res = await axios.get("https://crickpluse.onrender.com/api/terms");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="min-h-screen md:pb-0 pb-[63px] bg-gray-50">
      <Header />

      {loading ? (
        // FULL SCREEN LOADER
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-blue-600">
              Loading Terms of Service...
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 md:p-12 lg:p-20 px-6 md:px-0">

          {!data ? (
            <p className="text-center py-10">No Terms Found</p>
          ) : (
            <>
              <h1 className="text-xl md:text-2xl font-bold mb-2 text-black">
                Terms of Service
              </h1>

              <p className="text-sm mb-6">
                Last Updated: {data.lastUpdated}
              </p>

              <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
                {data.sections.map((section, index) => (
                  <section key={index}>
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
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default TermsPage;