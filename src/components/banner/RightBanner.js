// import React from 'react';
// import styled, { keyframes } from 'styled-components';

// const RightBanner = () => {
//   return (
//     <Wrapper className="hidden lgl:flex w-full lgl:w-1/2 justify-center items-center relative">
//       <MernContainer>
//         <div className="wrapper">
//           <Text>
//             <div className="line">
//               <p>MONGODB</p>
//               <p></p>
//             </div>
//             <div className="line">
//               <p>MONGODB</p>
//               <p>EXPRESS</p>
//             </div>
//             <div className="line">
//               <p>EXPRESS</p>
//               <p>REACT</p>
//             </div>
//             <div className="line last">
//               <p>REACT</p>
//               <p>NODE</p>
//             </div>
//             <div className="line first">
//               <p>NODE</p>
//               <p>JS</p>
//             </div>
//           </Text>
//         </div>
//       </MernContainer>
//     </Wrapper>
//   );
// };

// export default RightBanner;

// // Styled Components

// const moveWords = keyframes`
//   0% { transform: translateY(0%); }
//   15% { transform: translateY(0%); }
//   40% { transform: translateY(-100%); }
//   60% { transform: translateY(-100%); }
//   85% { transform: translateY(0%); }
//   100% { transform: translateY(0%); }
// `;

// const Wrapper = styled.div`
//   background: transparent;
//   overflow: hidden;
// `;

// const MernContainer = styled.div`
//   height: 500px;
//   max-width: 100%;
//   overflow-x: hidden;

//   .wrapper {
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const Text = styled.h1`
//   font-size: 48px;
//   text-transform: uppercase;
//   font-weight: bold;
//   text-align: center;
//   color: #000;
//   max-width: 100%;
//   flex-wrap: wrap;
//   overflow: hidden;

//   .line {
//     overflow: hidden;
//     white-space: nowrap;
//     height: 48px;
//     line-height: 0.9;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     p {
//       margin: 0;
//       height: 48px;
//       font-size: 1em;
//       line-height: 0.8;
//       white-space: nowrap;
//       animation: ${moveWords} 5s infinite ease-in-out;
//       color: rgb(255 1 79 / var(--tw-text-opacity));
//     }
//   }

//   .line:nth-child(odd) {
//     transform: skew(60deg, -20deg) scaleY(0.66667);
//   }

//   .line:nth-child(even) {
//     transform: skew(0deg, -20deg) scaleY(1.33333);
//   }

//   .line.last {
//     margin-left: 140px;
//   }

//   .line.first {
//     margin-left: 180px;
//   }

//   p::first-letter {
//     color: #ffffff;
//   }

//   @media (max-width: 1024px) {
//     font-size: 30px;

//     .line {
//       height: 36px;

//       p {
//         height: 36px;
//       }
//     }

//     .line.last {
//       margin-left: 80px;
//     }

//     .line.first {
//       margin-left: 100px;
//     }
//   }

//   @media (max-width: 768px) {
//     font-size: 28px;

//     .line {
//       height: 28px;

//       p {
//         height: 28px;
//       }
//     }

//     .line.last,
//     .line.first {
//       margin-left: 20px;
//     }
//   }
// `;

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const RightBanner = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDirection(currentY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Wrapper className="hidden lgl:flex w-full lgl:w-1/2 justify-center items-center relative">
      <MernContainer>
        <div className="wrapper">
          <Text>
            <div
              className="line"
              style={{
                opacity: scrollDirection === 'down' ? 0 : 1,
                transform: scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.6s ease 0s',
              }}
            >
              <p>MONGODB</p>
              <p></p>
            </div>
            <div
              className="line"
              style={{
                opacity: scrollDirection === 'down' ? 0 : 1,
                transform: scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.6s ease 0.15s',
              }}
            >
              <p>MONGODB</p>
              <p>EXPRESS</p>
            </div>
            <div
              className="line"
              style={{
                opacity: scrollDirection === 'down' ? 0 : 1,
                transform: scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.6s ease 0.3s',
              }}
            >
              <p>EXPRESS</p>
              <p>REACT</p>
            </div>
            <div
              className="line last"
              style={{
                opacity: scrollDirection === 'down' ? 0 : 1,
                transform: scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.6s ease 0.45s',
              }}
            >
              <p>REACT</p>
              <p>NODE</p>
            </div>
            <div
              className="line first"
              style={{
                opacity: scrollDirection === 'down' ? 0 : 1,
                transform: scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.6s ease 0.6s',
              }}
            >
              <p>NODE</p>
              <p>JS</p>
            </div>
          </Text>
        </div>
      </MernContainer>
    </Wrapper>
  );
};

export default RightBanner;

// Styled Components (unchanged)

const moveWords = keyframes`
  0% { transform: translateY(0%); }
  15% { transform: translateY(0%); }
  40% { transform: translateY(-100%); }
  60% { transform: translateY(-100%); }
  85% { transform: translateY(0%); }
  100% { transform: translateY(0%); }
`;

const Wrapper = styled.div`
  background: transparent;
  overflow: hidden;
`;

const MernContainer = styled.div`
  height: 500px;
  max-width: 100%;
  overflow-x: hidden;

  .wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Text = styled.h1`
  font-size: 48px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  color: #000;
  max-width: 100%;
  flex-wrap: wrap;
  overflow: hidden;

  .line {
    overflow: hidden;
    white-space: nowrap;
    height: 48px;
    line-height: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 0;
      height: 48px;
      font-size: 1em;
      line-height: 0.8;
      white-space: nowrap;
      animation: ${moveWords} 5s infinite ease-in-out;
      color: rgb(255 1 79 / var(--tw-text-opacity));
    }
  }

  .line:nth-child(odd) {
    transform: skew(60deg, -20deg) scaleY(0.66667);
  }

  .line:nth-child(even) {
    transform: skew(0deg, -20deg) scaleY(1.33333);
  }

  .line.last {
    margin-left: 140px;
  }

  .line.first {
    margin-left: 180px;
  }

  p::first-letter {
    color: #ffffff;
  }

  @media (max-width: 1024px) {
    font-size: 30px;

    .line {
      height: 36px;

      p {
        height: 36px;
      }
    }

    .line.last {
      margin-left: 80px;
    }

    .line.first {
      margin-left: 100px;
    }
  }

  @media (max-width: 768px) {
    font-size: 28px;

    .line {
      height: 28px;

      p {
        height: 28px;
      }
    }

    .line.last,
    .line.first {
      margin-left: 20px;
    }
  }
`;

