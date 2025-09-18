import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Video, Camera, Users } from "lucide-react";
import { motion } from "framer-motion";
import recordingStudioHero from "@assets/generated_images/Recording_studio_hero_background_1aff66b6.png";
import podcastStudioImg from "@assets/generated_images/Podcast_studio_background_image_a5f50052.png";
import photographyStudioImg from "@assets/generated_images/Photography_studio_space_image_8dc33136.png";
import creativeLoungeImg from "@assets/generated_images/Creative_lounge_atmosphere_image_89c2e339.png";

export default function Home() {
  const services = [
    {
      title: "Recording Studio",
      description: "Professional recording space with industry-standard equipment for your musical creations.",
      image: recordingStudioHero,
      equipment: ["Neve 1073DPX", "Tube-Tech CL 1B", "SSL Sigma", "U87", "Focal Trio6"],
      href: "/music",
      icon: Mic
    },
    {
      title: "Podcast Studio",
      description: "Multi-camera podcast setup perfect for intimate conversations and professional content creation.",
      image: podcastStudioImg,
      equipment: ["SM7Bs", "RØDECaster Pro", "ATEM Mini Pro", "Multi-camera setup"],
      href: "/podcast",
      icon: Video
    },
    {
      title: "Photography Studio",
      description: "Spacious cyclorama studio with professional lighting for all your creative visual projects.",
      image: photographyStudioImg,
      equipment: ["3m x 7.5m cyclorama", "Pro lighting options", "Epson projector"],
      href: "/photography",
      icon: Camera
    },
    {
      title: "Creative Lounge",
      description: "Open, relaxed space for rehearsals, writing, workshops, intimate events, and creative collaboration.",
      image: creativeLoungeImg,
      equipment: ["PIONEER XDJ-XZ", "Full sound system"],
      href: "/events",
      icon: Users
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-background to-background"
        >
          <img 
            src={recordingStudioHero}
            alt="Dark moody recording studio with warm orange lighting" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-8 hero-text-shadow" 
            data-testid="text-hero-title"
          >
            <span className="text-primary">ON3</span> is a creative lounge in Melbourne
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed hero-text-shadow max-w-3xl mx-auto" 
            data-testid="text-hero-description"
          >
            A home away from home for artists, built for music, connection and culture. 
            A community and space to plug in, create, and feel free.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90"
                data-testid="button-explore-spaces"
              >
                Explore Our Spaces
              </Button>
            </motion.div>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-services-title">
              <span className="text-primary">THE</span> SPACE
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything under one roof, ready to go
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Link href={service.href}>
                    <motion.div
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="bg-card rounded-xl p-8 service-card-hover cursor-pointer border border-border h-full" data-testid={`card-service-${index}`}>
                        <motion.img 
                          src={service.image}
                          alt={`${service.title} - professional studio space`}
                          className="w-full h-48 object-cover rounded-lg mb-6" 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            whileHover={{ rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <IconComponent className="text-accent w-6 h-6" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <div className="space-y-2 text-sm">
                          {service.equipment.map((item, idx) => (
                            <motion.div 
                              key={idx} 
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.3 }}
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
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-8" 
            data-testid="text-mission-title"
          >
            <span className="text-primary">WHY</span> WE EXIST
          </motion.h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8" 
            data-testid="text-mission-description"
          >
            We saw a gap and wanted to give back. ON3 is built with integrity, a safe, 
            inspiring space where artists can land in Melbourne, feel at home, tap-in and 
            create without the noise.
          </motion.p>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
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
