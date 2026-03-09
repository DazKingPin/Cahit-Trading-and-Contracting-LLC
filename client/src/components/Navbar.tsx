import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-sky-500 shadow-lg" data-testid="nav-main">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/EILLLBYLeCNrUbzF.png" alt="Cahit Logo" className="h-14 w-auto" data-testid="img-logo" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition font-medium ${isActive(link.href) ? "text-white border-b-2 border-white pb-1" : "text-white/90 hover:text-white"}`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setShowContactPopup(true)}
              className="text-white/90 hover:text-white transition font-medium"
              data-testid="button-contact-nav"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="bg-white text-sky-600 hover:bg-sky-50 font-semibold hidden sm:inline-flex"
              onClick={() => setShowContactPopup(true)}
              data-testid="button-get-quote"
            >
              Get Quote
            </Button>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-sky-600 border-t border-sky-400 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block transition font-medium ${isActive(link.href) ? "text-white" : "text-white/80 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setShowContactPopup(true); setMobileMenuOpen(false); }}
              className="block text-white/80 hover:text-white transition font-medium w-full text-left"
            >
              Contact
            </button>
          </div>
        )}
      </nav>

      {showContactPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          data-testid="modal-contact"
          onClick={(e) => { if (e.target === e.currentTarget) setShowContactPopup(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900" data-testid="text-contact-title">Contact Us</h2>
              <button onClick={() => setShowContactPopup(false)} className="text-slate-400 hover:text-slate-600 transition" data-testid="button-close-contact">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-5">
              <a href="tel:+96824112406" className="flex items-start gap-4 p-4 rounded-lg hover:bg-sky-50 transition cursor-pointer group" data-testid="link-phone">
                <Phone className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-600 transition">Call Us</p>
                  <p className="text-slate-600">+968 2411 2406 Ext 101</p>
                  <p className="text-slate-600">+968 9096 6562</p>
                </div>
              </a>
              <a href="mailto:ctc@cahitcontracting.com" className="flex items-start gap-4 p-4 rounded-lg hover:bg-sky-50 transition cursor-pointer group" data-testid="link-email">
                <Mail className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-600 transition">Email Us</p>
                  <p className="text-slate-600">ctc@cahitcontracting.com</p>
                </div>
              </a>
              <a href="https://wa.me/96890966562" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-lg hover:bg-sky-50 transition cursor-pointer group" data-testid="link-whatsapp">
                <MessageCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-600 transition">WhatsApp</p>
                  <p className="text-slate-600">+968 9096 6562</p>
                </div>
              </a>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                <MapPin className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Address</p>
                  <p className="text-slate-600 text-sm">Khaleej Tower<br />6th Floor, No. 603<br />Ghala, Muscat<br />Sultanate of Oman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
