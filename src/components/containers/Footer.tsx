/* eslint-disable @typescript-eslint/ban-ts-comment */
//import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import ImageNox from "../../assets/home/logo.png";
import Pattern from "../../assets/desing/pattern.png";
import { Link } from "react-router-dom";
import { useGetPageBySlugQuery } from "@/store/features/api/pageApi";
import parse, { domToReact, Element } from "html-react-parser";
import DOMPurify from "dompurify";

type Section = { key: string; html: string };
type Layout = { sections: Section[]; css?: string };

const Footer = () => {
  // 1) Llamada RTK Query para slug="home"
  const {
    data: pageData,
    error: pageError,
    isLoading,
  } = useGetPageBySlugQuery("footer");

  // 2) Función auxiliar para renderizar una sección concreta si existe
  const renderSection = (sections: Section[], key: string) => {
    const sec = sections.find((s) => s.key === key);
    if (!sec) return null;

    // a) Des-escapar barras y comillas
    // 1) des-escapar y sanear
    const unescaped = sec.html.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    const cleanHtml = DOMPurify.sanitize(unescaped);

    // 2) parsear y reemplazar <a> por <Link>
    const reactTree = parse(cleanHtml, {
      replace: (node) => {
        // buscamos elementos <a>
        if (node instanceof Element && node.name === "a") {
          const href = node.attribs.href;
          const className = node.attribs.class || node.attribs.className;
          // children puede ser texto o más nodos
          return (
            <Link to={href} className={className}>
              {/*@ts-ignore */}
              {domToReact(node.children, { replace: undefined })}
            </Link>
          );
        }
      },
    });

    return <div>{reactTree}</div>;
  };

  // 3) Mientras carga, mostramos un indicador simple
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // 4) Si hay error, NO salimos: mostramos los componentes estáticos por defecto
  const hasError = Boolean(pageError);

  // 5) Si la petición fue exitosa, extraemos layout.sections y layout.css
  let sections: Section[] = [];
  let cssFromBackend = "";

  if (!hasError && pageData) {
    const layout = pageData.layout as unknown;
    let layoutObj: Layout = { sections: [] };

    if (typeof layout === "string") {
      try {
        layoutObj = JSON.parse(layout);
      } catch {
        layoutObj = { sections: [] };
      }
    } else if (layout && typeof layout === "object") {
      layoutObj = layout as Layout;
    }

    sections = layoutObj.sections || [];
    cssFromBackend = layoutObj.css || "";
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* 6) Inyectamos CSS si existe y no hubo error */}
      {!hasError && cssFromBackend && (
        <style
          dangerouslySetInnerHTML={{
            __html: cssFromBackend.replace(/\\"/g, '"'),
          }}
        />
      )}
      {/* Sección principal de enlaces */}

      {renderSection(sections, "FooterSection1") || (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Grid de enlaces sin títulos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {/* Columna 1: Enlaces de Orders */}
            <div className="flex flex-col space-y-2">
              <a className="hover:text-gray-300 font-ArialBold">Orders</a>

              <Link
                to="/account/orders"
                className="hover:text-gray-300 font-ArialRegular"
              >
                My Orders
              </Link>
            </div>
            {/* Columna 2: Enlaces de Company */}
            <div className="flex flex-col space-y-2">
              <Link
                to="/contact-us"
                className="hover:text-gray-300 font-ArialBold"
              >
                Contact us
              </Link>

              <Link
                to="/contact-us#info"
                className="hover:text-gray-300 font-ArialRegular"
              >
                Info
              </Link>
              <Link
                to="/contact-us#faq"
                className="hover:text-gray-300 font-ArialRegular"
              >
                FAQS
              </Link>
              <Link
                to="/contact-us#map"
                className="hover:text-gray-300 font-ArialRegular"
              >
                Map
              </Link>
            </div>
            {/* Columna 3: Enlaces de Support */}
            <div className="flex flex-col space-y-2">
              <Link
                to={"/account/dashboard"}
                className="hover:text-gray-300 font-ArialBold"
              >
                Profile
              </Link>
              <Link
                to={"/account/details"}
                className="hover:text-gray-300 font-ArialRegular"
              >
                Account Details
              </Link>
              <Link
                to={"privacy-policy"}
                className="hover:text-gray-300 font-ArialRegular"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/terms"}
                className="hover:text-gray-300 font-ArialRegular"
              >
                Terms of Service
              </Link>
              <Link
                to={"/account/wishlist"}
                className="hover:text-gray-300 font-ArialRegular"
              >
                WhishList
              </Link>
            </div>
            {/* Columna 4: Otros Enlaces (ejemplo: Blog, Press, etc.) */}
            <div className="flex flex-col space-y-2">
              <a className="hover:text-gray-300 font-ArialBold">Links</a>
              <Link
                target="_blank"
                to="https://nox.dissau.site/blog/"
                className="hover:text-gray-300"
              >
                Blog
              </Link>
              <Link
                target="_blank"
                to={
                  "https://www.google.com/maps/search/?api=1&query=422+E+Campbell+Ave,+Campbell,+CA+95008"
                }
                className="hover:text-gray-300 font-ArialRegular"
              >
                Google Map
              </Link>
            </div>
          </div>
        </div>
      )}
      {renderSection(sections, "FooterSection2") || (
        <div className="relative  w-full bg-black-night-950 overflow-hidden py-4">
          {/* Fondo patrón gris oscuro */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${Pattern})`,
              backgroundRepeat: "repeat",
              backgroundSize: "1200px",
              backgroundPosition: "center",
              opacity: 0.05,
              filter: "grayscale(1) brightness(0.5)",
              backgroundBlendMode: "multiply",
            }}
          />
          {/* Contenido */}
          <div className="relative z-10 max-w-6xl mx-auto flex justify-center">
            <img src={ImageNox} alt="Imagen Central" className="h-24" />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
