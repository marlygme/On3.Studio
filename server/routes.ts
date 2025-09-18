import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertServiceSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.json({ success: true, message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get contact submissions (optional admin endpoint)
  app.get("/api/contact", async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Service endpoints
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          message: "Service not found" 
        });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Booking endpoints
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json({ success: true, message: "Booking created successfully", booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const { email, startDate, endDate } = req.query;
      
      if (email) {
        const bookings = await storage.getBookingsByEmail(email as string);
        res.json(bookings);
      } else if (startDate && endDate) {
        const bookings = await storage.getBookingsByDateRange(
          new Date(startDate as string),
          new Date(endDate as string)
        );
        res.json(bookings);
      } else {
        res.status(400).json({ 
          success: false, 
          message: "Email or date range required" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.get("/api/availability/:serviceId", async (req, res) => {
    try {
      const availability = await storage.getAvailability(req.params.serviceId);
      res.json(availability);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Initialize services if empty
  app.post("/api/seed-services", async (req, res) => {
    try {
      const services = await storage.getServices();
      if (services.length === 0) {
        const initialServices = [
          {
            name: "Recording Studio",
            slug: "recording-studio",
            description: "Professional recording space with industry-standard equipment including Neve 1073DPX, Tube-Tech CL 1B, SSL Sigma, U87, and Focal Trio6 monitors.",
            duration: 120, // 2 hours
            price: "150.00",
            isActive: true
          },
          {
            name: "Podcast Studio",
            slug: "podcast-studio", 
            description: "Multi-camera podcast setup with SM7B microphones, RØDECaster Pro, ATEM Mini Pro, and professional video recording capabilities.",
            duration: 90, // 1.5 hours
            price: "100.00",
            isActive: true
          },
          {
            name: "Photography Studio",
            slug: "photography-studio",
            description: "Spacious 3m x 7.5m cyclorama studio with professional lighting options and Epson projector for creative visual projects.",
            duration: 180, // 3 hours
            price: "200.00",
            isActive: true
          },
          {
            name: "Creative Lounge",
            slug: "creative-lounge",
            description: "Open, relaxed space for rehearsals, writing, workshops, intimate events, and creative collaboration with PIONEER XDJ-XZ and full sound system.",
            duration: 240, // 4 hours
            price: "250.00",
            isActive: true
          }
        ];

        for (const service of initialServices) {
          await storage.createService(service);
        }
        
        res.json({ success: true, message: "Services seeded successfully" });
      } else {
        res.json({ success: true, message: "Services already exist" });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
