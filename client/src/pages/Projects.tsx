import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBotWidget from "@/components/ChatBotWidget";

const projects = [
  {
    id: "seaport",
    name: "Seaport Infrastructure",
    location: "Muscat, Oman",
    description: "Quay wall construction and breakwater installation",
    category: "Marine",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/ScxGkCDjPFNOhvON.png",
  },
  {
    id: "coastal",
    name: "Coastal Protection Systems",
    location: "Salalah, Oman",
    description: "Rock armour installation and coastal defense",
    category: "Coastal",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/zrgzKMxwmxJkeDsu.jpg",
  },
  {
    id: "road",
    name: "Road Infrastructure Development",
    location: "Oman",
    description: "Road construction and infrastructure development",
    category: "Infrastructure",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/gvWLawWCNocSINuR.jpeg",
  },
  {
    id: "asphalt",
    name: "Asphalt Paving Works",
    location: "Oman",
    description: "Asphalt paving with modern equipment",
    category: "Infrastructure",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/GjfldJYeoGyqGIMR.jpeg",
  },
  {
    id: "pipe",
    name: "Underground Pipe Installation",
    location: "Oman",
    description: "Water and sewage pipe installation",
    category: "Infrastructure",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/IGKoWMSOFVCVNNKX.jpg",
  },
  {
    id: "formwork",
    name: "Concrete Formwork",
    location: "Oman",
    description: "Concrete formwork and reinforcement works",
    category: "Infrastructure",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/JjoMvapXmvuuLACi.png",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section data-testid="section-projects-hero">
        <div className="w-full overflow-hidden max-h-[320px]">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/blByadAMGkJrDqRB.gif"
            alt="Our Projects"
            className="w-full h-[320px] object-cover"
          />
        </div>
        <div className="text-center py-16 bg-white">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" data-testid="text-projects-heading">Our Projects</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg px-4">
            Delivering excellence across marine, infrastructure, and industrial projects throughout Oman.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white" data-testid="section-projects-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow group" data-testid={`card-project-${project.id}`}>
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{project.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{project.name}</h3>
                  <p className="text-sky-600 text-sm font-medium mb-2">{project.location}</p>
                  <p className="text-slate-600 text-sm">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
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
