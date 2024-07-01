import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Footer = ({ searchRef }) => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleAccClick = () => {
    if (!isLoggedIn) {
      toast.error("Log In to see account");
    } else {
      navigate("/my-orders");
    }
  };

  const handleShopClick = () => {
    if (searchRef.current) searchRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Email successfully registered");
    setEmail("");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 bg-slate-800 text-white p-4">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-2xl">Exclusive</h2>
        <h4>Subscribe</h4>
        <p>Get 10% off your first order</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-2"
        >
          <input
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded text-black"
          />
          <button type="submit" className="bg-blue-500 p-2 rounded text-white">
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-2xl">Support</h2>
        <p className="text-center">
          Block C-12, Flat No-20 Near Harihar Mandir
          <br />
          Vikasnagar Shimla
        </p>
        <p>namantanwar886@gmail.com</p>
        <p>1234567890</p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-2xl cursor-pointer" onClick={handleAccClick}>
          My Account
        </h2>
        <p className="cursor-pointer" onClick={() => navigate("/login")}>
          Login/Register
        </p>
        <p className="cursor-pointer" onClick={() => navigate("/cart")}>
          Cart
        </p>
        <p className="cursor-pointer" onClick={() => navigate("/wishlist")}>
          Wishlist
        </p>
        <p className="cursor-pointer" onClick={handleShopClick}>
          Shop
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2
          className="text-2xl cursor-pointer"
          onClick={() => navigate("/about-us")}
        >
          Quick Link
        </h2>
        <p className="cursor-pointer" onClick={() => navigate("/about-us")}>
          Privacy Policy
        </p>
        <p className="cursor-pointer" onClick={() => navigate("/about-us")}>
          Terms Of Use
        </p>
        <p className="cursor-pointer" onClick={() => navigate("/contact-us")}>
          FAQ
        </p>
        <p className="cursor-pointer" onClick={() => navigate("/contact-us")}>
          Contact
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-2xl">Follow Us on Social Media</h2>
        <p className="text-center">
          Follow us on Social Media and never miss an update
        </p>
        <div className="flex space-x-2">
          <a href="www.linkedin.com/in/naman-tanwar-966299207">
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="www.linkedin.com/in/naman-tanwar-966299207"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiTwitterXLine className="text-2xl" />
          </a>
          <a
            href="www.linkedin.com/in/naman-tanwar-966299207"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="www.linkedin.com/in/naman-tanwar-966299207"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
