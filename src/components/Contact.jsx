import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional().refine(val => !val || val.length >= 10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (serviceId && templateId && publicKey) {
        const emailjs = await import('emailjs-com');
        await emailjs.default.send(serviceId, templateId, {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'Not provided',
          subject: data.subject,
          message: data.message,
        }, publicKey);
      }
      
      toast.success("Message sent! We'll contact you within 24 hours. 🏗️");
      reset();
    } catch (err) {
      toast.error('Failed to send. Please call us directly.');
    }
  };

  const inputClass = (error) => `
    w-full bg-steel-700/50 dark:bg-steel-800/50 border rounded-xl px-4 py-3
    text-white placeholder-concrete/30 text-sm transition-all
    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
    ${error ? 'border-red-500/50' : 'border-steel-600/30 hover:border-steel-500/50'}
  `;

  return (
    <section id="contact" className="section-padding bg-steel-900">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mt-2">
            Start Your <span className="text-gradient">Project Today</span>
          </h2>
          <p className="text-concrete/60 mt-4 max-w-2xl mx-auto">
            Ready to build something extraordinary? Let's discuss your vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: '📍', title: 'Office Address', info: 'SP Construction Pvt Ltd\nNear Panjim Circle, Panaji, Goa - 403001' },
              { icon: '📞', title: 'Phone Numbers', info: '+91 98765 43210\n+91 98765 43211 (Emergency)' },
              { icon: '✉️', title: 'Email', info: 'info@spconstruction.in\nprojects@spconstruction.in' },
              { icon: '⏰', title: 'Working Hours', info: 'Monday - Saturday: 9AM - 6PM\nSunday: By Appointment' },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="flex gap-4 p-4 bg-steel-800/50 rounded-xl border border-steel-700/30 hover:border-orange-500/30 transition-all group"
                whileHover={{ x: 4 }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-concrete/60 text-sm whitespace-pre-line">{item.info}</p>
                </div>
              </motion.div>
            ))}

            <div className="rounded-xl overflow-hidden h-48 bg-steel-800 border border-steel-700/30 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.6784!2d73.8278!3d15.4909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba10abcdef00%3A0x123456789abcdef!2sPanaji%2C%20Goa!5e0!3m2!1sen!2sin!4v1000000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SP Construction Location"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('name')}
                    placeholder="Your Name *"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address *"
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone Number"
                    className={inputClass(errors.phone)}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <input
                    {...register('subject')}
                    placeholder="Subject *"
                    className={inputClass(errors.subject)}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>
              </div>

              <div>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Describe your project... *"
                  className={inputClass(errors.message)}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? '⏳ Sending...' : '🚀 Send Message'}
              </motion.button>

              <p className="text-concrete/40 text-xs text-center">
                We'll respond within 24 business hours. No spam, promise! 🤝
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
