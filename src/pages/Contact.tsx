import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink } from "lucide-react";
import { fadeUp, sectionReveal, blurReveal, slideInRight, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";

const OFFICE_ADDRESS = "178-27 Hillside Ave, Jamaica, NY 11432";
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=178-27+Hillside+Ave,Jamaica,NY+11432";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4!2d-73.7847!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2618f7f6a1b7d%3A0x4b6d8a3b2c5e1f0a!2s178-27%20Hillside%20Ave%2C%20Jamaica%2C%20NY%2011432!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone, label: "Phone", value: "(917) 744 7308", verified: true },
  { icon: Mail, label: "Email", value: "info@omnimedhealth.com" },
  { icon: MapPin, label: "Address", value: "178-27 Hillside Ave, Jamaica, NY 11432" },
  { icon: Clock, label: "Office Hours", value: "Mon–Fri: 8am–6pm EST" },
];

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", phone: "", service: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log("Contact form submitted:", data);
    }, 1200);
  };

  const directionsUrl = DIRECTIONS_URL;

  return (
    <>
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div initial="hidden" animate="visible" className="text-center max-w-2xl mx-auto mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Contact Us</motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">Get in Touch</motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-muted-foreground text-lg">Have questions about our care management services? We'd love to hear from you.</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
              <div className="space-y-5">
                {contactInfo.map((c, i) => (
                  <motion.div key={c.label} custom={i} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideIn} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        {c.label}
                        {c.verified && <CheckCircle2 size={13} className="text-secondary" />}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Google Map with blur reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={blurReveal}
                className="card-elevated overflow-hidden rounded-2xl"
                style={{ height: 300 }}
              >
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OmniMed Office Location"
                  className="rounded-2xl"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce} transition={{ delay: 0.4 }}>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  <ExternalLink size={15} /> Get Directions
                </a>
              </motion.div>
            </div>

            {/* Right Column — Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInRight} className="lg:col-span-3 order-1 lg:order-2">
              <div className="card-elevated p-8 sm:p-10 rounded-2xl">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-center py-12">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 20 }} className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-secondary" size={32} />
                      </motion.div>
                      <h2 className="text-2xl font-display font-bold text-foreground mb-2">Message Sent!</h2>
                      <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                        <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }} className="rounded-full">Send Another Message</Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-xl font-display font-bold text-foreground mb-1">Send Us a Message</h2>
                      <p className="text-sm text-muted-foreground mb-8">Fill out the form and our team will respond promptly.</p>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                              <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" className="transition-colors duration-300 focus:border-primary" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem><FormLabel>Professional Email</FormLabel><FormControl><Input type="email" placeholder="john@example.com" className="transition-colors duration-300 focus:border-primary" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="(917) 744 7308" className="transition-colors duration-300 focus:border-primary" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="service" render={({ field }) => (
                              <FormItem><FormLabel>Service Interest</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                                  <SelectContent>
                                    <SelectItem value="pcm">Principal Care Management</SelectItem>
                                    <SelectItem value="ccm">Chronic Care Management</SelectItem>
                                    <SelectItem value="rpm">Remote Patient Monitoring</SelectItem>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                  </SelectContent>
                                </Select>
                              <FormMessage /></FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Tell us how we can help..." rows={5} className="transition-colors duration-300 focus:border-primary" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                            <Button type="submit" disabled={loading} className="rounded-full px-8" size="lg">
                              {loading ? (
                                <span className="flex items-center gap-2">
                                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                  Sending...
                                </span>
                              ) : (
                                <>Send Message <Send size={16} className="ml-1.5" /></>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
