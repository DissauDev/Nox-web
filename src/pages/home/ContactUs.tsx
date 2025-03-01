import React, { useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const faqs = [
  {
    question: "Do I have to pay for return shipping?",
    answer:
      "Donec risus nulla, fringilla a rhoncus vitae, semper a massa. Vivamus ullamcorper, enim sit amet consequat laoreet, tortor tortor dictum urna, ut egestas urna ipsum nec libero.",
  },
  {
    question: "Are there any items that cannot be returned?",
    answer:
      "Vivamus ullamcorper, enim sit amet consequat laoreet, tortor tortor dictum urna, ut egestas urna ipsum nec libero. Nulla justo leo, molestie vel tempor nec, egestas at massa.",
  },
  {
    question: "How do I initiate a return?",
    answer:
      "In eu ipsum vitae velit congue iaculis vitae at risus. Nullam tortor nunc, bibendum vitae semper a, volutpat eget massa.",
  },
  {
    question: "Can I use multiple payment methods for a single order?",
    answer:
      "Vivamus ullamcorper, enim sit amet consequat laoreet, tortor tortor dictum urna, ut egestas urna ipsum nec libero. Nulla justo leo, molestie vel tempor nec, egestas at massa.",
  },
  {
    question: "When will my credit card be charged for my order?",
    answer:
      "Integer fringilla, orci sit amet posuere auctor, orci eros pellentesque odio, nec pellentesque erat ligula nec massa. Aenean consequat lorem ut felis ullamcorper posuere gravida tellus faucibus. ",
  },
];

export const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div>
      <div className="">
        <div className="items-center justify-center flex flex-col p-4 py-24">
          <h3 className="text-grape-950 font-ArialBold">Get in Touch</h3>
          <h1 className="text-grape-900 font-ArialBold text-4xl my-4">
            Contact us
          </h1>
          <h3 className="text-gray-500 font-ArialBold max-w-2xl mx-auto text-center">
            Got questions, feedback, or just want to say hello? We're all ears!
            Get in touch with our friendly team and we'll be happy to assist you
            in any way we can.
          </h3>
        </div>
      </div>
      <div className=" flex flex-wrap text-grape-950 p-4 items-center m lg:grid-cols-4 justify-evenly">
        <div className=" flex flex-col  m-2 justify-center items-center">
          <LuMapPin size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl ">Address</h1>
          <h3 className="font-ArialBold text-sm text-gray-700 ">
            422 E Campbell Ave, Campbell, CA 95008
          </h3>
        </div>
        <div className=" flex flex-col  m-2 justify-center items-center">
          <IoPhonePortraitOutline size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">Phone Number</h1>
          <h3 className="font-ArialBold text-sm text-gray-700 ">
            (669) 273-9216
          </h3>
        </div>
        <div className=" flex flex-col   m-2 justify-center items-center">
          <TfiEmail size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">E-mail Address</h1>
          <h3 className="font-ArialBold text-sm text-gray-700 ">
            info@noxcookiebar.com
          </h3>
        </div>
        <div className=" flex flex-col  m-2 justify-center items-center">
          <FaRegCalendarDays size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">Business Hours</h1>
          <h3 className="font-ArialBold text-sm text-gray-700">
            Mon - Sun / 11:30AM - 11:00PM
          </h3>
        </div>
      </div>

      <div className=" p-4 mt-8 flex flex-col md:flex-row justify-around">
        {/* Formulario de contacto */}
        <div className=" w-full md:w-5/12 rounded-lg p-6">
          <h2 className="text-2xl text-grape-900 font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-grape-900 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-grape-900"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-grape-900 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-grape-900"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-grape-900 font-medium mb-1">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-grape-900"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-grape-900 text-white py-2 rounded-md hover:bg-grape-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Preguntas Frecuentes */}
        <div className=" w-full lg:pb-24 md:w-6/12 p-6 ">
          <h2 className="text-2xl text-grape-900 font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-grape-900 hover:bg-grape-700 transition cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-left font-medium text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="size-5 text-white" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                  layout
                >
                  <div className="p-4 text-gray-500 text-sm">{faq.answer}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
