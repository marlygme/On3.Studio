import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import on3Logo from "@assets/on3logo_1758183733141.png";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);

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
      <header className="fixed w-full top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" data-testid="link-home">
                <img 
                  src={on3Logo} 
                  alt="ON3 STUDIO Logo" 
                  className="h-12 w-auto cursor-pointer"
                />
              </Link>
              <div className="hidden md:flex space-x-6 items-center">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={`transition-colors ${
                      location === item.href 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* The Space Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
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
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
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
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/booking" data-testid="button-book-now">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                  Book Now
                </button>
              </Link>
              {/* Mobile menu button */}
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
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-4 pt-4">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={`transition-colors ${
                      location === item.href 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
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
                      className="block py-2 pl-4 text-muted-foreground hover:text-primary transition-colors"
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
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img 
                src={on3Logo} 
                alt="ON3 STUDIO Logo" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-muted-foreground mb-6">
                A creative lounge in Melbourne. A home away from home for artists.
              </p>
              <a 
                href="mailto:TEAM@ON3.STUDIO" 
                className="text-primary hover:text-primary/80"
                data-testid="link-email-footer"
              >
                TEAM@ON3.STUDIO
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    data-testid={`footer-link-${item.name.toLowerCase().replace(' ', '-')}`}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <p className="text-muted-foreground">Recording Studio</p>
                <p className="text-muted-foreground">Podcast Production</p>
                <p className="text-muted-foreground">Photography Studio</p>
                <p className="text-muted-foreground">Creative Lounge</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 ON3 STUDIO. Built with integrity for the creative community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
