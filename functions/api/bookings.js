// Bookings API endpoint for Cloudflare Pages Functions
import { z } from 'zod';

// Define validation schema (simplified version of insertBookingSchema)
const insertBookingSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  startTime: z.string().datetime("Please provide a valid date and time"),
  endTime: z.string().datetime("Please provide a valid date and time"),
  status: z.string().default("pending"),
  notes: z.string().optional(),
  totalPrice: z.string().optional(),
});

// POST /api/bookings - Create booking
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    // Validate the request data
    const validatedData = insertBookingSchema.parse(body);
    
    // Create booking object
    const booking = {
      id: crypto.randomUUID(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // TODO: Implement actual database storage
    // await env.DB.prepare("INSERT INTO bookings ...").bind(...).run();
    
    return Response.json({ 
      success: true, 
      message: "Booking created successfully", 
      booking 
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        success: false, 
        message: "Validation error", 
        errors: error.errors 
      }, { status: 400 });
    } else {
      console.error('Create booking error:', error);
      return Response.json({ 
        success: false, 
        message: "Internal server error" 
      }, { status: 500 });
    }
  }
}

// GET /api/bookings - Get bookings with filters
export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    
    if (email) {
      // TODO: Replace with actual database query
      // const bookings = await env.DB.prepare("SELECT * FROM bookings WHERE email = ? ORDER BY start_time").bind(email).all();
      const bookings = []; // Mock empty result
      
      return Response.json(bookings);
      
    } else if (startDate && endDate) {
      // TODO: Replace with actual database query 
      // const bookings = await env.DB.prepare("SELECT * FROM bookings WHERE start_time >= ? AND start_time <= ? ORDER BY start_time").bind(startDate, endDate).all();
      const bookings = []; // Mock empty result
      
      return Response.json(bookings);
      
    } else {
      return Response.json({ 
        success: false, 
        message: "Email or date range required" 
      }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Get bookings error:', error);
    return Response.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}