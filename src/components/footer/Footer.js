import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { logo } from "../../assets/index";
import Title from '../layouts/Title'
const Footer = () => {
  return (
    <>
    <div className="flex justify-center items-center text-center">
        <Title
          
          des="Future code? Let's connect!"
        />
      </div>
      <div className="w-full h-auto border-b-black grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 gap-8 place-items-center text-center">
  {/* GitHub */}
  <a
    href="https://github.com/Bubalan0203"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2"
  >
    <span className="text-[20px]">
      <FaGithub />
    </span>
    <p>GitHub</p>
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/918667859174"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2"
  >
    <span className="text-[20px]">
      <FaWhatsapp />
    </span>
    <p>WhatsApp</p>
  </a>

  {/* Email */}
  <a
    href="mailto:bubalan28@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2"
  >
    <span className="text-[20px]">
      <FaEnvelope />
    </span>
    <p>Email</p>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/bubalans?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2"
  >
    <span className="text-[20px]">
      <FaLinkedinIn />
    </span>
    <p>LinkedIn</p>
  </a>
</div>



    </>
  );
}

export default Footer;
