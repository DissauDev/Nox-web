import React, { useRef, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Menu = () => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("for-you");
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const sections = [
    { id: "for-you", label: "For You" },
    { id: "boxes", label: "Boxes" },
    { id: "ice-cream", label: "Ice Cream" },
    { id: "drinks", label: "Drinks" },
    { id: "cookies", label: "Cookies" },
    { id: "others", label: "Others" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY;

      // Verifica si el tab bar debe estar en modo sticky
      if (tabsRef.current) {
        const tabsTop = tabsRef.current.offsetTop;
        setIsSticky(fromTop > tabsTop);
      }

      // Actualiza la pestaña activa según la sección visible
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          return fromTop >= offsetTop - 100 && fromTop < offsetBottom - 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveTab(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 60, behavior: "smooth" });
    }
  };

  const handleItemClick = (category: string, id: number) => {
    navigate(`/products/${category}/${id}`);
  };

  return (
    <div>
      <div className="border-b border-gray-300"></div> {/* Línea divisoria */}
      <div
        ref={tabsRef}
        className={`sticky top-[80px] z-40 py-2 transition-all ${
          activeTab === "for-you" && !isSticky
            ? "bg-white text-purple-700 shadow-none"
            : "bg-purple-700 text-white shadow-md"
        }`}
      >
        <ul className="flex justify-around text-sm font-medium">
          {sections.map((section) => (
            <li
              key={section.id}
              onClick={() => handleTabClick(section.id)}
              className={`cursor-pointer px-4 py-2 ${
                activeTab === section.id ? "border-b-2" : "hover:underline"
              } ${
                activeTab === "for-you" && !isSticky
                  ? "border-purple-700 hover:text-purple-500"
                  : "border-white hover:text-white"
              }`}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6">
        {sections.map((section) => (
          <div id={section.id} key={section.id} className="my-8">
            <h2 className="text-2xl font-bold mb-4">{section.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleItemClick(section.id, index + 1)}
                >
                  <p>
                    {section.label} Item {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Menu;
