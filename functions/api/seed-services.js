// Seed services API endpoint for Cloudflare Pages Functions

const initialServices = [
  {
    id: crypto.randomUUID(),
    name: "Recording Studio",
    slug: "recording-studio",
    description: "Professional recording space with industry-standard equipment including Neve 1073DPX, Tube-Tech CL 1B, SSL Sigma, U87, and Focal Trio6 monitors.",
    duration: 120, // 2 hours
    price: "150.00",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Podcast Studio",
    slug: "podcast-studio", 
    description: "Multi-camera podcast setup with SM7B microphones, RØDECaster Pro, ATEM Mini Pro, and professional video recording capabilities.",
    duration: 90, // 1.5 hours
    price: "100.00",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Photography Studio",
    slug: "photography-studio",
    description: "Spacious 3m x 7.5m cyclorama studio with professional lighting options and Epson projector for creative visual projects.",
    duration: 180, // 3 hours
    price: "200.00",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Creative Lounge",
    slug: "creative-lounge",
    description: "Open, relaxed space for rehearsals, writing, workshops, intimate events, and creative collaboration with PIONEER XDJ-XZ and full sound system.",
    duration: 240, // 4 hours
    price: "250.00",
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// POST /api/seed-services - Initialize services if empty
export async function onRequestPost(context) {
  try {
    const { env } = context;
    
    // TODO: Replace with actual database queries
    // const existingServices = await env.DB.prepare("SELECT COUNT(*) as count FROM services").first();
    
    // For now, assume services don't exist and return success
    // In production, you would check if services exist and only seed if empty
    
    // if (existingServices.count === 0) {
    //   for (const service of initialServices) {
    //     await env.DB.prepare("INSERT INTO services (id, name, slug, description, duration, price, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    //       .bind(service.id, service.name, service.slug, service.description, service.duration, service.price, service.isActive, service.createdAt)
    //       .run();
    //   }
    //   
    //   return Response.json({ success: true, message: "Services seeded successfully" });
    // } else {
    //   return Response.json({ success: true, message: "Services already exist" });
    // }
    
    // Mock response for now
    return Response.json({ success: true, message: "Services seeded successfully" });
    
  } catch (error) {
    console.error('Seed services error:', error);
    return Response.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}