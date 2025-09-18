import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Clock, Calendar as CalendarIcon, Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import type { Service, Booking, Availability } from "@shared/schema";

// Booking form schema
const bookingFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function Booking() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1); // 1: Service, 2: DateTime, 3: Details, 4: Confirmation
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Get services
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/services'],
  });

  // Get availability for selected service and date
  const { data: availability = [], isLoading: availabilityLoading } = useQuery<Availability[]>({
    queryKey: ['/api/availability', selectedService?.id],
    enabled: !!selectedService?.id,
  });

  // Get existing bookings for selected date and service
  const selectedDateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  const { data: existingBookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings', { startDate: selectedDateStr, endDate: selectedDateStr, serviceId: selectedService?.id }],
    enabled: !!selectedDate && !!selectedService?.id,
  });

  // Generate available time slots based on service availability and existing bookings
  const generateAvailableTimeSlots = (): TimeSlot[] => {
    if (!selectedService || !selectedDate) return [];
    
    const dayOfWeek = selectedDate.getDay();
    const serviceAvailability = availability.find((avail: Availability) => 
      avail.serviceId === selectedService.id && avail.dayOfWeek === dayOfWeek
    );
    
    if (!serviceAvailability) return [];
    
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = serviceAvailability.startTime.split(':').map(Number);
    const [endHour, endMinute] = serviceAvailability.endTime.split(':').map(Number);
    
    // Generate 30-minute slots within availability window
    for (let hour = startHour; hour < endHour || (hour === endHour && 0 < endMinute); hour++) {
      for (let minute of [0, 30]) {
        if (hour === endHour && minute >= endMinute) break;
        
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if this slot + service duration fits within availability window
        const slotStart = new Date(selectedDate);
        slotStart.setHours(hour, minute, 0, 0);
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + selectedService.duration);
        
        // Check if slot end time exceeds availability window
        const availabilityEnd = new Date(selectedDate);
        availabilityEnd.setHours(endHour, endMinute, 0, 0);
        if (slotEnd > availabilityEnd) continue;
        
        // Check if slot is in the past (for current day)
        const now = new Date();
        const isPastSlot = selectedDate.toDateString() === now.toDateString() && slotStart <= now;
        
        const hasConflict = existingBookings.some((booking: Booking) => {
          const bookingStart = new Date(booking.startTime);
          const bookingEnd = new Date(booking.endTime);
          return (
            (slotStart >= bookingStart && slotStart < bookingEnd) ||
            (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
            (slotStart <= bookingStart && slotEnd >= bookingEnd)
          );
        });
        
        slots.push({ time, available: !hasConflict && !isPastSlot });
      }
    }
    return slots;
  };

  const timeSlots = generateAvailableTimeSlots();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  // Create booking mutation
  const createBooking = useMutation({
    mutationFn: async (bookingData: any) => {
      // Remove totalPrice to prevent client-side price tampering
      const { totalPrice, ...safeBookingData } = bookingData;
      const response = await apiRequest("POST", "/api/bookings", safeBookingData);
      return await response.json();
    },
    onSuccess: (data) => {
      setBookingResult(data);
      setStep(4);
      toast({
        title: "Booking Created!",
        description: "Your booking has been successfully created.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/availability'] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: BookingFormData) => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a service, date, and time.",
        variant: "destructive",
      });
      return;
    }

    // Calculate start and end times
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startTime = new Date(selectedDate);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + selectedService.duration);

    const bookingData = {
      serviceId: selectedService.id,
      ...formData,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      // Remove totalPrice - server will calculate this securely
    };

    createBooking.mutate(bookingData);
  };

  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({
        title: "Select a Service",
        description: "Please choose a service to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      toast({
        title: "Select Date & Time",
        description: "Please choose a date and time to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="py-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-booking-title">
            <span className="text-primary">BOOK</span> YOUR SESSION
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reserve your creative space at ON3 Studio
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > num ? <Check className="w-5 h-5" /> : num}
                </div>
                {num < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > num ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Choose Your Service</h2>
            {servicesLoading ? (
              <div className="text-center py-8">Loading services...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {(services as Service[]).map((service: Service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-6 cursor-pointer transition-all ${
                        selectedService?.id === service.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedService(service)}
                      data-testid={`card-service-${service.slug}`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-primary">{service.name}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration} minutes</span>
                        </div>
                        <div className="text-lg font-semibold text-primary">
                          ${service.price}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Select Date & Time</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Choose Date
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const compareDate = new Date(date);
                    compareDate.setHours(0, 0, 0, 0);
                    return compareDate < today || date.getDay() === 0;
                  }} // Disable past dates and Sundays
                  className="rounded-md border"
                  data-testid="calendar-date-picker"
                />
              </Card>

              {/* Time Slots */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Choose Time
                </h3>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="text-sm"
                        data-testid={`button-time-${slot.time}`}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Please select a date first</p>
                )}
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 3: Customer Details */}
        {step === 3 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Your Details</h2>
            <Card className="p-8 max-w-2xl mx-auto">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      data-testid="input-first-name"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      data-testid="input-last-name"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    placeholder="Any special requirements or additional information..."
                    {...form.register("notes")}
                    data-testid="textarea-notes"
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold">Booking Summary</h4>
                  <p><strong>Service:</strong> {selectedService?.name}</p>
                  <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Duration:</strong> {selectedService?.duration} minutes</p>
                  <p><strong>Total:</strong> ${selectedService?.price}</p>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && bookingResult && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-green-600">Booking Confirmed!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your session has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            <Card className="p-6 max-w-md mx-auto mb-8">
              <h4 className="font-semibold mb-4">Booking Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Service:</strong> {selectedService?.name}</p>
                <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Duration:</strong> {selectedService?.duration} minutes</p>
                <p><strong>Status:</strong> <span className="text-yellow-600">Pending Confirmation</span></p>
              </div>
            </Card>
            <Button 
              onClick={() => setLocation('/')} 
              size="lg"
              data-testid="button-back-home"
            >
              Back to Home
            </Button>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-between mt-12"
          >
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2"
              data-testid="button-previous-step"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {step === 3 ? (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={createBooking.isPending}
                className="flex items-center gap-2"
                data-testid="button-confirm-booking"
              >
                {createBooking.isPending ? "Creating..." : "Confirm Booking"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
                data-testid="button-next-step"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}