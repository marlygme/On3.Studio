// Contact API endpoint for Cloudflare Pages Functions
import { z } from 'zod';

// Define validation schema (simplified version of insertContactSchema)
const insertContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"), 
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
  phone: z.string().optional(),
});

// POST /api/contact - Create contact submission
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    // Validate the request data
    const validatedData = insertContactSchema.parse(body);
    
    // For now, we'll simulate storage - in production you would:
    // 1. Connect to external database (like Neon, PlanetScale, etc.)
    // 2. Or use Cloudflare D1 database
    // 3. Or store in KV/R2 
    
    const contact = {
      id: crypto.randomUUID(),
      ...validatedData,
      createdAt: new Date().toISOString()
    };
    
    // TODO: Implement actual database storage
    // await env.DB.prepare("INSERT INTO contact_submissions ...").run();
    
    return Response.json({ 
      success: true, 
      message: "Contact form submitted successfully", 
      id: contact.id 
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        success: false, 
        message: "Validation error", 
        errors: error.errors 
      }, { status: 400 });
    } else {
      console.error('Contact submission error:', error);
      return Response.json({ 
        success: false, 
        message: "Internal server error" 
      }, { status: 500 });
    }
  }
}

// GET /api/contact - Get contact submissions (admin endpoint)
export async function onRequestGet(context) {
  try {
    const { env } = context;
    
    // TODO: Implement actual database retrieval
    // const contacts = await env.DB.prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC").all();
    
    // For now, return empty array - replace with actual database query
    const contacts = [];
    
    return Response.json(contacts);
    
  } catch (error) {
    console.error('Get contacts error:', error);
    return Response.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}