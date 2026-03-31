import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";

const Advertise: React.FC = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    city: "",
    subject: "",
    requirements: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.placeholder || e.target.name]: e.target.value
    });
  };

  // Better handling using name attribute
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("https://crickpluse.onrender.com/api/advertise", formData);

       toast.success("Submitted successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        company: "",
        city: "",
        subject: "",
        requirements: ""
      });

    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-200">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="px-2 md:py-10  md:pb-0 pb-[85px] py-3 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white md:p-10 md:rounded-md md:shadow">

          {/* LEFT FORM */}
          <div className="w-full md:w-[67%] min-h-page relative md:p-3.5 md:border-r">
            <h1 className="text-2xl font-semibold mb-2">Advertise With Us</h1>

            <p className="text-sm text-gray-700 mb-6 hidden md:block">
              Please give us your contact details and a short note on your requirements.
              Our ad sales team will get back to you.
            </p>

            {message && (
              <p className="mb-3 text-green-600 text-sm">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="w-full">
                <label className="text-sm">Name</label><br />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter the name"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1"
                  required
                />
              </div>

              <div className="w-full">
                <label className="text-sm">Email Id</label><br />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter your email id"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1"
                  required
                />
              </div>

              <div className="w-full">
                <label className="text-sm">Mobile (Optional)</label><br />
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter mobile number for contact"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1"
                />
              </div>

              <div className="w-full">
                <label className="text-sm">Company</label><br />
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Company name"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1"
                />
              </div>

              <div className="w-full">
                <label className="text-sm">City</label><br />
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter the city"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1"
                />
              </div>

              <div className="w-full">
                <label className="text-sm">Subject</label><br />
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter the subject"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1"
                />
              </div>

              <div className="w-full">
                <label className="text-sm">Requirements</label><br />
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Describe your requirement"
                  className="md:w-[70%] w-full border border-gray-400 px-3 py-2 mt-1 h-28"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 w-full md:w-auto text-white px-6 py-2 mt-3"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:block md:w-[33%] bg-white p-6">
            <h2 className="text-xl font-semibold mb-3">Office Contact Details</h2>

            <div className="text-sm text-gray-800 leading-6 mb-4">
              <p>CrickPluse Platforms LTD.</p>
              <p>Regd. Office: Express Building,</p>
              <p>9-10, Bahadurshah Zafar Marg,</p>
              <p>New Delhi, - 110002, INDIA</p>

              <br />

              <p>Corp. Office: No. 190-B, 2nd Floor,</p>
              <p>HN Plaza,100 Ft Ring road,</p>
              <p>6th Main, BSK 3rd Stage,</p>
              <p>Bangalore - 560085, INDIA</p>

              <p className="mt-2">
                Phone : <span className="font-semibold">080-2679062</span>
              </p>
            </div>

            <div className="border w-full h-[280px] overflow-hidden">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=India&output=embed"
                className="w-full h-full border-0"
              ></iframe>
            </div>
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

export default Advertise;