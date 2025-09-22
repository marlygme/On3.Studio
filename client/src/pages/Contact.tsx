import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContact } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="section-spacing px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-contact-title">
            <span className="text-orange-accent">GET</span> IN TOUCH
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to create something amazing? Let's talk.
          </p>
        </div>

        <div className="professional-grid lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-orange-accent" data-testid="text-contact-info-title">CONTACT INFORMATION</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-4 contact-item" data-testid="contact-email">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-orange-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a 
                    href="mailto:TEAM@ON3.STUDIO" 
                    className="text-primary hover:text-primary/80"
                    data-testid="link-contact-email"
                  >
                    TEAM@ON3.STUDIO
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 contact-item" data-testid="contact-location">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-orange-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground descriptive-text">325 Victoria St, Brunswick VIC 3056</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4 step-item">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Plug-and-play</h4>
                    <p className="text-muted-foreground descriptive-text">Book, land in Melbourne and get straight into it.</p>
                  </div>
                </div>
                <div className="flex gap-4 step-item">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Create</h4>
                    <p className="text-muted-foreground descriptive-text">Record, rehearse, shoot, create, podcast, or connect.</p>
                  </div>
                </div>
                <div className="flex gap-4 step-item">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Connect</h4>
                    <p className="text-muted-foreground descriptive-text">Tap into our community of creatives & artists.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="professional-form">
            <h2 className="text-2xl font-bold mb-8" data-testid="text-contact-form-title">Send us a message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      className="professional-input"
                      data-testid="input-first-name"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      className="professional-input"
                      data-testid="input-last-name"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="professional-input"
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    className="professional-input"
                    data-testid="input-phone"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...form.register("message")}
                    className="professional-input resize-none"
                    data-testid="textarea-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full submit-btn-orange"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
