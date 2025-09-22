// Availability API endpoint for Cloudflare Pages Functions

// Mock availability data (in production, this would come from database)
const mockAvailability = [
  {
    id: "1",
    serviceId: "1", // Recording Studio
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "18:00",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    serviceId: "1", // Recording Studio  
    dayOfWeek: 2, // Tuesday
    startTime: "09:00",
    endTime: "18:00",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  // Add more availability slots as needed
];

// GET /api/availability/:serviceId - Get availability for service
export async function onRequestGet(context) {
  try {
    const { params, env } = context;
    const { serviceId } = params;
    
    // TODO: Replace with actual database query
    // const availability = await env.DB.prepare("SELECT * FROM availability WHERE service_id = ? AND is_active = true ORDER BY day_of_week, start_time").bind(serviceId).all();
    
    const availability = mockAvailability.filter(a => a.serviceId === serviceId && a.isActive);
    
    return Response.json(availability);
    
  } catch (error) {
    console.error('Get availability error:', error);
    return Response.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}