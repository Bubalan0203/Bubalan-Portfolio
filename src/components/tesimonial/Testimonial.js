import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";
import { RiStarFill } from "react-icons/ri";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import Title from '../layouts/Title';
import { testimonialOne, testimonialTwo, quote } from "../../assets";
import { FaArrowRight } from "react-icons/fa";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-0 shadow-shadowOne cursor-pointer z-10"
      onClick={onClick}
    >
      <HiArrowRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-20 shadow-shadowOne cursor-pointer z-10"
      onClick={onClick}
    >
      <HiArrowLeft />
    </div>
  );
}

const Testimonial = () => {
  const [dotActive, setDocActive] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div style={{ borderRadius: "10px", padding: "10px" }}>
        <ul
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "12px",
                height: "12px",
                background: "#ff014f",
                borderRadius: "50%",
                cursor: "pointer",
              }
            : {
                width: "12px",
                height: "12px",
                background: "gray",
                borderRadius: "50%",
                cursor: "pointer",
              }
        }
      ></div>
    ),
  };

  return (
    <section
      id="testimonial"
      ref={sectionRef}
      className="w-full py-20 border-b-black transition-all duration-700 ease-in-out"
      style={{
        transform: visible ? "translateY(0px)" : "translateY(100px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="flex justify-center items-center text-center">
        <Title title="My Coding Arena" des="Competitive Programming | LeetCode" />
      </div>

      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          <div className="w-full">
            <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
              <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 rounded-lg shadow-shadowOne flex flex-col md:flex-row lgl:flex-col gap-8 justify-center md:justify-start lgl:justify-center">
                <img
                  className="rounded-lg object-cover"
                  src="https://leetcard.jacoblin.cool/Bubalan_Shanmuga_sundaram?theme=dark&font=Baloo%202&ext=heatmap"
                  alt="LeetCode Card"
                />
                <div className="w-full flex flex-col justify-end">
                  <p className="text-xs uppercase text-designColor tracking-wide mb-2">
                    Beyond Code
                  </p>
                  <h3 className="text-2xl font-bold">Driven by Tech & Growth</h3>
                  <p className="text-base tracking-wide text-gray-500">
                    I'm channeling my energy into competitive programming on platforms like LeetCode —
                    constantly sharpening my coding skills and striving for excellence. <br />
                    I also enjoy building real-world projects that combine creativity and functionality,
                    helping me grow as a well-rounded developer.
                  </p>
                </div>
              </div>

              <div className="w-full lgl:w-[60%] h-full flex flex-col justify-between">
                <img className="w-20" src={quote} alt="quote" />
                <div className="w-full h-[70%] py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] rounded-lg shadow-shadowOne p-4 lgl:p-8 flex flex-col justify-center gap-4 lgl:gap-8">
                  <div className="flex flex-col justify-between lgl:items-center py-6 border-b-2 border-b-gray-900">
                    <div>
                      <h3 className="text-xl lgl:text-2xl font-medium tracking-wide text-white">
                        Aspiring Software Engineer – Open to Work
                      </h3>
                      <p className="text-base text-gray-400 mt-3 max-w-xl">
                        I am a dedicated and innovative Software Systems student, currently seeking
                        internship or full-time opportunities as a Software Development Engineer (SDE)
                        or Software Engineer (SWE).
                        <span className="text-[rgb(255,1,79)] font-semibold ml-1">
                          Check out my resume below for more details.
                        </span>
                      </p>

                      <div className="w-full float-left">
                      <a
  href="/Bubalan.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="group mt-4 inline-flex items-center text-[rgb(255,1,79)] font-semibold transition-all duration-300"
>
  View Resume
  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-20">
    <FaArrowRight className="text-[rgb(255,1,79)] text-2xl" />
  </span>
</a>

                      </div>
                    </div>
                  </div>

                  <p className="text-base font-titleFont text-gray-400 font-medium tracking-wide leading-6">
                    "By engaging in dedicated LeetCode practice sessions, I continuously drove
                    improvement in my coding acumen, unraveling novel methodologies to tackle
                    algorithmic challenges with finesse and creativity. This exemplified my commitment
                    to excellence as I harnessed the platform's rich repository of problems to refine my
                    problem-solving instincts and foster a deep-seated love for algorithmic elegance."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
