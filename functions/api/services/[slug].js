// Service by slug API endpoint for Cloudflare Pages Functions

// Mock data for services (in production, this would come from database)
const mockServices = [
  {
    id: "1",
    name: "Recording Studio",
    slug: "recording-studio",
    description: "Professional recording space with industry-standard equipment including Neve 1073DPX, Tube-Tech CL 1B, SSL Sigma, U87, and Focal Trio6 monitors.",
    duration: 120, // 2 hours
    price: "150.00",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2", 
    name: "Podcast Studio",
    slug: "podcast-studio",
    description: "Multi-camera podcast setup with SM7B microphones, RØDECaster Pro, ATEM Mini Pro, and professional video recording capabilities.",
    duration: 90, // 1.5 hours
    price: "100.00",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    name: "Photography Studio", 
    slug: "photography-studio",
    description: "Spacious 3m x 7.5m cyclorama studio with professional lighting options and Epson projector for creative visual projects.",
    duration: 180, // 3 hours
    price: "200.00",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "4",
    name: "Creative Lounge",
    slug: "creative-lounge", 
    description: "Open, relaxed space for rehearsals, writing, workshops, intimate events, and creative collaboration with PIONEER XDJ-XZ and full sound system.",
    duration: 240, // 4 hours
    price: "250.00",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

// GET /api/services/:slug - Get service by slug
export async function onRequestGet(context) {
  try {
    const { params, env } = context;
    const { slug } = params;
    
    // TODO: Replace with actual database query
    // const service = await env.DB.prepare("SELECT * FROM services WHERE slug = ? AND is_active = true").bind(slug).first();
    
    const service = mockServices.find(s => s.slug === slug && s.isActive);
    
    if (!service) {
      return Response.json({ 
        success: false, 
        message: "Service not found" 
      }, { status: 404 });
    }
    
    return Response.json(service);
    
  } catch (error) {
    console.error('Get service by slug error:', error);
    return Response.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}