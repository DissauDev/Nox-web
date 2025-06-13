import React, { useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import RestaurantMap from "@/components/atoms/home/RestaurantMap";

const faqs = [
  {
    question: "Do I have to pay for return shipping?",
    answer:
      "No. We provide free return shipping on all domestic orders. Just print the pre-paid label included in your original shipment and drop the package at any carrier location.",
  },
  {
    question: "Are there any items that cannot be returned?",
    answer:
      "Yes. For hygiene and safety reasons we cannot accept returns on perishable goods, gift cards, or any item marked “Final Sale.” All other products can be returned within 30 days of delivery.",
  },
  /* {
    question: "How do I initiate a return?",
    answer:
      "Log in to your account, go to “Orders,” select the order you’d like to return, and click “Start a Return.” Follow the on-screen prompts to choose items and print your return label.",
  },*/
  {
    question: "Can I use multiple payment methods for a single order?",
    answer:
      "Currently we only support one payment method per order. If you’d like to split payment, you can place two separate orders and use a different method on each.",
  },
  {
    question: "When will my credit card be charged for my order?",
    answer:
      "Your credit card is authorized at the time you place the order, but the actual charge posts when your order ships. You’ll receive a shipping confirmation email with the exact date and amount.",
  },
];

export const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="">
      {/* Sección Header */}
      <div className="">
        <div className="flex items-center justify-center flex-col p-6 py-24 bg-grape-950">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white text-lg font-semibold uppercase tracking-wide"
          >
            Get in Touch
          </motion.h3>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white font-bold text-5xl my-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className=" font-medium text-center max-w-xl"
          >
            Got questions, feedback, or just want to say hello? We're all ears!
            Get in touch with our friendly team and we'll be happy to assist you
            in any way we can.
          </motion.p>
        </div>
      </div>
      {/* Sección de Información de Contacto con animación al hacer scroll */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex flex-wrap text-grape-950 p-4 items-center justify-evenly"
      >
        <a
          href="https://www.google.com/maps/search/?api=1&query=422+E+Campbell+Ave,+Campbell,+CA+95008"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col m-2 justify-center items-center"
        >
          <LuMapPin size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">Address</h1>
          <h3 className="font-ArialBold text-sm text-gray-500">
            422 E Campbell Ave, Campbell, CA 95008
          </h3>
        </a>
        <a
          className="flex flex-col m-2 justify-center items-center"
          href="tel:+16692739216"
        >
          <IoPhonePortraitOutline size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">Phone Number</h1>
          <h3 className="font-ArialBold text-sm text-gray-500">
            (669) 273-9216
          </h3>
        </a>
        <a
          className="flex flex-col m-2 justify-center items-center"
          href="mailto:info@noxcookiebar.com"
        >
          <TfiEmail size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">E-mail Address</h1>
          <h3 className="font-ArialBold text-sm text-gray-500">
            info@noxcookiebar.com
          </h3>
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=422+E+Campbell+Ave,+Campbell,+CA+95008"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col m-2 justify-center items-center"
        >
          <FaRegCalendarDays size={50} className="mb-4" />
          <h1 className="font-ArialBold text-xl">Business Hours</h1>
          <h3 className="font-ArialBold text-sm text-gray-500">
            Mon - Sun / 11:30AM - 11:00PM
          </h3>
        </a>
      </motion.div>
      {/* Sección de Formulario y FAQ con animación al hacer scroll */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-4 mt-8 flex flex-col md:flex-row justify-around"
      >
        {/* Formulario de contacto 
        <div className="w-full md:w-5/12 rounded-lg p-6">
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
              className="w-full bg-grape-900 font-ArialBold text-white py-2 rounded-md hover:bg-grape-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>*/}
        {/* Preguntas Frecuentes */}
        <div className="w-full lg:pb-24 md:w-6/12 p-6">
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
      </motion.div>
      {/* Sección del Mapa sin animación de scroll */}
      <div className="flex justify-center items-center">
        <div className="w-full mb-10">
          <RestaurantMap />
        </div>
      </div>
    </div>
  );
};
