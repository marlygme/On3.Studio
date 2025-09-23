import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import on3Logo from "@assets/on3logo1_1758597235870.png";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navigation = [
    { name: "About Us", href: "/about" },
    { name: "Workshops", href: "/workshops" },
    { name: "Contact Us", href: "/contact" },
  ];

  const spaceOptions = [
    { name: "Recording Studio", href: "/music" },
    { name: "Podcast Room", href: "/podcast" },
    { name: "Photography/Cyclorama", href: "/photography" },
    { name: "Creative Lounge/Kitchen", href: "/events" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border' : 'bg-background/80 backdrop-blur-md border-b border-border/50'}`}>
        <nav className="container mx-auto px-6 transition-all duration-300">
          {/* Mobile Layout - Traditional */}
          <div className="md:hidden flex items-center justify-between">
            <Link href="/" data-testid="link-home">
              <img 
                src={on3Logo} 
                alt="ON3 STUDIO Logo" 
                className="h-12 w-auto cursor-pointer"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/booking" data-testid="button-book-now">
                <button className="btn-orange-accent px-4 py-2 rounded-md font-semibold text-sm">
                  Book Now
                </button>
              </Link>
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="text-foreground text-xl" />
                ) : (
                  <Menu className="text-foreground text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout - CSS Grid with Perfect Vertical Alignment */}
          <div className="hidden md:grid header-spotlight-layout">
            {/* Left Navigation Container */}
            <div className="header-nav-container">
              <div className="flex items-center space-x-6">
                {navigation.slice(0, 2).map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={`header-nav-link transition-colors text-base font-medium ${
                      location === item.href 
                        ? 'text-orange-accent' 
                        : 'text-muted-foreground hover:text-orange-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* The Space Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-1 text-muted-foreground header-nav-link transition-colors text-base font-medium hover:text-orange-accent"
                    onClick={() => setSpaceDropdownOpen(!spaceDropdownOpen)}
                    data-testid="dropdown-the-space"
                  >
                    <span>The Space</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {spaceDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {spaceOptions.map((option) => (
                          <Link
                            key={option.name}
                            href={option.href}
                            className="block px-4 py-2 text-sm text-muted-foreground cta-link hover:bg-accent/50 transition-colors"
                            data-testid={`dropdown-${option.name.toLowerCase().replace(/[\s\/]/g, '-')}`}
                            onClick={() => setSpaceDropdownOpen(false)}
                          >
                            {option.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {navigation.slice(2).map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={`header-nav-link transition-colors text-base font-medium ${
                      location === item.href 
                        ? 'text-orange-accent' 
                        : 'text-muted-foreground hover:text-orange-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Central Dominant Text Logo */}
            <div className="header-text-logo-container">
              <Link href="/" data-testid="link-home">
                <h1 className="header-text-logo">
                  <span className="text-primary">ON3</span> <span className="text-orange-accent">STUDIO</span>
                </h1>
              </Link>
            </div>

            {/* Right Navigation Container */}
            <div className="header-button-container">
              <Link href="/booking" data-testid="button-book-now">
                <button className="header-book-button btn-orange-accent rounded-md font-semibold">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-4 pt-4">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={`cta-link transition-colors ${
                      location === item.href 
                        ? 'text-primary' 
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Space Options */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-primary mb-2">The Space</p>
                  {spaceOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      className="block py-2 pl-4 text-muted-foreground cta-link transition-colors"
                      data-testid={`mobile-dropdown-${option.name.toLowerCase().replace(/[\s\/]/g, '-')}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        {children}
      </main>

      {/* Bold Footer Design Statement */}
      <footer className="bold-footer" data-testid="footer-bold">
        {/* Floating accent elements */}
        <div className="footer-accent accent-1"></div>
        <div className="footer-accent accent-2"></div>
        
        {/* Massive email address */}
        <a 
          href="mailto:TEAM@ON3.STUDIO" 
          className="massive-email"
          data-testid="link-email-massive"
        >
          TEAM@ON3.STUDIO
        </a>
        
        {/* Contact overlay - appears on hover */}
        <div className="contact-overlay">
          <div className="contact-grid">
            <div className="contact-item" data-testid="contact-location">
              <h3>Location</h3>
              <p>325 Victoria St</p>
              <p>Brunswick VIC 3056</p>
              <p>Melbourne, Australia</p>
            </div>
            
            <div className="contact-item" data-testid="contact-email">
              <h3>Get In Touch</h3>
              <p>
                <a href="mailto:TEAM@ON3.STUDIO">TEAM@ON3.STUDIO</a>
              </p>
              <p>For bookings & inquiries</p>
            </div>
            
            <div className="contact-item" data-testid="contact-studio">
              <h3>The Studio</h3>
              <p>Recording • Podcast • Photography</p>
              <p>Creative Lounge • Events</p>
              <p>A home away from home for artists</p>
            </div>
            
            <div className="contact-item" data-testid="contact-community">
              <h3>Community</h3>
              <p>Built with integrity</p>
              <p>For the creative community</p>
              <p>© 2024 ON3 STUDIO</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
