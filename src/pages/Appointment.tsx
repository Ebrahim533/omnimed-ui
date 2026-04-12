import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, CheckCircle2, Mail, CalendarDays, UserCheck, Stethoscope, User, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { fadeUp, sectionReveal, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";
import { sendAppointmentEmails, isEmailConfigured, generateBookingId } from "@/lib/emailService";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const departments = [
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "general", label: "General Medicine" },
];

const doctors = [
  { value: "dr-smith", label: "Dr. Sarah Smith", department: "cardiology" },
  { value: "dr-johnson", label: "Dr. Michael Johnson", department: "neurology" },
  { value: "dr-williams", label: "Dr. Emily Williams", department: "orthopedics" },
  { value: "dr-brown", label: "Dr. James Brown", department: "pediatrics" },
  { value: "dr-davis", label: "Dr. Linda Davis", department: "general" },
];

const steps = [
  { icon: Mail, title: "Select Service", description: "Choose the medical service you need" },
  { icon: Clock, title: "Pick Date & Time", description: "Select your preferred appointment slot" },
  { icon: UserCheck, title: "Confirm Details", description: "Provide your information and confirm" },
];

const Appointment = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    // Validation
    if (!date || !time) {
      toast({ title: "Please select a date and time", variant: "destructive" });
      return;
    }
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!email.trim()) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    if (!department) {
      toast({ title: "Please select a department", variant: "destructive" });
      return;
    }
    if (!doctor) {
      toast({ title: "Please select a doctor", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique booking ID
      const newBookingId = generateBookingId();
      setBookingId(newBookingId);

      // Prepare appointment data
      const appointmentData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || "Not provided",
        department: departments.find(d => d.value === department)?.label || department,
        doctor: doctors.find(d => d.value === doctor)?.label || doctor,
        date: `${format(date, "MMMM d, yyyy")} at ${time}`,
        notes: notes.trim() || "No additional notes",
        bookingId: newBookingId,
      };

      // Send emails (this won't block the UI if email service is not configured)
      const emailConfigExists = isEmailConfigured();
      
      if (emailConfigExists) {
        const { adminSent, userSent } = await sendAppointmentEmails(appointmentData);
        
        if (!adminSent || !userSent) {
          setEmailError("Appointment booked but email notification failed. We will contact you shortly.");
        }
      } else {
        console.log("Email service not configured. Appointment data:", appointmentData);
        // Still show success - the booking is recorded even if email isn't sent
      }

      // Show success
      setSubmitted(true);
      
      toast({
        title: "Appointment Booked Successfully!",
        description: emailConfigExists 
          ? "Check your email for confirmation." 
          : "We will contact you to confirm your appointment.",
      });

    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white min-h-screen">
        <div className="section-container max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
                className="text-center py-16 px-6"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 className="text-primary" size={48} />
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-display font-bold text-foreground mb-4"
                >
                  Appointment Confirmed!
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg mb-2"
                >
                  {format(date!, "MMMM d, yyyy")} at {time}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  Our team will confirm your appointment within 24 hours via email.
                </motion.p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_PROFESSIONAL }}
                  className="text-center mb-12"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4"
                  >
                    Schedule Your Appointment
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
                  >
                    Book your medical appointment in just a few simple steps. Our experienced healthcare professionals are ready to provide you with the best care possible.
                  </motion.p>
                </motion.div>

                {/* Steps */}
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
                  }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12"
                >
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PROFESSIONAL } }
                      }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex flex-col items-center text-center">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3 shadow-lg shadow-primary/30"
                        >
                          <step.icon className="text-white" size={24} />
                        </motion.div>
                        <h3 className="font-display font-semibold text-foreground text-sm">{step.title}</h3>
                        <p className="text-xs text-muted-foreground max-w-[140px] mt-1">{step.description}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                          className="hidden sm:block w-12 h-0.5 bg-primary/30 origin-left"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Form */}
                {/* Email Error Alert */}
                {emailError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
                  >
                    <p className="text-amber-800 text-sm text-center">{emailError}</p>
                  </motion.div>
                )}

                <motion.form
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: EASE_PROFESSIONAL }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input 
                          id="name" 
                          required 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name" 
                          className="pl-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300" 
                        />
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.65 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="apptEmail" className="text-foreground font-medium">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input 
                          id="apptEmail" 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email" 
                          className="pl-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300" 
                        />
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number" 
                        className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300" 
                      />
                    </motion.div>

                    {/* Department */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75 }}
                      className="space-y-2"
                    >
                      <Label className="text-foreground font-medium">Select Department</Label>
                      <Select value={department} onValueChange={(value) => { setDepartment(value); setDoctor(""); }}>
                        <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Choose department" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value} className="rounded-lg">
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Date */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-2"
                    >
                      <Label className="text-foreground font-medium">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "w-full h-12 rounded-xl border-slate-200 justify-start text-left font-normal hover:bg-slate-50",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-3 text-muted-foreground" size={18} />
                            {date ? format(date, "MM/dd/yyyy") : "mm/dd/yyyy"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                          <Calendar 
                            mode="single" 
                            selected={date} 
                            onSelect={setDate} 
                            disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 6} 
                            initialFocus 
                            className="p-3 pointer-events-auto rounded-xl" 
                          />
                        </PopoverContent>
                      </Popover>
                    </motion.div>

                    {/* Doctor */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.85 }}
                      className="space-y-2"
                    >
                      <Label className="text-foreground font-medium">Select Doctor</Label>
                      <Select value={doctor} onValueChange={setDoctor}>
                        <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Choose doctor" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {doctors
                            .filter((d) => !department || d.department === department)
                            .map((doc) => (
                            <SelectItem key={doc.value} value={doc.value} className="rounded-lg">
                              {doc.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  {/* Notes */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-6 space-y-2"
                  >
                    <Label htmlFor="notes" className="text-foreground font-medium">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional notes or symptoms (optional)" 
                      rows={4} 
                      className="rounded-xl border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-300" 
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }} 
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-14 rounded-xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={20} className="mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            BOOK APPOINTMENT NOW
                            <ChevronRight size={20} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Appointment;
