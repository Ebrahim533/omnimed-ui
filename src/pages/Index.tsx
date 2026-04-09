import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Clock, Shield, Linkedin, Phone, ChevronRight, ChevronLeft, Stethoscope, HeartPulse, Activity, Play, Star, ShieldCheck, Clock3, FileText, Calendar, PhoneCall, Folder } from "lucide-react";
import Layout from "@/components/Layout";
import ServiceHighlightStrip from "@/components/ServiceHighlightStrip";
import ServiceTrilogy from "@/components/ServiceTrilogy";
import { fadeUp, sectionReveal, cardStagger, scaleIn, slideInLeft, slideInRight, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";
import { useFeaturedPerson, useSiteSettings, useLandingPage } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { EnhancedFounderSection } from "@/components/EnhancedFounderSection";

// Hero slider data with synchronized content
const heroSlides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
    headline: "Excellence in Healthcare With Compassionate Care",
    highlightedWord: "Healthcare",
    description: "Medical excellence with compassionate care. Our dedicated team provides world-class healthcare services tailored to your needs, ensuring the best possible outcomes for every patient.",
    doctorName: "Dr. Sarah Johnson",
    doctorTitle: "Cardiologist",
    availableTime: "Today 2:30 PM",
    rating: "4.9/5",
    reviews: "1,234 Reviews",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5452200/pexels-photo-5452200.jpeg?auto=compress&cs=tinysrgb&w=800",
    headline: "Advanced Medical Technology For Better Health",
    highlightedWord: "Technology",
    description: "Experience cutting-edge medical technology combined with expert care. Our state-of-the-art facilities ensure accurate diagnoses and effective treatments for all patients.",
    doctorName: "Dr. Michael Chen",
    doctorTitle: "Neurologist",
    availableTime: "Today 3:45 PM",
    rating: "4.8/5",
    reviews: "2,156 Reviews",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800",
    headline: "Family Care With Personal Touch Always",
    highlightedWord: "Personal",
    description: "We treat every patient like family. Our comprehensive family healthcare services cover all ages, from pediatrics to geriatrics, with personalized attention and care.",
    doctorName: "Dr. Emily Rodriguez",
    doctorTitle: "Family Medicine",
    availableTime: "Today 4:15 PM",
    rating: "5.0/5",
    reviews: "987 Reviews",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg?auto=compress&cs=tinysrgb&w=800",
    headline: "Emergency Services Available Round The Clock",
    highlightedWord: "Emergency",
    description: "24/7 emergency medical services with rapid response times. Our emergency department is equipped to handle critical situations with expertise and compassion.",
    doctorName: "Dr. James Wilson",
    doctorTitle: "Emergency Medicine",
    availableTime: "Available Now",
    rating: "4.9/5",
    reviews: "3,421 Reviews",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Patients Managed" },
  { icon: TrendingUp, value: "40%", label: "Reduction in ER Visits" },
  { icon: Clock, value: "24/7", label: "Monitoring & Support" },
  { icon: Shield, value: "98%", label: "Patient Satisfaction" },
];

const heroStats = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Patients Treated" },
  { value: "50+", label: "Medical Experts" },
];

