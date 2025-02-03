import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold">Insomnia Cookies</h2>
            <p className="text-gray-400 mt-2">Warm. Delicious. Delivered.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Franchise
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 bg-rose-600 w-full pt-4">
          <p>
            &copy; {new Date().getFullYear()} Insomnia Cookies. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
