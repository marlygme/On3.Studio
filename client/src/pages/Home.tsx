import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Video, Camera, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion, createMotionVariants } from "@/hooks/use-reduced-motion";
import { useState, useEffect, useRef } from "react";

// Import studio images for background collage
import recordingStudioImg from "@assets/generated_images/Recording_studio_hero_background_1aff66b6.png";
import podcastStudioImg from "@assets/generated_images/Podcast_studio_background_image_a5f50052.png";
import photographyStudioImg from "@assets/generated_images/Photography_studio_space_image_8dc33136.png";
import creativeLoungeImg from "@assets/generated_images/Creative_lounge_atmosphere_image_89c2e339.png";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = createMotionVariants(prefersReducedMotion);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  // CSS-driven spotlight with no React re-renders
  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        
        // Only update CSS custom properties - no React state
        heroRef.current.style.setProperty('--mouse-x', `${relativeX}px`);
        heroRef.current.style.setProperty('--mouse-y', `${relativeY}px`);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        updatePosition(e.clientX, e.clientY);
      });
    };

    const handlePointerEnter = () => {
      setIsSpotlightActive(true);
      if (heroRef.current) {
        heroRef.current.classList.add('spotlight-active');
      }
    };
    
    const handlePointerLeave = () => {
      setIsSpotlightActive(false);
      if (heroRef.current) {
        heroRef.current.classList.remove('spotlight-active');
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Activate immediately on any pointer interaction
      setIsSpotlightActive(true);
      if (heroRef.current) {
        heroRef.current.classList.add('spotlight-active');
      }
      updatePosition(e.clientX, e.clientY);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      // Unified pointer events (handles mouse, touch, pen)
      heroElement.addEventListener('pointermove', handlePointerMove, { passive: true });
      heroElement.addEventListener('pointerenter', handlePointerEnter);
      heroElement.addEventListener('pointerleave', handlePointerLeave);
      heroElement.addEventListener('pointerdown', handlePointerDown);
      
      // Set initial position (center of viewport)
      const rect = heroElement.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      heroElement.style.setProperty('--mouse-x', `${centerX}px`);
      heroElement.style.setProperty('--mouse-y', `${centerY}px`);
      
      // Auto-activate on mobile
      if ('ontouchstart' in window) {
        heroElement.classList.add('spotlight-mobile');
      }
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('pointermove', handlePointerMove);
        heroElement.removeEventListener('pointerenter', handlePointerEnter);
        heroElement.removeEventListener('pointerleave', handlePointerLeave);
        heroElement.removeEventListener('pointerdown', handlePointerDown);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const backgroundImages = [
    { src: recordingStudioImg, alt: "Recording Studio" },
    { src: podcastStudioImg, alt: "Podcast Studio" },
    { src: photographyStudioImg, alt: "Photography Studio" },
    { src: creativeLoungeImg, alt: "Creative Lounge" }
  ];
  
  const services = [
    {
      title: "Recording Studio",
      description: "Professional recording space with industry-standard equipment for your musical creations.",
      equipment: ["Neve 1073DPX", "Tube-Tech CL 1B", "SSL Sigma", "U87", "Focal Trio6"],
      href: "/music",
      icon: Mic
    },
    {
      title: "Podcast Studio",
      description: "Multi-camera podcast setup perfect for intimate conversations and professional content creation.",
      equipment: ["SM7Bs", "RØDECaster Pro", "ATEM Mini Pro", "Multi-camera setup"],
      href: "/podcast",
      icon: Video
    },
    {
      title: "Photography Studio",
      description: "Spacious cyclorama studio with professional lighting for all your creative visual projects.",
      equipment: ["3m x 7.5m cyclorama", "Pro lighting options", "Epson projector"],
      href: "/photography",
      icon: Camera
    },
    {
      title: "Creative Lounge",
      description: "Open, relaxed space for rehearsals, writing, workshops, intimate events, and creative collaboration.",
      equipment: ["PIONEER XDJ-XZ", "Full sound system"],
      href: "/events",
      icon: Users
    }
  ];

  return (
    <div>
      {/* Interactive Community Spotlight Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden spotlight-hero"
        style={{ cursor: isSpotlightActive ? 'none' : 'default' }}
      >
        {/* Background Collage Layer */}
        <div className="absolute inset-0 spotlight-background">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute bg-cover bg-center spotlight-image spotlight-image-${index + 1}`}
              style={{ backgroundImage: `url(${image.src})` }}
            />
          ))}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/95"></div>

        {/* Custom Spotlight Cursor */}
        <div className="absolute pointer-events-none spotlight-cursor z-20" />
        
        {/* Massive Central Title */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.h1 
            initial={motionVariants.fadeIn.initial}
            animate={motionVariants.fadeIn.animate}
            transition={{ ...motionVariants.fadeIn.transition, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="spotlight-title mb-16" 
            data-testid="text-hero-title"
          >
            <span className="text-white">ON3</span>
            <br />
            <span className="text-orange-accent">STUDIO</span>
          </motion.h1>
          
          {/* Subtitle appears on hover/interaction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSpotlightActive ? 1 : 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light" 
               data-testid="text-hero-description">
              A home away from home for artists, built for music, connection and culture. 
              A community and space to plug in, create, and feel free.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isSpotlightActive ? 1 : 0.6, 
                y: isSpotlightActive ? 0 : 10 
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="btn-orange-accent px-8 py-4 text-lg"
                data-testid="button-explore-spaces"
                onClick={() => {
                  const element = document.querySelector('#services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Discover the Space
              </Button>
              <Link href="/booking">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white px-8 py-4 text-lg hover:bg-white/10 hover:border-orange-accent"
                  data-testid="button-book-session"
                >
                  Book a Session
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 font-light tracking-wide">MOVE TO EXPLORE</span>
            <div className="w-0.5 h-8 bg-white/40 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Overview - The Space */}
      <section id="services" className="section-spacing px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={motionVariants.fadeIn.initial}
            whileInView={motionVariants.fadeIn.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-services-title">
              <span className="text-orange-accent">THE</span> SPACE
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything under one roof, ready to go
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="asymmetric-offset professional-grid md:grid-cols-2"
            variants={motionVariants.stagger}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={{
                    hidden: { y: prefersReducedMotion ? 0 : 30, opacity: prefersReducedMotion ? 1 : 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }}
                >
                  <Link href={service.href}>
                    <motion.div
                      whileHover={motionVariants.hover}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    >
                      <Card className="bg-card rounded-xl p-8 service-card-hover cursor-pointer border border-border h-full" data-testid={`card-service-${index}`}>
                        <div className="w-full h-48 bg-card/30 rounded-lg mb-6 flex items-center justify-center border border-border">
                          <div className="text-center">
                            <p className="text-xl font-bold text-primary">IMAGE HERE</p>
                            <p className="text-sm text-muted-foreground mt-1">{service.title} image placeholder</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative"
                          >
                            <IconComponent className="text-orange-accent w-6 h-6" />
                            <motion.div
                              className="absolute -right-1 -top-1 w-2 h-2 bg-orange-accent rounded-full"
                              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                              transition={{ duration: prefersReducedMotion ? 0.01 : 2, repeat: prefersReducedMotion ? 0 : Infinity }}
                            />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <div className="space-y-2 text-sm">
                          {service.equipment.map((item, idx) => (
                            <motion.div 
                              key={idx} 
                              className="flex items-center gap-2"
                              initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: prefersReducedMotion ? 0 : idx * 0.1, duration: prefersReducedMotion ? 0.01 : 0.3 }}
                              viewport={{ once: true }}
                            >
                              <div className="w-1 h-1 bg-accent rounded-full"></div>
                              <span>{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission Statement - Why We Exist */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2 
            initial={motionVariants.fadeIn.initial}
            whileInView={motionVariants.fadeIn.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-8" 
            data-testid="text-mission-title"
          >
            <span className="text-primary">WHY</span> WE EXIST
          </motion.h2>
          <motion.p 
            initial={motionVariants.fadeIn.initial}
            whileInView={motionVariants.fadeIn.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8" 
            data-testid="text-mission-description"
          >
            We saw a gap and wanted to give back. ON3 is built with integrity, a safe, 
            inspiring space where artists can land in Melbourne, feel at home, tap-in and 
            create without the noise.
          </motion.p>
          <motion.p 
            initial={motionVariants.fadeIn.initial}
            whileInView={motionVariants.fadeIn.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="text-lg text-accent font-semibold" 
            data-testid="text-mission-focus"
          >
            Our focus is community, passion, and real culture.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
