import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import gsap from "gsap";
import anime from "animejs/lib/anime.es.js";

interface SportsAnimatedSplashScreenProps {
  onComplete?: () => void;
}

export default function SportsAnimatedSplashScreen({ onComplete }: SportsAnimatedSplashScreenProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else {
        setTimeout(() => {
          setLoading(false);
          if (onComplete) onComplete();
        }, 500);
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  useEffect(() => {
    // Initialize animations
    initAnimations();
  }, []);

  // Utility Functions
  const hide = (elem: string) => {
    const tl = gsap.timeline();
    tl.to(elem, { autoAlpha: 0, duration: 0.1 }).to(elem, { display: "none", duration: 0.1 });
    return tl;
  };
  
  const show = (elem: string) => {
    const tl = gsap.timeline();
    tl.to(elem, { autoAlpha: 1, duration: 0.1 }).to(elem, { display: "block", duration: 0.1 });
    return tl;
  };

  // Soccer 1 Animation Steps
  const soccer1Animations = {
    ballLines: () => anime({
      targets: ".soccer1ball .soccer1ball-line > *",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: (el, i) => 1000 + i * 140,
      autoplay: false,
    }),
    backLines: () => anime({
      targets: ".soccer1_extra-line > *",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: (el, i) => 1000 + i * 50,
      autoplay: false,
    }),
    bodyLines: () => anime({
      targets: ".soccer1_line > *",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: (el, i) => 1000 + i * 20,
      autoplay: false,
    }),
    ballTimeline: () => {
      const ballLines = soccer1Animations.ballLines();
      const ball = gsap.timeline({
        onStart: () => ballLines.play(),
      });
      ball
        .staggerFromTo(
          ".soccer1ball g:nth-child(1) > *",
          0.5,
          { scale: 0 },
          { scale: 1 },
          0.2
        )
        .to(".soccer1ball", {
          rotation: 760,
          x: 2000,
          transformOrigin: "50% 50%",
          ease: "expo.out",
          duration: 3,
          delay: 1,
        })
        .to(".soccer1ball", { autoAlpha: 0, duration: 1 }, "-=1");
      return ball;
    },
    backTimeline: () => {
      const backLines = soccer1Animations.backLines();
      const back = gsap.timeline({
        onStart: () => backLines.play(),
        onComplete: () => {
          backLines.reverse();
          gsap.to(
            ".soccer1_extra-line > g",
            {
              scale: 0, 
              transformOrigin: "50% 50%", 
              ease: "bounce.out",
              duration: 1,
              stagger: 0.2
            },
          );
        },
      });
      back.staggerFromTo(
        ".soccer1_extra-line > g",
        1,
        { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
        { x: 0, rotation: 0, ease: "power4.out" },
        0.5
      );
      return back;
    },
    bodyTimeline: () => {
      const bodyLines = soccer1Animations.bodyLines();
      const timeline = gsap.timeline({
        ease: "expo.out",
        onStart: () => bodyLines.play(),
        onComplete: () => {
          bodyLines.reverse();
          setTimeout(() => {
            gsap.to(
              ".soccer1_fill > *",
              {
                scale: 0, 
                transformOrigin: "50% 50%",
                duration: 0.2,
                stagger: 0.01
              }
            );
          }, 2000);
        },
      });
      timeline.staggerFromTo(
        ".soccer1_fill > *",
        0.3,
        { x: -4500 },
        { x: 0 },
        0.03
      );
      return timeline;
    },
  };

  // Soccer 2 Animation Steps
  const soccer2Animations = {
    bodyLines: () => anime({
      targets: ".soccer2_line path",
      strokeDashoffset: [anime.setDashoffset, 99200],
      easing: "easeInOutSine",
      duration: 2500,
      delay: (el, i) => 1000 + i * 20,
      autoplay: false,
    }),
    extraLines: () => anime({
      targets: ".soccer2_extra-line > *",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay: (el, i) => 1000 + i * 20,
      autoplay: false,
    }),
    bodyTimeline: () => {
      const extraLines = soccer2Animations.extraLines();
      const bodyLines = soccer2Animations.bodyLines();
      const timeline = gsap.timeline({
        onStart: () => {
          extraLines.play();
          bodyLines.play();
        },
      });
      timeline
        .staggerFromTo(
          ".soccer2_fill > *",
          0.2,
          { scale: 0, transformOrigin: "100% 100%" },
          { scale: 1 },
          0.03
        )
        .to(".soccer2_fill", {
          duration: 1,
          onStart: () => {
            extraLines.reverse();
            bodyLines.reverse();
          },
        })
        .staggerTo(
          ".soccer2_fill > *",
          0.2,
          { scale: 0, delay: 2 },
          0.01
        );
      return timeline;
    },
  };

  // Basketball Animation Steps
  const basketballAnimations = {
    bodyLines: () => anime({
      targets: ".basket_extra-line > *",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay: (el, i) => i * 20,
      autoplay: false,
    }),
    extraLines: () => anime({
      targets: ".basket_line > *",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 3500,
      delay: (el, i) => i * 20,
      autoplay: false,
    }),
    bodyTimeline: () => {
      const bodyLines = basketballAnimations.bodyLines();
      const extraLines = basketballAnimations.extraLines();
      const timeline = gsap.timeline({
        onStart: () => {
          bodyLines.play();
          extraLines.play();
        },
      });
      timeline.staggerFromTo(
        ".basket_fill > *",
        0.3,
        { scale: 0, y: 300, transformOrigin: "0% 0%" },
        { scale: 1, y: 0 },
        -0.008
      );
      return timeline;
    },
  };

  // Main Timeline
  const initAnimations = () => {
    const mainTL = gsap.timeline();
    mainTL
      .add(soccer1Animations.bodyTimeline(), "step1")
      .add(soccer1Animations.backTimeline(), "step1")
      .add(soccer1Animations.ballTimeline(), "step1")
      .add(hide("#soccer1"), "step2")
      .add(show("#soccer2"), "step3")
      .add(soccer2Animations.bodyTimeline(), "step4")
      .add(hide("#soccer2"), "step5")
      .add(show("#basket"), "step6")
      .add(basketballAnimations.bodyTimeline(), "step7");
  };

  // Simplified SVG components for demonstration
  // We're including simplified versions of the SVGs to demonstrate the concept
  const renderSportsSVGs = () => {
    return (
      <div className="sports-container absolute inset-0 w-full h-full z-0 overflow-hidden opacity-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          opacity="0"
          id="soccer1"
          viewBox="0 0 500 500"
          className="absolute top-0 left-0 w-full h-full"
        >
          <g className="soccer1ball">
            <g>
              <circle cx="250" cy="250" r="100" fill="#FFFFFF" opacity="0.4" />
            </g>
            <g className="soccer1ball-line" style={{ fill: 'none', stroke: '#fff', strokeLinejoin: 'round', strokeWidth: '2px' }}>
              <path d="M200,250 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0" />
            </g>
          </g>
          <g className="soccer1_fill" data-name="FILL">
            <polygon points="150,150 350,150 350,350 150,350" fill="#FFFFFF" opacity="0.3" />
          </g>
          <g className="soccer1_extra-line" data-name="Extra Line">
            <g>
              <line x1="150" y1="150" x2="350" y2="350" style={{ stroke: '#fff', strokeWidth: '2px' }} />
              <line x1="350" y1="150" x2="150" y2="350" style={{ stroke: '#fff', strokeWidth: '2px' }} />
            </g>
          </g>
          <g className="soccer1_line" data-name="LINE" style={{ fill: 'none', stroke: '#fff', strokeLinejoin: 'round', strokeWidth: '2px' }}>
            <polygon points="150,150 350,150 350,350 150,350" />
          </g>
        </svg>

        <svg id="soccer2" opacity="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="absolute top-0 left-0 w-full h-full">
          <title>soccer 2</title>
          <g className="soccer2_fill" data-name="FILL" style={{ fill: '#fff', opacity: 0.3 }}>
            <circle cx="250" cy="250" r="100" />
          </g>
          <g className="soccer2_extra-line" data-name="Extra Line" style={{ fill: 'none', stroke: '#fff' }}>
            <path d="M150,150 a150,150 0 1,0 300,0" />
          </g>
          <g className="soccer2_line" style={{ fill: 'none', stroke: '#fff', strokeLinejoin: 'round', strokeWidth: '2px' }}>
            <path d="M150,150 a150,150 0 1,0 300,0" />
          </g>
        </svg>

        <svg id="basket" opacity="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="absolute top-0 left-0 w-full h-full">
          <title>basketball</title>
          <g className="basket_fill" data-name="FILL" style={{ fill: '#fff', opacity: 0.3 }}>
            <circle cx="250" cy="250" r="100" />
            <rect x="150" y="200" width="200" height="10" />
            <rect x="150" y="300" width="200" height="10" />
          </g>
          <g className="basket_extra-line" data-name="Extra Line" style={{ fill: 'none', stroke: '#fff' }}>
            <path d="M150,250 L350,250" />
            <path d="M250,150 L250,350" />
          </g>
          <g className="basket_line" style={{ fill: 'none', stroke: '#fff', strokeLinejoin: 'round', strokeWidth: '2px' }}>
            <circle cx="250" cy="250" r="100" />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black absolute">
            {renderSportsSVGs()}

            <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
              {/* Logo Animation Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-40 h-40 mb-8"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#0EA5E9" />
                    </filter>
                  </defs>
                  
                  {/* Background Circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="#111" 
                    stroke="#333" 
                    strokeWidth="2" 
                  />
                  
                  {/* Animated Circles */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="4"
                    strokeDasharray="126"
                    strokeDashoffset="126"
                    filter="url(#shadow)"
                    animate={{ 
                      strokeDashoffset: [126, 0],
                      rotate: [0, 720],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    style={{ transformOrigin: "center" }}
                  />

                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    strokeDasharray="220"
                    strokeDashoffset="220"
                    filter="url(#shadow)"
                    animate={{ 
                      strokeDashoffset: [220, 0],
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.2,
                    }}
                    style={{ transformOrigin: "center" }}
                  />

                  {/* Logo in center */}
                  <foreignObject x="25" y="25" width="50" height="50">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="/lovable-uploads/b593a4c0-9212-4029-a1ca-5e39bd91c535.png"
                        alt="Khelmanch Logo"
                        className="w-10 h-10 object-contain rounded-full"
                      />
                    </div>
                  </foreignObject>
                </svg>
              </motion.div>

              {/* Brand Name */}
              <motion.h1 
                className="text-4xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                KHEL<span className="text-blue-500">MANCH</span>
              </motion.h1>

              {/* Loading Bar */}
              <motion.div 
                className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-4"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "16rem", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                />
              </motion.div>

              {/* Loading Text */}
              <motion.div
                className="flex items-center text-sm text-gray-400 mt-4"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                  }
                }}
              >
                <Loader2 className="animate-spin mr-2 h-4 w-4 text-blue-500" />
                <span>Loading your sports experience</span>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
