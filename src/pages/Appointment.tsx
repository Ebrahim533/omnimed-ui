import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { fadeUp, sectionReveal, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const Appointment = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      toast({ title: "Please select a date and time", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="section-container max-w-2xl mx-auto">
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
                <h1 className="text-3xl font-display font-bold text-foreground mb-3">Appointment Requested!</h1>
                <p className="text-muted-foreground mb-2">{format(date!, "MMMM d, yyyy")} at {time}</p>
                <p className="text-sm text-muted-foreground">Our team will confirm your appointment within 24 hours via email.</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div initial="hidden" animate="visible" className="text-center mb-12">
                  <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Appointments</motion.p>
                  <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">Book a Consultation</motion.h1>
                  <motion.p custom={2} variants={fadeUp} className="text-muted-foreground">Schedule a time to discuss your care management needs with our team.</motion.p>
                </motion.div>

                <motion.form
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={sectionReveal}
                  onSubmit={handleSubmit}
                  className="card-elevated p-8 space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required placeholder="John Doe" className="transition-colors duration-300 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apptEmail">Email</Label>
                      <Input id="apptEmail" type="email" required placeholder="john@example.com" className="transition-colors duration-300 focus:border-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="transition-colors duration-300 focus:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <Label>Service Interest</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcm">Principal Care Management</SelectItem>
                        <SelectItem value="ccm">Chronic Care Management</SelectItem>
                        <SelectItem value="rpm">Remote Patient Monitoring</SelectItem>
                        <SelectItem value="general">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 6} initialFocus className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger>
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any specific concerns or questions..." rows={3} className="transition-colors duration-300 focus:border-primary" />
                  </div>

                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button type="submit" className="w-full rounded-full" size="lg">Request Appointment</Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Appointment;
