import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Workshops", href: "/events" },
    { name: "Music", href: "/music" },
    { name: "Events", href: "/events" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" data-testid="link-home">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">ON3 STUDIO</h1>
              </Link>
              <div className="hidden md:flex space-x-6">
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
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/contact" data-testid="button-book-now">
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
              <h3 className="text-2xl font-bold text-primary mb-4">ON3 STUDIO</h3>
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
