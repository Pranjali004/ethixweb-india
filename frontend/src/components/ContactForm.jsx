import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { submitLead } from '../services/api';

export default function ContactForm({ defaultService = 'web_dev' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService,
    budget: '₹5L - ₹10L',
    timeline: '1-2 months',
    message: '',
    dpdpConsent: true,
    website_catch_bot: '', // Honeypot field
  });

  const [formRenderedAt, setFormRenderedAt] = useState(Date.now());
  const [status, setStatus] = useState({ state: 'idle', message: '', leadId: null });
  const [isWarmingUp, setIsWarmingUp] = useState(false);

  useEffect(() => {
    setFormRenderedAt(Date.now());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '', leadId: null });
    setIsWarmingUp(false);

    // Warm-up timeout indicator for Render free tier
    const warmUpTimer = setTimeout(() => {
      setIsWarmingUp(true);
    }, 2800);

    try {
      const payload = {
        ...formData,
        _form_rendered_at: formRenderedAt.toString(),
      };

      const result = await submitLead(payload);
      clearTimeout(warmUpTimer);
      setIsWarmingUp(false);

      setStatus({
        state: 'success',
        message: result.message || 'Thank you! Your project inquiry has been recorded.',
        leadId: result.data?.id,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'web_dev',
        budget: '₹5L - ₹10L',
        timeline: '1-2 months',
        message: '',
        dpdpConsent: true,
        website_catch_bot: '',
      });
    } catch (error) {
      clearTimeout(warmUpTimer);
      setIsWarmingUp(false);
      setStatus({
        state: 'error',
        message: error.message || 'Something went wrong. Please check your details and retry.',
        leadId: null,
      });
    }
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  return (
    <div className="bg-ethix-dark border border-ethix-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-ethix-card relative overflow-hidden">
      {/* Subtle top red line indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ethix-red via-rose-500 to-amber-500" />

      {status.state === 'success' ? (
        <div className="py-12 text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Our India delivery lead will review your project brief and connect with you within 24 hours.
            </p>
          </div>

          <div className="p-4 bg-ethix-card rounded-xl border border-ethix-border max-w-sm mx-auto text-xs text-slate-400">
            Lead Reference: <span className="font-mono text-white font-semibold">{status.leadId || 'CONFIRMED'}</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Namaste! I just submitted an inquiry on ethixweb.com (Ref: ${status.leadId || 'NEW'}). Can we connect?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Follow up on WhatsApp Instantly
            </a>
            <button
              onClick={() => setStatus({ state: 'idle', message: '', leadId: null })}
              className="px-4 py-2 text-xs text-slate-300 hover:text-white underline underline-offset-4"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-ethix-red/10 border border-ethix-red/30 text-ethix-red">
              <Sparkles className="w-3 h-3" />
              Start Your India Project Sprint
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tell Us About Your Business
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Receive an architectural review and sprint roadmap tailored for Indian market velocity.
            </p>
          </div>

          {/* Error Banner */}
          {status.state === 'error' && (
            <div className="p-3.5 rounded-lg bg-rose-950/70 border border-rose-500/50 flex items-start gap-2.5 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Render Cold-Start Notification */}
          {isWarmingUp && (
            <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-500/40 flex items-center gap-2 text-xs text-amber-200 animate-pulse">
              <Loader2 className="w-4 h-4 shrink-0 animate-spin text-amber-400" />
              <span>
                Waking up cloud server on Render (free tier cold start can take ~30s)... Thank you for your patience!
              </span>
            </div>
          )}

          {/* Honeypot Input: Hidden from legitimate users */}
          <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <label htmlFor="website_catch_bot">Leave this field blank</label>
            <input
              type="text"
              id="website_catch_bot"
              name="website_catch_bot"
              value={formData.website_catch_bot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-ethix-red">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Vikramaditya Singhania"
                className="w-full px-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email <span className="text-ethix-red">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="vikram@enterprise.in"
                className="w-full px-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red transition-all"
              />
            </div>

            {/* Indian Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Indian Mobile (+91) <span className="text-ethix-red">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red transition-all"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Required for WhatsApp sprint updates & verification.
              </span>
            </div>

            {/* Company / Brand Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Company / Brand Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Bharat Ayurveda D2C"
                className="w-full px-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Service */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Need
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red"
              >
                <option value="web_dev">Next-Gen Web / App</option>
                <option value="ecommerce_upi">D2C & UPI / Razorpay</option>
                <option value="whatsapp_ai">WhatsApp API & AI Copilot</option>
                <option value="performance_ads">Performance Ads & ROAS</option>
                <option value="technical_seo">Bharat Technical SEO</option>
                <option value="full_stack_ops">Dedicated Digital Ops</option>
                <option value="other">Other Digital Initiative</option>
              </select>
            </div>

            {/* Budget in INR */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Expected Budget (₹)
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red"
              >
                <option value="₹2L - ₹5L">₹2 Lakh - ₹5 Lakh</option>
                <option value="₹5L - ₹10L">₹5 Lakh - ₹10 Lakh</option>
                <option value="₹10L - ₹25L">₹10 Lakh - ₹25 Lakh</option>
                <option value="₹25L+">₹25 Lakh+ (Enterprise)</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Launch
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red"
              >
                <option value="< 1 month">&lt; 1 Month (Fast Sprint)</option>
                <option value="1-2 months">1 - 2 Months</option>
                <option value="3+ months">3+ Months (Phase-wise)</option>
              </select>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Brief & Requirements <span className="text-ethix-red">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you are building, your current digital bottlenecks, conversion goals, or tech stack requirements..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red transition-all"
            />
          </div>

          {/* DPDP Act 2023 Compliance Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="dpdpConsent"
              name="dpdpConsent"
              checked={formData.dpdpConsent}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 rounded border-ethix-border bg-ethix-card text-ethix-red focus:ring-ethix-red"
            />
            <label htmlFor="dpdpConsent" className="text-xs text-slate-400 leading-snug">
              I consent to Ethixweb processing my business contact details in accordance with India's{' '}
              <span className="text-slate-200 font-medium">
                Digital Personal Data Protection Act (DPDP Act, 2023)
              </span>{' '}
              for consulting and project communication. Zero spam, ever.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.state === 'loading'}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-ethix-red hover:bg-ethix-red-hover active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-lg shadow-ethix-red/25 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status.state === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting to India Engineering Team...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Inquiry & Request Sprint Discovery</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
