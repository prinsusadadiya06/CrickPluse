import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Contact: React.FC = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/contact", form);

      alert("Message sent successfully");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error: any) {
      alert(error.response?.data?.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-200">

      {/* HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <div className="pb-6 md:pb-40 px-4 md:px-6">

        {/* White Content Box */}
        <div className="max-w-6xl mx-auto bg-white md:p-10 md:mt-[40px] md:rounded md:shadow grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* FEEDBACK FORM */}
          <div>
            <h2 className="text-2xl font-bold my-2">Feedback</h2>

            <p className="text-sm mb-6 hidden md:block">
              Your feedback matters. Write to us if you have any questions,
              queries or suggestions regarding any page/content published on
              crickpulse.com.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm mt-3 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter the name"
                  className="w-full border border-gray-400 px-3 py-2 bg-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email Id</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  className="w-full border border-gray-400 px-3 py-2 bg-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter the subject"
                  className="w-full border border-gray-400 px-3 py-2 bg-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your issue"
                  rows={4}
                  className="w-full border border-gray-400 px-3 py-2 bg-gray-100"
                  required
                />
              </div>

              <div>
                <p className="text-sm mb-2">
                  Upload screenshot of error or issue (jpg,png,gif) (optional)
                </p>
                <input type="file" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-10 py-2 rounded w-full md:w-auto"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

            </form>
          </div>

          {/* CONTACT DETAILS */}
          <div className="border-l border-gray-300 pl-8 hidden md:block">
            <h2 className="text-2xl font-bold mb-3">Office Contact Details</h2>

            <div className="text-sm leading-relaxed">
              <p>CrickPulse Platforms LTD.</p>
              <p>Regd. Office: Express Building,</p>
              <p>9-10, Bahadurshah Zafar Marg,</p>
              <p>New Delhi - 110002, INDIA</p>

              <p className="mt-2">Corp. Office: No. 190-B, 2nd Floor,</p>
              <p>HN Plaza, 100 Ft Ring road,</p>
              <p>6th Main, BSK 3rd Stage,</p>
              <p>Bangalore - 560085, INDIA</p>

              <p className="mt-2">
                Phone : <span className="font-semibold">080-2679062</span>
              </p>
            </div>

            {/* MAP */}
            <div className="mt-4 w-full h-[250px] border">
              <iframe
                title="map"
                width="100%"
                height="100%"
                loading="lazy"
                className="w-full h-full"
                src="https://www.google.com/maps?q=India&output=embed"
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

export default Contact;