/* Modular Compliance — main.js */

// ── Nav scroll behaviour ──────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
}

// ── Mobile nav toggle ─────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
    });
    // close on outside click
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ── Highlight active nav link ──────────────────────────────
(function markActiveLink() {
    const path = window.location.pathname.replace(/\/index\.html$/, '/');
    document.querySelectorAll('.nav-link').forEach(a => {
        const href = a.getAttribute('href');
        if (href && path.endsWith(href.replace(/^\//, ''))) {
            a.classList.add('active');
        }
    });
})();

// ── Scroll-triggered animations ───────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ── Staggered grid children ───────────────────────────────
document.querySelectorAll('.stagger-children').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
        child.classList.add('animate-in');
        child.style.transitionDelay = `${i * 80}ms`;
        observer.observe(child);
    });
});

// ── Smooth scroll for anchor links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Pricing toggle (monthly / annual) ────────────────────
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const annual = pricingToggle.checked;
        document.querySelectorAll('[data-monthly]').forEach(el => {
            const monthly = parseInt(el.dataset.monthly, 10);
            const annualPrice = Math.round(monthly * 0.8);
            el.textContent = annual ? annualPrice : monthly;
        });
        const labels = document.querySelectorAll('.billing-label');
        labels.forEach(l => {
            l.textContent = annual ? '/mo billed annually' : '/month';
        });
        const badge = document.getElementById('annualSaving');
        if (badge) badge.style.display = annual ? 'inline-flex' : 'none';
    });
}