// Helper to get image URL from Sanity
const getSanityImageUrl = (image: any) => {
  if (!image?.asset?.url) return '';
  return image.asset.url;
};

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const { person: featuredPerson, loading: featuredLoading, error: featuredError } = useFeaturedPerson();
  const { settings, loading: settingsLoading, error: settingsError } = useSiteSettings();
  const { landingPage, loading: landingLoading, error: landingError } = useLandingPage("home");
  
  // Collect any hook errors
  const hookError = featuredError || settingsError || landingError;

  // Use Sanity heroSlider data or fall back to hardcoded
  const heroSlidesData = landingPage?.heroSlider && landingPage.heroSlider.length > 0
    ? landingPage.heroSlider.map((slide: any, index: number) => ({
        id: index + 1,
        image: getSanityImageUrl(slide.image) || heroSlides[index]?.image || heroSlides[0].image,
        headline: slide.headline || heroSlides[index]?.headline || '',
        highlightedWord: slide.highlightedWord || '',
        description: slide.description || '',
        doctorName: slide.doctorName || '',
        doctorTitle: slide.doctorTitle || '',
        availableTime: slide.availableTime || '',
        rating: slide.rating || '',
        reviews: slide.reviews || '',
      }))
    : heroSlides;

  const currentSlideData = heroSlidesData[currentSlide];
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Handle slide auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlidesData.length);
      setProgress(0);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlidesData.length]);

  // Handle progress bar animation
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [currentSlide, isAutoPlaying]);

  return (
    <Layout>
      {/* Error Display */}
      {hookError && (
        <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg">
          <p className="text-red-700 font-semibold">Error loading page data:</p>
          <p className="text-red-600 text-sm">{hookError}</p>
        </div>
      )}
      
      {/* Modern Medical Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Decorative Background Elements - Contained within section */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-200/20 via-blue-100/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-200/20 via-teal-100/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="section-container relative z-10 flex-1 flex flex-col justify-center py-6 lg:py-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center h-full">
            
            {/* Left Content - Changes with slider */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                className="space-y-6 lg:space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
              >
                {/* Top Badges */}
                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <ShieldCheck size={14} />
                    Accredited
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <Clock3 size={14} />
                    24/7 Emergency
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <Star size={14} className="fill-blue-700" />
                    4.9/5 Rating
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight">
                    {currentSlideData.headline.split(currentSlideData.highlightedWord)[0]}
                    <span className="text-blue-500 relative inline-block">
                      {currentSlideData.highlightedWord}
                      <svg className="absolute -bottom-1 left-0 w-full h-1" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                        <motion.path 
                          d="M0 4C50 4 50 4 100 4C150 4 150 4 200 4" 
                          stroke="#2563EB" 
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        />
                      </svg>
                    </span>
                    {currentSlideData.headline.split(currentSlideData.highlightedWord)[1]}
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-slate-600 text-lg leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentSlideData.description}
                </motion.p>

                {/* Stats Row */}
                <motion.div 
                  className="flex flex-wrap gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {heroStats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-3xl font-bold text-blue-500">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button 
                      asChild 
                      size="lg" 
                      className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
                    >
                      <Link to="/appointment">
                        Book Appointment
                        <ChevronRight size={18} className="ml-1" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full px-8 border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Link to="/about">
                        <Play size={16} className="mr-2 fill-blue-600" />
                        Watch Our Story
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Emergency Hotline Card */}
                <motion.div
                  className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-100 max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Phone className="text-white" size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs text-slate-500">Emergency Hotline</p>
                    <a href="tel:15559112468" className="text-lg font-semibold text-slate-900 hover:text-blue-500 transition-colors">
                      +1 (555) 911-2468
                    </a>
                  </div>
                </motion.div>

                {/* Progress Bar */}
                <motion.div 
                  className="w-full max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0 }}
                    />
                  </div>
                </motion.div>

                {/* Slide Indicators */}
                <motion.div 
                  className="flex gap-2 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {heroSlidesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        setIsAutoPlaying(false);
                        setProgress(0);
                        setTimeout(() => setIsAutoPlaying(true), 10000);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? "w-8 bg-blue-600" 
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Content - Image Slider with Floating Cards */}
            <motion.div 
              className="relative h-[420px] sm:h-[480px] lg:h-[calc(100vh-10rem)] max-h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE_PROFESSIONAL }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Decorative Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-sky-100/50 rounded-[3rem] -z-10" />
              
              {/* Main Image Slider */}
              <div className="relative w-full h-full max-w-[450px] max-h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentSlide}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
                  >
                    <img
                      src={currentSlideData.image}
                      alt={currentSlideData.doctorName}
                      className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent rounded-[2rem]" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Next Available Card - Top Right */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`appointment-${currentSlide}`}
                    className="absolute -right-4 lg:right-4 top-8 lg:top-12 z-20"
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Calendar className="text-blue-500" size={22} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Next Available</p>
                          <p className="font-semibold text-slate-900">{currentSlideData.availableTime}</p>
                          <p className="text-xs text-slate-500">{currentSlideData.doctorName}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Rating Card - Bottom Left */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`rating-${currentSlide}`}
                    className="absolute -left-4 lg:left-4 bottom-16 lg:bottom-20 z-20"
                    initial={{ opacity: 0, y: 20, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="font-bold text-slate-900 text-lg">{currentSlideData.rating}</p>
                      <p className="text-xs text-slate-500">{currentSlideData.reviews}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Decorative Elements Behind Image */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-teal-300/40 to-teal-200/20 rounded-2xl -z-10"
                  animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-300/40 to-blue-200/20 rounded-2xl -z-10"
                  animate={{ rotate: [0, -8, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-1/4 left-0 w-4 h-24 lg:h-32 bg-gradient-to-b from-yellow-300/60 to-yellow-200/20 rounded-full -z-10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Navigation Arrows */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 flex flex-col gap-2">
                  <motion.button
                    onClick={() => {
                      setCurrentSlide((prev) => (prev - 1 + heroSlidesData.length) % heroSlidesData.length);
                      setIsAutoPlaying(false);
                      setProgress(0);
                      setTimeout(() => setIsAutoPlaying(true), 8000);
                    }}
                    className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-500 hover:border-blue-200 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous slide"
                  >
                    <ChevronRight size={20} className="rotate-90" />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setCurrentSlide((prev) => (prev + 1) % heroSlidesData.length);
                      setIsAutoPlaying(false);
                      setProgress(0);
                      setTimeout(() => setIsAutoPlaying(true), 8000);
                    }}
                    className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-500 hover:border-blue-200 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} className="-rotate-90" />
                  </motion.button>
                </div>

                {/* Dot Navigation Indicators */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                  {heroSlidesData.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        setIsAutoPlaying(false);
                        setProgress(0);
                        setTimeout(() => setIsAutoPlaying(true), 8000);
                      }}
                      className={`flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 h-8 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "w-6 h-6 bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Support Banner */}
      <motion.section 
        className="bg-blue-700 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg">Meet The Team Support Medical Service</h3>
                <p className="text-blue-100 text-sm">For us, there are no minor aspects, because a quality</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Button 
                asChild 
                className="rounded-full px-6 bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-lg"
              >
                <Link to="/appointment">
                  Booking Now 
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

    {/* Stats */}
    <section className="surface-tint py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={cardStagger}
              className="text-center"
            >
              <stat.icon className="mx-auto mb-3 text-primary" size={28} />
              <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ServiceHighlightStrip />

    {/* Consultation Cards Section */}
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {/* Schedule Consultation Card */}
          <motion.div 
            variants={fadeUp}
            className="bg-white rounded-2xl p-8 border-2 border-primary shadow-lg shadow-primary/10 text-center"
          >
            <h4 className="text-xl font-display font-bold text-foreground mb-3">Schedule Consultation</h4>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Book a free consultation to learn how our care management programs can help your practice</p>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button 
                asChild 
                size="lg"
                className="rounded-full px-8 bg-primary text-white hover:bg-primary/90 shadow-lg"
              >
                <Link to="/contact">
                  Book Appointment
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-4">Free 30-minute consultation</p>
          </motion.div>

          {/* Speak With Us Card */}
          <motion.div 
            variants={fadeUp}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center"
          >
            <h4 className="text-xl font-display font-bold text-foreground mb-3">Speak With Us</h4>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Have questions? Call us to discuss PCM, CCM, RPM and how we can support your patients</p>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-primary text-primary hover:bg-primary/10"
              >
                <a href="tel:9177447308">
                  <Phone size={18} className="mr-2" />
                  Get Call
                </a>
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-4">(917) 744-7308</p>
          </motion.div>

          {/* View Services Card */}
          <motion.div 
            variants={fadeUp}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center"
          >
            <h4 className="text-xl font-display font-bold text-foreground mb-3">Explore Our Services</h4>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Learn about Principal Care, Chronic Care Management, and Remote Patient Monitoring</p>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                <Link to="/services">
                  Our Service
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-4">PCM • CCM • RPM</p>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Enhanced Founder Vision Section */}
    {!featuredLoading && featuredPerson && (
      <EnhancedFounderSection featuredPerson={featuredPerson} settings={settings} />
    )}

    {/* CTA */}
    <section className="py-20">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={scaleIn} className="rounded-2xl p-10 sm:p-14 text-center" style={{ background: "var(--hero-gradient)" }}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-background mb-4">Ready to Transform Patient Care?</h2>
          <p className="text-background/80 max-w-xl mx-auto mb-8">
            Join thousands of healthcare providers who trust OmniMed for proactive, technology-driven care management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8 bg-background text-foreground hover:bg-background/90">
                <Link to="/appointment">Schedule a Demo</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-background/30 text-background hover:bg-background/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </Layout>
  );
};

export default Index;
