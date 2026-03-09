import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play, X, Phone, Mail, MapPin, MessageCircle, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { clientLogos as importedLogos } from "@/lib/logos";
import ProgressiveFunnelPanel, { useProgressiveFunnel } from "@/components/LeadQualificationFunnel";

export default function Home() {
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFunnelModal, setShowFunnelModal] = useState(false);
  const [activeServiceFilter, setActiveServiceFilter] = useState("all");
  const [carouselPage, setCarouselPage] = useState(0);
  const [counters, setCounters] = useState({ years: 0, projects: 0, satisfaction: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState(3);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const qualityAssuranceVideoRef = useRef<HTMLVideoElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const aboutVideoRef = useRef<HTMLVideoElement | null>(null);
  const funnel = useProgressiveFunnel();

  useEffect(() => {
    if (!hasScrolled) return;
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounters({
        years: Math.floor(15 * progress),
        projects: Math.floor(50 * progress),
        satisfaction: Math.floor(100 * progress)
      });
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [hasScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 500) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const updateVisibleLogos = () => {
      if (window.innerWidth < 640) setVisibleLogos(1);
      else if (window.innerWidth < 1024) setVisibleLogos(2);
      else setVisibleLogos(3);
    };
    updateVisibleLogos();
    window.addEventListener("resize", updateVisibleLogos);
    return () => window.removeEventListener("resize", updateVisibleLogos);
  }, []);

  const totalPages = Math.ceil(importedLogos.length / visibleLogos);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showContactPopup) setShowContactPopup(false);
        if (showAboutModal) {
          setShowAboutModal(false);
          if (aboutVideoRef.current) { aboutVideoRef.current.pause(); aboutVideoRef.current.currentTime = 0; }
        }
        if (showFunnelModal) setShowFunnelModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showContactPopup, showAboutModal, showFunnelModal]);

  const handleTestimonialHover = (index: number, isHovering: boolean) => {
    setHoveredTestimonial(isHovering ? index : null);
    const video = videoRefs.current[index];
    if (video) {
      if (isHovering) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleQualityAssuranceHover = (isHovering: boolean) => {
    const video = qualityAssuranceVideoRef.current;
    if (video) {
      if (isHovering) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const services = [
    { id: "marine", name: "Marine Construction", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/EGRSgZmJXJSrWKJY.png", description: "Expert marine construction services for ports, harbors, and coastal infrastructure projects." },
    { id: "infrastructure", name: "Infrastructure Development", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KjQWglanMKnrpvTy.png", description: "Sustainable infrastructure projects that meet global standards and regulations." },
    { id: "earthworks", name: "Earthworks & Grading", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/rlnzqoNxClUnClFA.png", description: "Precision excavation and grading services for optimal project foundation and site preparation." },
    { id: "dewatering", name: "Dewatering & Shoring", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/NHQbvhqluSlDGrrN.png", description: "Advanced dewatering and shoring solutions for complex construction environments." },
    { id: "mep", name: "MEP Works", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/fzEWxkFRlpSKTsnU.png", description: "Mechanical, electrical, and plumbing systems installation and integration." },
    { id: "quality", name: "Quality Assurance", image: "", description: "Rigorous quality control and assurance processes ensuring excellence on every project." }
  ];

  const filteredServices = activeServiceFilter === "all" ? services : services.filter(s => s.id === activeServiceFilter);
  const clientLogos = importedLogos;

  const handleCarouselPrev = () => {
    setCarouselPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCarouselNext = () => {
    setCarouselPage((prev) => (prev + 1) % totalPages);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      <nav className="sticky top-0 z-50 bg-sky-500 shadow-lg" data-testid="nav-main">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/EILLLBYLeCNrUbzF.png"
              alt="Cahit Logo"
              className="h-10 w-auto"
              data-testid="img-logo"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-sky-100 transition font-medium" data-testid="link-home">Home</a>
            <button onClick={() => setShowAboutModal(true)} className="text-white hover:text-sky-100 transition font-medium" data-testid="button-about">About</button>
            <button onClick={() => scrollToSection("expertise-section")} className="text-white hover:text-sky-100 transition font-medium" data-testid="link-services">Services</button>
            <button onClick={() => scrollToSection("projects-section")} className="text-white hover:text-sky-100 transition font-medium" data-testid="link-projects">Projects</button>
            <button onClick={() => scrollToSection("testimonials-section")} className="text-white hover:text-sky-100 transition font-medium" data-testid="link-testimonials">Testimonials</button>
            <button onClick={() => setShowContactPopup(true)} className="text-white hover:text-sky-100 transition font-medium" data-testid="button-contact-nav">Contact</button>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-white text-sky-600 hover:bg-sky-50 font-semibold hidden sm:inline-flex" data-testid="button-get-quote" onClick={() => setShowContactPopup(true)}>Get Quote</Button>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-sky-600 border-t border-sky-400 px-4 py-4 space-y-3">
            <a href="#" className="block text-white hover:text-sky-100 transition font-medium" data-testid="mobile-link-home">Home</a>
            <button onClick={() => { setShowAboutModal(true); setMobileMenuOpen(false); }} className="block text-white hover:text-sky-100 transition font-medium w-full text-left" data-testid="mobile-button-about">About</button>
            <button onClick={() => scrollToSection("expertise-section")} className="block text-white hover:text-sky-100 transition font-medium w-full text-left" data-testid="mobile-link-services">Services</button>
            <button onClick={() => scrollToSection("projects-section")} className="block text-white hover:text-sky-100 transition font-medium w-full text-left" data-testid="mobile-link-projects">Projects</button>
            <button onClick={() => { setShowContactPopup(true); setMobileMenuOpen(false); }} className="block text-white hover:text-sky-100 transition font-medium w-full text-left" data-testid="mobile-button-contact">Contact</button>
          </div>
        )}
      </nav>

      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="About Cahit Contracting" data-testid="modal-about" onClick={(e) => { if (e.target === e.currentTarget) { setShowAboutModal(false); if (aboutVideoRef.current) { aboutVideoRef.current.pause(); aboutVideoRef.current.currentTime = 0; } } }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="flex items-center justify-between gap-4 p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900" data-testid="text-about-title">About Cahit Contracting</h2>
              <button
                onClick={() => {
                  setShowAboutModal(false);
                  if (aboutVideoRef.current) {
                    aboutVideoRef.current.pause();
                    aboutVideoRef.current.currentTime = 0;
                  }
                }}
                className="text-slate-400 hover:text-slate-600 transition"
                data-testid="button-close-about"
              >
                <X className="w-6 h-6" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="relative w-full bg-black">
              <video ref={aboutVideoRef} className="w-full h-auto" controls autoPlay>
                <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/AtcBFtPQatxcgPuw.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <p className="text-slate-700 leading-relaxed" data-testid="text-about-description">
                Cahit Contracting is a leading marine and coastal construction company based in Oman, with over 15 years of experience delivering world-class infrastructure projects. Our team combines cutting-edge technology with proven expertise to transform challenging marine environments into thriving commercial and industrial hubs.
              </p>
            </div>
          </div>
        </div>
      )}

      {showContactPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Contact Us" data-testid="modal-contact" onClick={(e) => { if (e.target === e.currentTarget) setShowContactPopup(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-slate-900" data-testid="text-contact-title">Contact Us</h2>
              <button onClick={() => setShowContactPopup(false)} className="text-slate-400 hover:text-slate-600 transition" data-testid="button-close-contact">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <a href="tel:+96871545981" className="flex items-start gap-4 p-4 rounded-lg hover:bg-sky-50 transition cursor-pointer group" data-testid="link-phone">
                <Phone className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-600 transition">Call Us</p>
                  <p className="text-slate-600">+968 7154 5981</p>
                </div>
              </a>
              <a href="mailto:ctc@cahitcontracting.com" className="flex items-start gap-4 p-4 rounded-lg hover:bg-sky-50 transition cursor-pointer group" data-testid="link-email">
                <Mail className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-600 transition">Email Us</p>
                  <p className="text-slate-600">ctc@cahitcontracting.com</p>
                </div>
              </a>
              <a href="https://wa.me/96871545981" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-lg hover:bg-sky-50 transition cursor-pointer group" data-testid="link-whatsapp">
                <MessageCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-600 transition">WhatsApp</p>
                  <p className="text-slate-600">+968 7154 5981</p>
                </div>
              </a>
              <div className="flex items-start gap-4 p-4 rounded-lg group">
                <MapPin className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Visit Us</p>
                  <p className="text-slate-600">Muscat, Sultanate of Oman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        onMouseMove={funnel.handleHeroMouseMove}
        onMouseLeave={funnel.handleHeroMouseLeave}
        data-testid="section-hero"
      >
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/FtuVECRYiIRERWQB.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,100,140,0.85)] via-[rgba(20,130,170,0.70)] to-[rgba(60,180,220,0.30)] z-10"></div>
        <div className="relative z-20 w-full h-full flex items-center">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/30 mb-8">
                <span className="text-white font-semibold text-sm" data-testid="text-hero-badge">Next Generation Marine Construction</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-white mb-6 drop-shadow-lg" data-testid="text-hero-title">
                CAHIT CONTRACTING
                <br />
                <span className="text-cyan-200">A Solid Ground</span>
                <br />
                For Your Project
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-10 font-light drop-shadow-md max-w-2xl" data-testid="text-hero-subtitle">
                Marine & Coastal Construction Experts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-white text-sky-700 hover:bg-cyan-50 font-bold text-lg px-8 py-6 shadow-lg"
                  onClick={() => scrollToSection("expertise-section")}
                  data-testid="button-hero-consultation"
                >
                  Schedule Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="bg-cyan-300/20 border-2 border-white text-white hover:bg-white/20 font-bold text-lg px-8 py-6 backdrop-blur-sm shadow-lg"
                  onClick={() => scrollToSection("projects-section")}
                  data-testid="button-hero-portfolio"
                >
                  View Portfolio
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/30">
                <div>
                  <div className="text-4xl font-bold text-white drop-shadow-md" data-testid="text-counter-years">{counters.years}+</div>
                  <div className="text-sm text-white/80 font-light">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white drop-shadow-md" data-testid="text-counter-projects">{counters.projects}+</div>
                  <div className="text-sm text-white/80 font-light">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white drop-shadow-md" data-testid="text-counter-satisfaction">{counters.satisfaction}%</div>
                  <div className="text-sm text-white/80 font-light">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {funnel.heroVisible && (
          <ProgressiveFunnelPanel
            currentSection="hero"
            onStepComplete={funnel.handleStepComplete}
            globalStep={funnel.globalStep}
            mouseActive={funnel.heroVisible}
            onPanelInteract={funnel.markPanelInteracting}
            onPanelFocus={funnel.markPanelFocused}
            onDismiss={funnel.dismissPanel}
          />
        )}
      </section>

      <section className="py-16 bg-white border-b border-slate-100" data-testid="section-logos">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 mb-12" data-testid="text-logos-title">Trusted By Leading Partners Across Oman</h2>
          <div className="relative flex items-center gap-4">
            <button
              onClick={handleCarouselPrev}
              className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hover:bg-sky-50"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-6 h-6 text-sky-600" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>
            <div className="overflow-hidden mx-12">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselPage * 100}%)` }}
              >
                {clientLogos.map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 px-3 sm:px-6" style={{ width: `${100 / visibleLogos}%` }}>
                    <div className="flex items-center justify-center h-32 bg-white rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all group cursor-pointer p-4">
                      <div className="text-center flex flex-col items-center justify-center w-full h-full">
                        <img
                          src={logo.logo}
                          alt={logo.name}
                          className="h-16 max-w-[160px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                          data-testid={`img-logo-${idx}`}
                        />
                        <p className="text-sm font-medium text-slate-500 mt-2 group-hover:text-sky-600 transition-colors text-center">{logo.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleCarouselNext}
              className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hover:bg-sky-50"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-6 h-6 text-sky-600" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselPage(idx)}
                className={`h-2 rounded-full transition-all ${idx === carouselPage ? "bg-sky-500 w-8" : "bg-slate-300 w-2"}`}
                aria-label={`Go to page ${idx + 1}`}
                data-testid={`button-carousel-dot-${idx}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="expertise-section"
        className="py-20 bg-slate-50 relative"
        onMouseMove={funnel.handleExpertiseMouseMove}
        onMouseLeave={funnel.handleExpertiseMouseLeave}
        data-testid="section-expertise"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4" data-testid="text-expertise-title">Our Expertise</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Comprehensive solutions across all aspects of marine and coastal construction
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveServiceFilter("all")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${activeServiceFilter === "all" ? "bg-sky-600 text-white shadow-lg" : "bg-white text-slate-700 border border-slate-300 hover:border-sky-300"}`}
                data-testid="button-filter-all"
              >
                All Services
              </button>
              {services.slice(0, 5).map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceFilter(service.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${activeServiceFilter === service.id ? "bg-sky-600 text-white shadow-lg" : "bg-white text-slate-700 border border-slate-300 hover:border-sky-300"}`}
                  data-testid={`button-filter-${service.id}`}
                >
                  {service.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              service.id === "quality" ? (
                <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow border-0" data-testid={`card-service-${service.id}`}>
                  <div
                    className="relative h-64 overflow-hidden bg-slate-900 cursor-pointer"
                    onMouseEnter={() => handleQualityAssuranceHover(true)}
                    onMouseLeave={() => handleQualityAssuranceHover(false)}
                  >
                    <video ref={qualityAssuranceVideoRef} className="w-full h-full object-cover" loop>
                      <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/YKThcmtywiJZakli.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <a href="#" className="text-sky-600 font-semibold hover:text-sky-700 flex items-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              ) : (
                <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow border-0" data-testid={`card-service-${service.id}`}>
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <a href="#" className="text-sky-600 font-semibold hover:text-sky-700 flex items-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              )
            ))}
          </div>
        </div>

        {funnel.expertiseVisible && (
          <ProgressiveFunnelPanel
            currentSection="expertise"
            onStepComplete={funnel.handleStepComplete}
            globalStep={funnel.globalStep}
            mouseActive={funnel.expertiseVisible}
            onPanelInteract={funnel.markPanelInteracting}
            onPanelFocus={funnel.markPanelFocused}
            onDismiss={funnel.dismissPanel}
          />
        )}
      </section>

      <section
        id="projects-section"
        className="py-20 bg-white relative"
        onMouseMove={funnel.handleProjectsMouseMove}
        onMouseLeave={funnel.handleProjectsMouseLeave}
        data-testid="section-projects"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4" data-testid="text-projects-title">Featured Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Showcasing our most impactful and innovative projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow" data-testid="card-project-seaport">
              <div className="relative h-80 overflow-hidden bg-slate-200">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/eErINryfjAMBHdEq.png" alt="Seaport Development" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Seaport Development</h3>
                <p className="text-slate-600 mb-4">Complete port modernization with advanced container handling infrastructure and marine facilities.</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-sky-600 font-semibold">Timeline: 24 months</span>
                  <span className="text-sky-600 font-semibold">Budget: $50M+</span>
                </div>
              </div>
            </div>
            <div className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow" data-testid="card-project-coastal">
              <div className="relative h-80 overflow-hidden bg-slate-200">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/tIrTadrTpCSOFHTL.png" alt="Coastal Protection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Coastal Protection</h3>
                <p className="text-slate-600 mb-4">Comprehensive coastal defense system protecting critical infrastructure from marine erosion.</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-sky-600 font-semibold">Timeline: 18 months</span>
                  <span className="text-sky-600 font-semibold">Budget: $35M+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {funnel.projectsVisible && (
          <ProgressiveFunnelPanel
            currentSection="projects"
            onStepComplete={funnel.handleStepComplete}
            globalStep={funnel.globalStep}
            mouseActive={funnel.projectsVisible}
            onPanelInteract={funnel.markPanelInteracting}
            onPanelFocus={funnel.markPanelFocused}
            onDismiss={funnel.dismissPanel}
          />
        )}
      </section>

      <section id="testimonials-section" className="py-20 bg-slate-50" data-testid="section-testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4" data-testid="text-testimonials-title">What Our Clients Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Hear directly from the partners who trust us with their most critical projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden" data-testid="card-testimonial-0">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Ahmed Al Rashdi</h3>
                <p className="text-sm text-sky-600 font-semibold">Project Director</p>
              </div>
              <div
                className="relative h-64 bg-slate-900 cursor-pointer group"
                onMouseEnter={() => handleTestimonialHover(0, true)}
                onMouseLeave={() => handleTestimonialHover(0, false)}
              >
                <video ref={(el) => { if (el) videoRefs.current[0] = el; }} className="w-full h-full object-cover" loop>
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/ieSQBIDjAuekTIBg.mp4" type="video/mp4" />
                </video>
                {hoveredTestimonial !== 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">&#9733;</span>))}
                </div>
                <p className="text-slate-700 leading-relaxed">"Cahit Contracting exceeded our expectations in every aspect. Their commitment to quality and safety is remarkable."</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden" data-testid="card-testimonial-1">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Fatima Al Balushi</h3>
                <p className="text-sm text-sky-600 font-semibold">Senior Engineer</p>
              </div>
              <div
                className="relative h-64 bg-slate-900 cursor-pointer group"
                onMouseEnter={() => handleTestimonialHover(1, true)}
                onMouseLeave={() => handleTestimonialHover(1, false)}
              >
                <video ref={(el) => { if (el) videoRefs.current[1] = el; }} className="w-full h-full object-cover" loop>
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KfWjzeCVFRzSeyrS.mp4" type="video/mp4" />
                </video>
                {hoveredTestimonial !== 1 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">&#9733;</span>))}
                </div>
                <p className="text-slate-700 leading-relaxed">"Professional team, cutting-edge technology, and exceptional attention to detail. Highly recommend Cahit for such large projects."</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden" data-testid="card-testimonial-2">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Mohammed Al Kharusi</h3>
                <p className="text-sm text-sky-600 font-semibold">Operations Director</p>
              </div>
              <div
                className="relative h-64 bg-slate-900 cursor-pointer group"
                onMouseEnter={() => handleTestimonialHover(2, true)}
                onMouseLeave={() => handleTestimonialHover(2, false)}
              >
                <video ref={(el) => { if (el) videoRefs.current[2] = el; }} className="w-full h-full object-cover" loop>
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/BYFzAQaQLtnxrZLT.mp4" type="video/mp4" />
                </video>
                {hoveredTestimonial !== 2 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">&#9733;</span>))}
                </div>
                <p className="text-slate-700 leading-relaxed">"Outstanding project management and technical expertise. Cahit Contracting is our trusted partner for critical infrastructure projects."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600" data-testid="section-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6" data-testid="text-cta-title">Ready to Start Your Project?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your marine and coastal construction needs
          </p>
          <Button
            size="lg"
            className="bg-white text-sky-600 hover:bg-sky-50 font-semibold"
            onClick={() => setShowContactPopup(true)}
            data-testid="button-cta-contact"
          >
            Get In Touch <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {showFunnelModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Get a Quote" data-testid="modal-funnel" onClick={(e) => { if (e.target === e.currentTarget) setShowFunnelModal(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-slate-900">Get a Free Consultation</h2>
              <button onClick={() => setShowFunnelModal(false)} className="text-slate-400 hover:text-slate-600 transition" data-testid="button-close-funnel-modal">
                <X className="w-6 h-6" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <ProgressiveFunnelPanel
              currentSection={funnel.globalStep === 1 ? "hero" : funnel.globalStep === 2 ? "expertise" : "projects"}
              onStepComplete={funnel.handleStepComplete}
              globalStep={funnel.globalStep}
              mouseActive={true}
              onPanelInteract={funnel.markPanelInteracting}
              onPanelFocus={funnel.markPanelFocused}
              onDismiss={() => setShowFunnelModal(false)}
              inline
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          size="lg"
          className="bg-sky-600 text-white hover:bg-sky-700 shadow-xl rounded-full px-6 py-4 font-semibold"
          onClick={() => setShowFunnelModal(true)}
          data-testid="button-mobile-cta"
        >
          Get Quote <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <footer className="bg-slate-900 text-white py-12" data-testid="footer">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/EILLLBYLeCNrUbzF.png" alt="Cahit Logo" className="h-10 w-auto mb-4" data-testid="img-footer-logo" />
              <p className="text-slate-400">Marine & Coastal Construction Experts</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition" data-testid="footer-link-home">Home</a></li>
                <li><button onClick={() => scrollToSection("expertise-section")} className="hover:text-white transition" data-testid="footer-link-services">Services</button></li>
                <li><button onClick={() => scrollToSection("projects-section")} className="hover:text-white transition" data-testid="footer-link-projects">Projects</button></li>
                <li><button onClick={() => scrollToSection("testimonials-section")} className="hover:text-white transition" data-testid="footer-link-testimonials">Testimonials</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Marine Construction</a></li>
                <li><a href="#" className="hover:text-white transition">Infrastructure</a></li>
                <li><a href="#" className="hover:text-white transition">Dewatering</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <button onClick={() => setShowContactPopup(true)} className="text-slate-400 hover:text-white transition text-left" data-testid="footer-button-contact">Get in Touch</button>
              <p className="text-slate-400 mt-2">+968 7154 5981</p>
              <p className="text-slate-400">ctc@cahitcontracting.com</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p data-testid="text-copyright">&copy; 2025 Cahit Contracting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}