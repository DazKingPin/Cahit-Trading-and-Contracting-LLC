import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Award } from "lucide-react";
import { clientLogos as importedLogos } from "@/lib/logos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBotWidget from "@/components/ChatBotWidget";

export default function About() {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleVideoHover = (key: string, isHovering: boolean) => {
    const video = videoRefs.current[key];
    if (video) {
      if (isHovering) {
        video.muted = false;
        video.play().catch(() => { video.muted = true; video.play().catch(() => {}); });
      } else {
        video.pause();
        video.muted = true;
        video.currentTime = 0;
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative h-[400px] overflow-hidden" data-testid="section-about-hero">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/pdSXKYWQJmOrlgEf.png"
          alt="Infrastructure aerial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D6B]/70 via-[#0A3D6B]/50 to-[#0A3D6B]/80 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg" data-testid="text-about-heading">About Cahit Trading & Contracting</h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-md">
              Cahit Trading & Contracting LLC partners with government authorities, developers, and industrial organizations to deliver complex infrastructure and marine construction projects across Oman.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" data-testid="section-company-overview">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Company Overview</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cahit Trading & Contracting LLC has been operating in Oman since 2009, delivering a wide range of construction and infrastructure services.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The company has successfully participated in major projects across marine construction, infrastructure development and industrial services.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Through experienced leadership and skilled engineering teams, Cahit continues to contribute to the development of critical infrastructure throughout the region.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/gvWLawWCNocSINuR.jpeg" alt="Road construction" className="w-full h-40 object-cover" />
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/GjfldJYeoGyqGIMR.jpeg" alt="Asphalt paving" className="w-full h-40 object-cover" />
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/jdGZtMFCClzefYrV.png" alt="Pipe installation" className="w-full h-40 object-cover" />
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KwvgeYAlpTuNmOVB.png" alt="Concrete formwork" className="w-full h-40 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50" data-testid="section-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-600">7+</div>
              <p className="text-slate-600 text-sm mt-2">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-600">25+</div>
              <p className="text-slate-600 text-sm mt-2">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-600">100%</div>
              <p className="text-slate-600 text-sm mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" data-testid="section-mission-vision">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-sky-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To apply our knowledge and experience in the construction industry to deliver high-quality infrastructure projects while contributing to the development of Oman.
              </p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To become a leading regional contractor recognized for excellence in marine construction, infrastructure development and industrial services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50" data-testid="section-leadership">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4" data-testid="text-leadership-title">Leadership</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Meet the professionals behind Cahit Trading & Contracting.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" data-testid="card-leader-tahir">
              <div className="relative h-64 bg-slate-900 cursor-pointer group" onMouseEnter={() => handleVideoHover("tahir", true)} onMouseLeave={() => handleVideoHover("tahir", false)}>
                <video ref={(el) => { if (el) videoRefs.current["tahir"] = el; }} className="w-full h-full object-cover" loop muted>
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/ieSQBIDjAuekTIBg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">Hover to Watch</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">Tahir Şenyurt</h3>
                <p className="text-sky-600 font-semibold text-sm mb-4">Managing Director</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Tahir Şenyurt is a Civil Engineer with over 25 years of experience in the construction and contracting industry. He has successfully led numerous projects including marine infrastructure, road construction, industrial facilities and residential developments across Turkey and the GCC.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  As Managing Director of Cahit Trading & Contracting LLC, he leads the company's operations and strategic growth within Oman's construction sector.
                </p>
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Education</p>
                    <p className="text-sm text-slate-700">Bachelor of Civil Engineering — University of Middle East Technical</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">License</p>
                    <p className="text-sm text-slate-700">Registered Civil Engineer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden" data-testid="card-leader-pasha">
              <div className="relative h-64 bg-slate-900 cursor-pointer group" onMouseEnter={() => handleVideoHover("pasha", true)} onMouseLeave={() => handleVideoHover("pasha", false)}>
                <video ref={(el) => { if (el) videoRefs.current["pasha"] = el; }} className="w-full h-full object-cover" loop muted>
                  <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KfWjzeCVFRzSeyrS.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">Hover to Watch</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">Pasha Hüseyin Ari</h3>
                <p className="text-sky-600 font-semibold text-sm mb-4">General Coordinator</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Pasha Hüseyin Ari holds a Master's degree in Environmental Engineering from Istanbul Technical University and brings over 15 years of experience in environmental and infrastructure-related sectors.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  His expertise includes water treatment systems, desalination plants, soil improvement projects, marine construction and Oil & Gas infrastructure works.
                </p>
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Education</p>
                    <p className="text-sm text-slate-700">MSc of Environmental Engineering — Istanbul Technical University</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">License</p>
                    <p className="text-sm text-slate-700">Registered Environmental Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-commitment">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition">
              <Shield className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Best Quality</h3>
              <p className="text-slate-600 text-sm">We maintain the highest engineering and construction standards in every project.</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition">
              <Clock className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">On-Time Delivery</h3>
              <p className="text-slate-600 text-sm">We respect project timelines and deliver reliable execution without compromising quality.</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition">
              <Award className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Experience</h3>
              <p className="text-slate-600 text-sm">Our experienced professionals ensure efficient project delivery and operational excellence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50" data-testid="section-clients">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Trusted by Leading Organizations</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {importedLogos.map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center h-20 bg-white rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all group cursor-pointer p-3">
                <img src={logo.logo} alt={logo.name} className="h-10 max-w-[100px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatBotWidget />
    </div>
  );
}
