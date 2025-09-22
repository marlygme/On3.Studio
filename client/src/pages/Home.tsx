import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Video, Camera, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion, createMotionVariants } from "@/hooks/use-reduced-motion";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = createMotionVariants(prefersReducedMotion);
  
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background">
          <div className="w-full h-full flex items-center justify-center bg-card/20">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary opacity-60">IMAGE HERE</p>
              <p className="text-muted-foreground mt-2 opacity-60">Hero background image placeholder</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={motionVariants.fadeIn.initial}
            animate={motionVariants.fadeIn.animate}
            transition={{ ...motionVariants.fadeIn.transition, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="hero-title-massive mb-8 hero-text-shadow" 
            data-testid="text-hero-title"
          >
            <span className="text-orange-accent">ON3 STUDIO</span>
            <br />
            <span className="text-primary text-4xl md:text-6xl" style={{fontFamily: 'var(--font-condensed)', letterSpacing: '-2px'}}>IS A CREATIVE LOUNGE IN MELBOURNE</span>
          </motion.h1>
          <motion.p 
            initial={motionVariants.fadeIn.initial}
            animate={motionVariants.fadeIn.animate}
            transition={{ ...motionVariants.fadeIn.transition, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed hero-text-shadow max-w-3xl mx-auto" 
            data-testid="text-hero-description"
          >
            A home away from home for artists, built for music, connection and culture. 
            A community and space to plug in, create, and feel free.
          </motion.p>
          <motion.div 
            initial={motionVariants.fadeIn.initial}
            animate={motionVariants.fadeIn.animate}
            transition={{ ...motionVariants.fadeIn.transition, delay: prefersReducedMotion ? 0 : 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={motionVariants.buttonHover}
              whileTap={motionVariants.buttonTap}
              transition={{ type: "spring", stiffness: 300 }}
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
                Explore Our Spaces
              </Button>
            </motion.div>
            <Link href="/booking">
              <motion.div
                whileHover={motionVariants.buttonHover}
                whileTap={motionVariants.buttonTap}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary text-primary px-8 py-4 text-lg hover:bg-primary/10"
                  data-testid="button-book-session"
                >
                  Book a Session
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
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
