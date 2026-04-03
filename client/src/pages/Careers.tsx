import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://crickpluse.onrender.com/api/jobs");

        setJobs(res.data || []);
      } catch (error) {
        console.log("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const departments = Array.from(
    new Set(jobs.map((job) => job.department).filter(Boolean))
  );

  return (
    <div className="min-h-screen bg-white md:bg-gray-200">

      {/* Header */}
      <Header />

      {/* Outer wrapper */}
      <div className="py-4 md:py-10 px-4 md:px-6">

        {/* Content Box */}
        <div className="max-w-6xl mx-auto bg-white mb-40 md:p-10 md:rounded-md md:shadow">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Careers @ CrickPluse
          </h1>

          <p className="text-center text-base max-w-2xl mx-auto mb-12">
            We're building a cricket product for the generation of always connected
            internet users and we need your talent and passion.
          </p>

          {/* WHY WORK */}
          <h2 className="md:text-center text-xl font-bold md:mb-10">
            WHY WORK FOR CrickPluse?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8">

            <div className="md:border-r border-gray-300 pr-6">
              <h3 className="font-bold text-lg mb-3">AWESOME TEAM</h3>
              <p className="text-sm">
                You'll join a group of friendly, passionate, hard-working,
                creative and intelligent people.
              </p>
            </div>

            <div className="md:border-r border-gray-300 pr-6">
              <h3 className="font-bold text-lg mb-3">
                LIVE & WORK IN BENGALURU
              </h3>
              <p className="text-sm">
                Live and work in Bangalore, where summers are actually cool.
              </p>
            </div>

            <div className="md:border-r border-gray-300 pr-6">
              <h3 className="font-bold text-lg mb-3">
                WORK WITH THE LATEST TECH
              </h3>
              <p className="text-sm">
                Always be working on the latest web and mobile technologies.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">
                CRICKET, ALL THE TIME!
              </h3>
              <p className="text-sm">
                Enjoy cricket while you are at work.
              </p>
            </div>

          </div>

          {/* CURRENT OPENINGS */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-8">CURRENT OPENINGS</h2>

            {/* FULL PAGE LOADER */}
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-2 text-sm text-blue-600">Loading Jobs...</p>
                </div>
              </div>
            )}

            {/* No Data */}
            {!loading && jobs.length === 0 && (
              <p className="text-gray-500">No openings available</p>
            )}

            {/* Data */}
            {!loading && jobs.length > 0 && (
              <div className="space-y-10">

                {departments.map((dept, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4">

                    <div className="font-semibold text-lg">{dept}</div>

                    <div className="md:col-span-3 space-y-3">
                      {jobs
                        .filter((job) => job.department === dept)
                        .map((job, index) => (
                          <p
                            key={index}
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            {job.title} {job.location && `- ${job.location}`}
                          </p>
                        ))}
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Careers;