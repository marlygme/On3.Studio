import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import on3Logo from "@assets/on3logo1_1758600541986.png";

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
                <button className="btn-orange-accent px-4 py-1 rounded-md font-semibold text-sm">
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

            {/* Central Dominant Image Logo */}
            <div className="header-text-logo-container">
              <Link href="/" data-testid="link-home">
                <img 
                  src={on3Logo} 
                  alt="ON3 STUDIO Logo" 
                  className="h-10 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Right Navigation Container */}
            <div className="header-button-container">
              <Link href="/booking" data-testid="button-book-now">
                <button className="header-book-button-compact btn-orange-accent rounded-md font-semibold">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-6 pt-4">
                {/* Main Navigation Links */}
                <div>
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                      className={`block py-2 pl-4 cta-link transition-colors ${
                        location === item.href 
                          ? 'text-orange-accent' 
                          : 'text-muted-foreground hover:text-orange-accent'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* The Space Section */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">The Space</p>
                  {spaceOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      className="block py-2 pl-4 text-muted-foreground cta-link transition-colors hover:text-orange-accent"
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

      {/* Traditional Footer */}
      <footer className="bg-card border-t border-border" data-testid="footer-traditional">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-4" data-testid="footer-contact">
              <h3 className="text-lg font-semibold text-primary">Get In Touch</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <a href="mailto:TEAM@ON3.STUDIO" className="cta-link" data-testid="link-email">
                    TEAM@ON3.STUDIO
                  </a>
                </p>
                <p>For bookings & inquiries</p>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4" data-testid="footer-location">
              <h3 className="text-lg font-semibold text-primary">Location</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>325 Victoria St</p>
                <p>Brunswick VIC 3056</p>
                <p>Melbourne, Australia</p>
              </div>
            </div>

            {/* About */}
            <div className="space-y-4" data-testid="footer-about">
              <h3 className="text-lg font-semibold text-primary">ON3 STUDIO</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Recording • Podcast • Photography</p>
                <p>Creative Lounge • Events</p>
                <p>A home away from home for artists</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 ON3 STUDIO. Built with integrity for the creative community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
