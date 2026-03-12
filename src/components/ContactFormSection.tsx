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
import { Send, CheckCircle2 } from "lucide-react";
import { sectionReveal, slideInRight, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactFormSection = () => {
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

  return (
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Send Us a Message
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Have questions about our care management services? Fill out the form and our team will respond promptly.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideInRight}
          className="max-w-2xl mx-auto"
        >
          <div className="card-elevated p-8 sm:p-10 rounded-2xl">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="text-secondary" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                    <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }} className="rounded-full">
                      Send Another Message
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
    </section>
  );
};

export default ContactFormSection;
