import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { 
  Menu, 
  X, 
  Play, 
  Star, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from 'lucide-react';
import heroBg from '../assets/hero.jpg';
import client1 from '../assets/client1.jpg';
import client2 from '../assets/client2.jpg';
import client3 from '../assets/client3.jpg';
import client4 from '../assets/client4.jpg';
import aboutLogo from '../assets/logo.jpeg';
import poster1 from '../assets/Events.png';
import poster2 from '../assets/Fashion.png';
import poster3 from '../assets/Music_video.png';

// BTS Images imports
import bts1 from '../assets/1.jpg';
import bts2 from '../assets/2.jpg';
import bts3 from '../assets/3.jpg';
import bts4 from '../assets/4.jpg';
import bts5 from '../assets/5.jpg';
import bts6 from '../assets/6.jpg';
import bts7 from '../assets/7.jpg';
import bts8 from '../assets/8.jpg';
import bts9 from '../assets/9.jpg';
import bts10 from '../assets/10.jpg';
import bts11 from '../assets/11.JPG?url';
import bts12 from '../assets/12.JPG?url';
import bts13 from '../assets/13.jpg';
import bts14 from '../assets/14.jpg';
import bts15 from '../assets/15.jpg';
import bts16 from '../assets/16.jpg';
import bts17 from '../assets/17.jpg';
import bts18 from '../assets/18.jpg';
import bts19 from '../assets/19.jpg';
import bts20 from '../assets/20.jpg';

// Video imports
import testimonialVideo from '../videos/Testimonial.mp4';
import eventsVideo from '../videos/Events.mp4';
import fashionFitnessVideo from '../videos/Fashion & Fitness.mp4';
import musicVideosVideo from '../videos/Music Videos.mp4';
import productShootVideo from '../videos/Product Shoot.mp4';
import electionCampaignVideo from '../videos/Election Campaign.mov';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLElement>(null);
  const crewRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const btsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // UI states
  const [showReel, setShowReel] = useState(false);
  const [reelUrl, setReelUrl] = useState('');

  // Portfolio videos sourced from /project/videos
  const videoItems = [
    { id: 1, title: 'Events', subtitle: 'Event Coverage', src: eventsVideo, type: 'video/mp4', poster: poster1 },
    { id: 2, title: 'Fashion & Fitness', subtitle: 'Fashion / Fitness', src: fashionFitnessVideo, type: 'video/mp4', poster: poster2 },
    { id: 3, title: 'Music Videos', subtitle: 'Music Video Production', src: musicVideosVideo, type: 'video/mp4', poster: poster3 },
    { id: 4, title: 'Product Shoot', subtitle: 'Product Shoot', src: productShootVideo, type: 'video/mp4' },
    { id: 5, title: 'Election Campaign', subtitle: 'Campaign Film', src: electionCampaignVideo, type: 'video/quicktime' },
  ];

  // Helper: pause all videos in the portfolio section
  const pauseAllVideos = () => {
    const vids = document.querySelectorAll<HTMLVideoElement>('.worktalkies-video');
    vids.forEach(v => v.pause());
  };

  // When a video is playing, stop autoplay and disable swipe to avoid slide changes pausing the video
  const handleVideoPlay = () => {
    try { swiperRef.current?.autoplay?.stop(); } catch {}
    if (swiperRef.current) swiperRef.current.allowTouchMove = false;
  };
  const handleVideoPause = () => {
    if (swiperRef.current) swiperRef.current.allowTouchMove = true;
    // do not auto-resume autoplay immediately; user may be reading card content
  };

  // Crew members data
  const crewMembers = [
    {
      name: "Alex Rodriguez",
      role: "Creative Director",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      sImage: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Sarah Chen",
      role: "Lead Photographer",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400",
      sImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Marcus Thompson",
      role: "Video Producer",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      sImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Elena Vasquez",
      role: "Brand Strategist",
      image: "https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?auto=compress&cs=tinysrgb&w=400",
      sImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  // Client reviews data
  const reviews = [
    {
      name: "Jennifer Walsh",
      company: "TechCorp",
      text: "The BROFIED team transformed our brand vision into reality. Their cinematic approach elevated our product launch beyond expectations.",
      rating: 5
    },
    {
      name: "David Kim",
      company: "Urban Collective",
      text: "Working with BROFIED was a game-changer. They captured the essence of our brand with stunning visuals that speak volumes.",
      rating: 5
    },
    {
      name: "Maria Santos",
      company: "Fashion Forward",
      text: "The attention to detail and creative vision of BROFIED is unmatched. Every frame tells a story.",
      rating: 5
    }
  ];

  // Client logos images
  const clientLogos = [client1, client2, client3, client4];

  // BTS gallery images
  const btsImages = [
    bts1, bts2, bts3, bts4, bts5, bts6, bts7, bts8, bts9, bts10,
    bts11, bts12, bts13, bts14, bts15, bts16, bts17, bts18, bts19, bts20
  ];

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      );

      gsap.fromTo('.rec-indicator',
        { scale: 0 },
        { scale: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
      );

      // Pulsating REC animation
      gsap.to('.rec-dot', {
        scale: 1.2,
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Red circles floating animation
      gsap.to('.floating-circle', {
        y: "-20px",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5
      });

      // 3D Red Circles Animation
      gsap.set('.circle-3d', {
        transformOrigin: "center center",
        transformStyle: "preserve-3d"
      });

      // Individual circle animations
      gsap.to('.circle-1', {
        rotationX: 360,
        rotationY: 180,
        y: -100,
        duration: 8,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.circle-2', {
        rotationX: -360,
        rotationY: -180,
        y: 80,
        x: 50,
        duration: 10,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.circle-3', {
        rotationX: 180,
        rotationY: 360,
        y: -60,
        x: -80,
        duration: 12,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.circle-4', {
        rotationX: -180,
        rotationY: -360,
        y: 120,
        x: 100,
        duration: 9,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.circle-5', {
        rotationX: 270,
        rotationY: 90,
        y: -80,
        x: -120,
        duration: 11,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.circle-6', {
        rotationX: -270,
        rotationY: -90,
        y: 100,
        x: 150,
        duration: 7,
        repeat: -1,
        ease: "none"
      });

      // Enhanced Cinematic Curtain Animation for About Section
      const curtainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Set initial state for curtains and content
      gsap.set('.left-curtain', { x: 0, z: 10 });
      gsap.set('.right-curtain', { x: 0, z: 10 });
      gsap.set('.about-content-3d', { 
        scale: 0.7, 
        rotationX: 20, 
        rotationY: -15, 
        z: -200, 
        opacity: 0 
      });

      curtainTimeline
        // Curtain opening animation with 3D effect
        .to('.left-curtain', {
          x: '-100%',
          rotationY: -15,
          duration: 2.5,
          ease: "power3.inOut",
          transformOrigin: "left center"
        }, 0)
        .to('.right-curtain', {
          x: '100%',
          rotationY: 15,
          duration: 2.5,
          ease: "power3.inOut",
          transformOrigin: "right center"
        }, 0)
        // Content 3D orbit zoom effect
        .to('.about-content-3d', {
          scale: 1.2,
          rotationX: 5,
          rotationY: 0,
          z: 50,
          opacity: 0.8,
          duration: 1.5,
          ease: "power2.out"
        }, "-=2")
        .to('.about-content-3d', {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.5")
        // Content reveal animation
        .fromTo('.section-reveal',
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
          },
          "-=1"
        );

      // Portfolio swiper animation
      if (cardStackRef.current) {
        const swiperContainer = cardStackRef.current.querySelector('.portfolio-swiper');
        if (swiperContainer) {
          gsap.fromTo(swiperContainer,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: cardStackRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }

      // Section reveal animations (excluding About section which has custom animation)
      gsap.utils.toArray('.section-reveal').forEach((section: any) => {
        if (!section.closest('#about-section')) {
          gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Crew cards animation
      gsap.utils.toArray('.crew-card').forEach((card: any, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100, rotationY: 15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSlideHover = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 800);
    }
  };

  const handleSlideClick = (index: number) => {
    const swiper = swiperRef.current;
    if (swiper && swiper.activeIndex !== index) {
      swiper.slideTo(index, 800);
    }
  };

  return (
    <div className="bg-black text-white font-inter overflow-x-hidden">
      {/* Floating Red Circles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-circle absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full opacity-30"></div>
        <div className="floating-circle absolute top-40 right-20 w-6 h-6 bg-red-500 rounded-full opacity-20"></div>
        <div className="floating-circle absolute bottom-40 left-1/4 w-3 h-3 bg-red-500 rounded-full opacity-25"></div>
        <div className="floating-circle absolute bottom-20 right-1/3 w-5 h-5 bg-red-500 rounded-full opacity-30"></div>
        <div className="floating-circle absolute top-1/2 left-5 w-2 h-2 bg-red-500 rounded-full opacity-40"></div>
        <div className="floating-circle absolute top-1/3 right-10 w-8 h-8 bg-red-500 rounded-full opacity-15"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 backdrop-blur-sm border-b border-red-500 border-opacity-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={aboutLogo} 
              alt="BROFIED Media Logo" 
              className="h-16 w-auto logo-3d-header"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection(aboutRef)} className="text-white hover:text-red-500 transition-colors">About</button>
            <button onClick={() => scrollToSection(workRef)} className="text-white hover:text-red-500 transition-colors">Work</button>
            <button onClick={() => scrollToSection(crewRef)} className="text-white hover:text-red-500 transition-colors">Crew</button>
            <button onClick={() => scrollToSection(contactRef)} className="text-white hover:text-red-500 transition-colors">Contact</button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-98 border-t border-red-500 border-opacity-20">
            <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <button onClick={() => scrollToSection(aboutRef)} className="text-white hover:text-red-500 transition-colors text-left">About</button>
              <button onClick={() => scrollToSection(workRef)} className="text-white hover:text-red-500 transition-colors text-left">Work</button>
              <button onClick={() => scrollToSection(crewRef)} className="text-white hover:text-red-500 transition-colors text-left">Crew</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-white hover:text-red-500 transition-colors text-left">Contact</button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Video (optional) */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="assets/hero.mp4"
          poster={heroBg}
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        </div>

        {/* REC Indicator with 3D Element */}
        <div className="rec-indicator absolute top-8 right-8 flex items-center space-x-2 bg-black bg-opacity-50 px-4 py-2 rounded-full backdrop-blur-sm z-30">
          <div className="rec-dot w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-red-500 font-bold text-sm">REC</span>
          {/* Mini 3D Element */}
          <div className="mini-3d-element ml-2">
            <div className="w-4 h-4 bg-red-500 bg-opacity-30 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center z-20 relative">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-white">Where</span>
            <span className="text-red-500 mx-2">Creativity</span>
            <span className="text-white">Meets</span>
            <span className="text-red-500 ml-2">Cinematics</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Cinematic brand stories, crafted with precision and passion.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Let’s Create Magic
            </button>
            <a
              href="https://wa.me/918383434353"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
          {/* Decorative Red Circles */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border border-white border-opacity-30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
        {/* Reel Modal */}
        {showReel && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={() => { setShowReel(false); setReelUrl(''); }}>
            <div className="bg-black rounded-2xl overflow-hidden max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {reelUrl ? (
                <video src={reelUrl} controls autoPlay className="w-full h-auto"></video>
              ) : (
                <div className="p-8 text-center text-white">
                  <p className="text-xl mb-4">Add your reel video at <code>project/assets/reel.mp4</code></p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full" onClick={() => { setShowReel(false); setReelUrl(''); }}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section id="about-section" ref={aboutRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Film Reel Background Effect */}
        <div className="absolute inset-0 z-0">
          <div className="film-reel-container">
            <div className="film-strip film-strip-1"></div>
            <div className="film-strip film-strip-2"></div>
            <div className="film-reel film-reel-left"></div>
            <div className="film-reel film-reel-right"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="about-content-container">
            <div className="section-reveal about-content-3d max-w-6xl mx-auto">
              <div className="relative inline-block mb-8">
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  <span className="circle-letter-bg">A</span>bout <span className="text-red-500">Us</span>
                </h2>
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-500 rounded-full opacity-20"></div>
              </div>

            {/* Split Layout: Left Logo, Right Intro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-12">
              <div className="flex justify-center md:justify-start">
                <img
                  src={aboutLogo}
                  alt="BROFIED Media Logo"
                  className="h-28 w-auto md:h-36 drop-shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                />
              </div>
              <div className="md:col-span-2 text-left">
                <p className="text-lg md:text-xl text-gray-300 mb-4">
                  BROFIED Media is a cinematic content studio where creativity meets craft.
                </p>
                <p className="text-lg md:text-xl text-gray-300 mb-4">
                  We design brand stories, music videos and campaign films that feel premium, purposeful and powerful.
                </p>
                <p className="text-lg md:text-xl text-gray-300 mb-4">
                  From concept to final delivery, our workflow is organized, detail-driven and ROI-focused.
                </p>
                <p className="text-lg md:text-xl text-gray-300">
                  If you’re seeking visuals that move people and move the needle—welcome home.
                </p>
              </div>
            </div>

            {/* Circular Progress Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="progress-circle mb-4">
                  <span>95</span>
                </div>
                <p className="text-gray-400 text-sm">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="progress-circle mb-4" style={{background: 'conic-gradient(#FF0000 0deg, #DC2626 180deg, transparent 360deg)'}}>
                  <span>50</span>
                </div>
                <p className="text-gray-400 text-sm">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="progress-circle mb-4" style={{background: 'conic-gradient(#FF0000 0deg, #DC2626 240deg, transparent 360deg)'}}>
                  <span>75</span>
                </div>
                <p className="text-gray-400 text-sm">Awards Won</p>
              </div>
              <div className="text-center">
                <div className="progress-circle mb-4" style={{background: 'conic-gradient(#FF0000 0deg, #DC2626 300deg, transparent 360deg)'}}>
                  <span>90</span>
                </div>
                <p className="text-gray-400 text-sm">Team Expertise</p>
              </div>
            </div>

            {/* Circular Section Divider */}
            <div className="circle-divider my-16"></div>

            {/* Red Circle Accent */}
            <div className="mt-12 flex justify-center">
              <div className="w-32 h-32 bg-red-500 rounded-full opacity-10 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-500 rounded-full opacity-30"></div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Talkies (Portfolio) Section */}
      <section ref={workRef} className="py-20 bg-black relative min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-4">Work <span className="text-red-500">Talkies</span></h2>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full opacity-15"></div>
            </div>
            <p className="text-xl text-gray-400">Scroll to explore our cinematic journey</p>
          </div>

          {/* Full-width (full-bleed) Swiper Portfolio on md+; grid fallback on small screens */}
          <div className="hidden md:block relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
            <div className="swiper-container-portfolio px-6">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              preventClicksPropagation={false}
              initialSlide={2}
              loop={false}
              speed={800}
              spaceBetween={30}
              coverflowEffect={{
                rotate: 0,
                stretch: 100,
                depth: 10,
                modifier: 1.5,
                slideShadows: false,
              }}
              modules={[EffectCoverflow]}
              className="portfolio-swiper"
            >
              {videoItems.map((project, index) => (
                <SwiperSlide key={project.id} className="portfolio-slide">
                  <div 
                    className="portfolio-card w-80 h-96 md:w-96 md:h-[28rem] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-red-500 border-opacity-20 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onMouseEnter={() => handleSlideHover(index)}
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className="relative h-full">
                      <video 
                        src={project.src}
                        poster={project.poster?project.poster:undefined}
                        className="w-full h-2/3 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      
                      {/* Red Circle Accent */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full opacity-80 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-center">
                        <p className="text-red-500 text-sm font-semibold mb-2">{project.subtitle}</p>
                        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 group" onClick={(e) => { e.stopPropagation(); setShowReel(true); setReelUrl(project.src); }}>
                          <span>Play Showreel</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            </div>
          </div>

          {/* Small-screen grid fallback */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {videoItems.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-red-500/20">
                <div className="relative">
                  <video
                    className="worktalkies-video swiper-no-swiping w-full h-56 object-cover cursor-pointer"
                    src={item.src}
                    poster={item.poster}
                    controls
                    playsInline
                    controlsList="nodownload"
                    preload="metadata"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                    onError={(e) => {
                      console.error('Video failed to load:', item.src, e);
                    }}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget as HTMLVideoElement;
                      if (v.currentTime >= 90) v.pause();
                    }}
                  >
                    {item.type && (
                      <source src={item.src as string} type={item.type as string} />
                    )}
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={() => { setShowReel(true); setReelUrl(item.src); }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600/80 hover:bg-red-600 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-5 h-5" /> Play Reel
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-red-500 text-sm font-semibold mb-1">{item.subtitle}</p>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section ref={clientsRef} className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-4">Our <span className="text-red-500">Clients</span></h2>
              <div className="absolute -top-8 -left-8 w-12 h-12 bg-red-500 rounded-full opacity-25"></div>
            </div>
            <p className="text-gray-400">Trusted by brands across industries</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {clientLogos.map((logo, index) => (
              <div key={index} className="section-reveal bg-white bg-opacity-5 p-6 md:p-8 rounded-xl hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center relative group">
                <img
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 md:max-h-20 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
                {index % 3 === 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full opacity-60"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section ref={reviewsRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-4">Reviews <span className="text-red-500">& Testimonials</span></h2>
              <div className="absolute -top-8 -right-8 w-12 h-12 bg-red-500 rounded-full opacity-25"></div>
            </div>
            <p className="text-gray-400">Real voices, real impact</p>
          </div>

          {/* Video Testimonial */}
          <div className="section-reveal max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border border-red-500/20 shadow-2xl">
            <div className="aspect-video bg-gray-900 relative">
              <video
                src={testimonialVideo}
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <div key={index} className="flex flex-col justify-center items-center section-reveal bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-red-500 border-opacity-20 hover:border-opacity-40 transition-all duration-300 relative">
                {/* Circular Testimonial Avatar */}
                <div className="testimonial-circle mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                </div>

                <div className="flex mb-4 justify-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-red-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-center italic">"{review.text}"</p>
                <div className="text-center">
                  <p className="font-bold text-white text-lg">{review.name}</p>
                  <p className="text-red-500 text-sm font-semibold">{review.company}</p>
                </div>

                {/* Circular Achievement Badge */}
                <div className="achievement-badge absolute -bottom-4">
                  <span className="text-white text-xs font-bold">{review.rating}★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Work Flow (Process) Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-8">The <span className="text-red-500">Work Flow</span></h2>
              <div className="absolute -top-8 -left-8 w-12 h-12 bg-red-500 rounded-full opacity-25"></div>
            </div>
            <p className="text-xl text-gray-400">Concept → Shoot → Edit → Deliver</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Concept', desc: 'We decode your brand and craft the narrative.' },
              { title: 'Shoot', desc: 'On-ground cinematic production with precision.' },
              { title: 'Edit', desc: 'Color, sound, rhythm—stitched to perfection.' },
              { title: 'Deliver', desc: 'On-time delivery optimized for every platform.' },
            ].map((step, i) => (
              <div key={i} className="section-reveal bg-gray-900/60 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className="w-12 h-12 bg-red-500 rounded-full mb-4 mx-auto"></div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Crew Section */}
      <section ref={crewRef} className="py-20 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-2">The <span className="text-red-500">Crew</span></h2>
              <div className="absolute -bottom-6 -right-6 w-10 h-10 bg-red-500 rounded-full opacity-30"></div>
            </div>
            <p className="text-gray-400">The Minds Behind the Magic</p>
          </div>
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto p-8">
            {crewMembers.map((member, index) => (
              <div key={index} className="cursor-pointer crew-card rounded-2xl overflow-visible hover:scale-105 transition-all duration-500 relative group">
                <div className="relative overflow-visible h-72 sm:h-80 md:h-88 flex items-end justify-center">
                  {/* Red Circle Background (fixed square sizes so it stays a circle) */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-48 h-48 sm:w-54 sm:h-54 md:w-64 md:h-64 bg-red-500 rounded-full"></div>
                  {/* Primary image */}
                  <img 
                    style={{
                      marginBottom: "3rem"
                    }}
                    src={member.image} 
                    alt={member.name}
                    className="relative z-10 w-40 h-56 sm:w-30 sm:h-56 object-cover object-top rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500 transition-opacity ease-out duration-500 group-hover:opacity-0"
                  />
                  {/* Hover image (crossfade in) */}
                  {member.sImage && (
                    <img
                      style={{
                        marginBottom: "3rem"
                      }}
                      src={member.sImage}
                      alt={`${member.name} alt`}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-40 h-56 sm:w-30 sm:h-56 object-cover object-top rounded-xl shadow-2xl transition-opacity ease-out duration-500 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="p-6 mt-10 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-red-500 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B.T.S. Section */}
      <section ref={btsRef} className="py-20 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-8"><span className="text-red-500">B.T.S.</span></h2>
              <p className="text-xl text-gray-400">Passion in Action.</p>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full opacity-15"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {btsImages.map((image, index) => (
              <div key={index} className="section-reveal relative group overflow-hidden rounded-xl">
                <img 
                  src={image} 
                  alt={`Behind the scenes ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 50vw"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Random Red Circle Accents */}
                {index % 2 === 0 && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full opacity-60"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey of BROFIED (Timeline) */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-8">Journey of <span className="text-red-500">BROFIED</span></h2>
              <div className="absolute -top-6 right-0 w-14 h-14 bg-red-500 rounded-full opacity-20"></div>
            </div>
            <p className="text-xl text-gray-400">Milestones that shaped our cinematic craft</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* Center vertical line on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-red-500/30"></div>

            {[
              { year: '2019', text: 'Founded with a passion for cinematic storytelling.' },
              { year: '2020', text: 'First brand film and 50+ projects delivered.' },
              { year: '2022', text: 'Expanded crew; entered music and fashion films.' },
              { year: '2024', text: '200+ productions with global collaborations.' },
            ].map((m, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className={`section-reveal mb-10 md:mb-14 flex md:items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`relative w-full md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    {/* Dot on the center line for md+ */}
                    <div className={`hidden md:block absolute top-4 ${isLeft ? 'right-0' : 'left-0'} translate-x-${isLeft ? '1/2' : '-1/2'} w-4 h-4 bg-red-500 rounded-full border-4 border-black`}></div>
                    <div className="bg-gray-900/60 border border-red-500/20 rounded-xl p-6 shadow-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-500 text-white font-extrabold flex items-center justify-center">{m.year.slice(-2)}</div>
                        <h4 className="text-white font-bold text-lg">{m.year}</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black mb-8">Get In <span className="text-red-500">Touch</span></h2>
              <div className="absolute -top-6 left-0 w-12 h-12 bg-red-500 rounded-full opacity-25"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="section-reveal">
              <form className="space-y-6">
                <div className="form-circle-focus">
                  <label className="block text-white font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-circle-focus">
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                {/* Project Type */}
                <div className="form-circle-focus">
                  <label className="block text-white font-semibold mb-2">Project Type</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                    placeholder="e.g., Brand Film, Music Video, Product Shoot"
                  />
                </div>
                <div className="form-circle-focus">
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="section-reveal space-y-8">
              <div className="bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-red-500 border-opacity-20 relative">
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full opacity-70"></div>
                <h3 className="text-2xl font-bold mb-6 text-red-500">Let's Create Together</h3>
                <div className="flex gap-4 mb-6 flex-wrap items-center">
                  <a href="https://wa.me/918383434353" target="_blank" rel="noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold text-center">WhatsApp</a>
                  <a
                    href="tel:+918383434353"
                    aria-label="Call +91 83834 34353"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold text-center"
                  >
                    Call Now
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText('+918383434353');
                        alert('Number copied: +91 83834 34353');
                      } catch (e) {
                        alert('Copy failed. Number: +91 83834 34353');
                      }
                    }}
                    className="px-4 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-red-500 hover:text-white transition-colors"
                    aria-label="Copy phone number"
                  >
                    Copy Number
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-400">hello@brofiedmedia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Phone</p>
                      <p className="text-gray-400">+91 83834 34353</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Studio</p>
                      <p className="text-gray-400">Los Angeles, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circular Social Media Icons */}
              <div className="flex space-x-6 justify-center">
                {[Instagram, Twitter, Youtube, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="social-circle"
                  >
                    <Icon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500 border-opacity-20 py-12 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src={aboutLogo} 
                alt="BROFIED Media Logo" 
                className="h-20 w-auto logo-3d-footer"
              />
            </div>
            
            <div className="text-center md:text-right pr-28 md:pr-40">
              <p className="text-gray-400 mb-2"> 2025 The BROFIED Media. All rights reserved.</p>
              <p className="text-gray-500 text-sm">Creating cinematic experiences that roar with impact</p>
            </div>
          </div>
          
          {/* Footer Red Circles */}
          <div className="absolute bottom-4 left-1/4 w-8 h-8 bg-red-500 rounded-full opacity-10"></div>
          <div className="absolute top-4 right-1/4 w-6 h-6 bg-red-500 rounded-full opacity-15"></div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed right-6 z-[9999] flex flex-col gap-3"
           style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <a href="https://wa.me/918383434353" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg font-semibold">WhatsApp</a>
        <a
          href="tel:+918383434353"
          aria-label="Call +91 83834 34353"
          className="text-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full shadow-lg font-semibold"
        >
          Call
        </a>
      </div>
    </div>
  );
}

export default App;
