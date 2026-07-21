import { useState, useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { Send, Mail, MapPin } from 'lucide-react';
import { StaggeredText } from './AnimationShowcase';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll('.aj-reveal');
    reveals.forEach((r) => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            ease: 'outExpo',
            delay: stagger(70),
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    }, 1800);
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'var(--bg-card)',
    border: `1px solid ${errors[field] ? '#ef4444' : 'var(--line)'}`,
    borderRadius: 'var(--r-sm)',
    padding: '0.85rem 1.1rem',
    fontSize: '0.9rem',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s',
  });

  return (
    <section id="contact" ref={sectionRef} className="aj-section aj-section--panel">
      <div className="aj-container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '4rem' }}>
          <div className="aj-label aj-reveal">✦ Contact</div>
          <h2 className="aj-heading aj-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <StaggeredText text="Let's build" />
            <span className="aj-heading--accent">
              <StaggeredText text="something." />
            </span>
          </h2>
          <p className="aj-reveal" style={{ fontSize: '1.05rem' }}>
            Have a project idea, research opportunity, or just want to connect?
            I'm always open to interesting conversations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left: form */}
          <form onSubmit={handleSubmit} className="aj-reveal" noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle('name')}
                />
                {errors.name && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.name}</p>}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle('email')}
                />
                {errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.email}</p>}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                style={inputStyle('subject')}
              />
              {errors.subject && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.subject}</p>}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <textarea
                name="message"
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                style={{ ...inputStyle('message'), resize: 'vertical', fontFamily: 'var(--font-sans)' }}
              />
              {errors.message && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="aj-btn aj-btn--primary"
              style={{ width: '100%', position: 'relative' }}
              disabled={submitting}
            >
              {submitting ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                  <Send size={16} />
                  Send Message
                </span>
              )}
            </button>

            {status === 'success' && (
              <div style={{
                marginTop: '1rem',
                padding: '0.85rem 1.1rem',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 'var(--r-sm)',
                color: '#22c55e',
                fontSize: '0.88rem',
                fontWeight: '600',
              }}>
                ✓ Message sent successfully!
              </div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>

          {/* Right: info + links */}
          <div className="aj-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Contact info */}
            {[
              { Icon: Mail, label: 'Email', value: 'sushantguri@example.com' },
              { Icon: MapPin, label: 'Location', value: 'India — Open to Remote' },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text)' }}>{value}</div>
                </div>
              </div>
            ))}

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--line)' }} />

            {/* Social links */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1rem' }}>Follow</div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { Icon: GithubIcon, href: 'https://github.com/', label: 'GitHub' },
                  { Icon: LinkedinIcon, href: 'https://linkedin.com/', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1rem',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-sm)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      color: 'var(--text-2)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-2)'; }}
                  >
                    <Icon />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div style={{
              padding: '1.25rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-md)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text)' }}>Available for opportunities</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', margin: 0 }}>
                Open to internships, research collaborations, and interesting projects.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #contact .aj-container > div:last-of-type {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
