import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBotWidget from "@/components/ChatBotWidget";

export default function Services() {
  const services = [
    {
      id: "marine",
      name: "Marine & Coastal Construction",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/eErINryfjAMBHdEq.png",
      description: "Cahit Trading & Contracting LLC provides specialized marine construction services including:",
      details: ["Sea Harbors", "Breakwaters", "Groynes", "Revetments"],
    },
    {
      id: "infrastructure",
      name: "Infrastructure Development",
      images: [
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/gvWLawWCNocSINuR.jpeg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/GjfldJYeoGyqGIMR.jpeg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/GORAtqFGJlEPryhc.jpeg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/mejIiORMfOESXWxO.jpeg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/pdSXKYWQJmOrlgEf.png",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/jdGZtMFCClzefYrV.png",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KwvgeYAlpTuNmOVB.png",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/dSXvJZPDnnYBewLl.png",
      ],
      description: "Infrastructure projects today require innovative engineering solutions and advanced construction techniques. Cahit delivers infrastructure solutions including utilities, roads and industrial facilities.",
    },
    {
      id: "earthworks",
      name: "Earthworks",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/hMZPCXiHvRhErvHk.gif",
      description: "We provide comprehensive earthworks services including excavation, grading, leveling and compaction for infrastructure projects and construction sites.",
    },
    {
      id: "dewatering",
      name: "Dewatering & Shoring",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/eErINryfjAMBHdEq.png",
      description: "We design and implement advanced groundwater control systems including:",
      details: ["Wellpoint systems", "Deep wells", "Sheet piling", "Soldier walls"],
    },
    {
      id: "mep",
      name: "MEP Works",
      images: [
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/qZRtUjMizSFySgTf.png",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/QHXkfNaKCsHdvVIH.jpeg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/ZSgHztstBUeAueGA.jpeg",
      ],
      description: "Our MEP services include:",
      details: ["Water & Wastewater Treatment", "Pumping Stations", "Industrial Piping", "Irrigation Systems"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative h-64 md:h-80 overflow-hidden" data-testid="section-services-hero">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/RAFPoJQUVEWIIOWX.gif"
          alt="Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D6B]/80 to-sky-600/60 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-services-heading">Our Services</h1>
            <p className="text-white/80 mt-4 max-w-2xl text-lg">
              Our diverse expertise allows us to support complex infrastructure projects across multiple sectors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" data-testid="section-services-list">
        <div className="container mx-auto px-4 space-y-20">
          {services.map((service, idx) => (
            <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`} data-testid={`service-${service.id}`}>
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                {"images" in service && service.images ? (
                  <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                    {service.images.slice(0, 4).map((img, i) => (
                      <img key={i} src={img} alt={service.name} className="w-full h-40 object-cover" />
                    ))}
                  </div>
                ) : (
                  <img src={service.image} alt={service.name} className="w-full h-72 object-cover rounded-xl shadow-lg" />
                )}
              </div>
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{service.description}</p>
                {"details" in service && service.details && (
                  <ul className="space-y-2 mb-6">
                    {service.details.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
                        <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-600" data-testid="section-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Build Your Next Project</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Whether planning marine infrastructure, coastal protection, or large-scale civil works, our team is ready to support your project with reliable expertise and professional execution.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 font-semibold" data-testid="button-cta-contact">
              Contact Our Team <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBotWidget />
    </div>
  );
}
