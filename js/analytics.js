/* GA4 (direct gtag.js) + Klaro consent + Consent Mode v2
 * Property: G-NQZ08PD0MJ (Modular Compliance — verified own property; no GTM container).
 * Order matters: Consent Mode v2 defaults are pushed to the dataLayer BEFORE the
 * gtag.js script is injected, so GA4 starts in the denied state (cookieless pings only).
 * Klaro grants analytics_storage ONLY on accept; advertising signals stay denied always.
 * Vendor files: /js/klaro-no-css.js + /js/klaro.min.css (Klaro v0.7.21).
 */
(function () {
  var GA4_ID = "G-NQZ08PD0MJ";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Consent Mode v2 — default DENIED for all measurement/advertising signals.
  // This MUST run before the gtag.js script loads (it does: this file is a
  // synchronous script in <head>, the loader below appends an async script).
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  gtag("js", new Date());
  gtag("config", GA4_ID, { anonymize_ip: true });

  // Load gtag.js (async) — consent defaults above are already in the dataLayer.
  (function (d, s) {
    var j = d.createElement(s),
        f = d.getElementsByTagName(s)[0];
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    f.parentNode.insertBefore(j, f);
  })(document, "script");

  window.klaroConfig = {
    version: 1,
    elementID: "klaro",
    storageMethod: "cookie",
    cookieName: "klaro",
    cookieExpiresAfterDays: 365,
    default: false,
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    htmlTexts: true,
    services: [
      {
        name: "google-analytics",
        title: "Google Analytics",
        description:
          "Usage analytics — helps us understand how visitors use this site.",
        purposes: ["analytics"],
        cookies: [/^_ga/, /^_gid/, /^_gat/],
        // Accept: grant analytics_storage ONLY. Advertising signals remain denied —
        // privacy policy §11: no advertising/tracking cookies for marketing.
        onAccept:
          "gtag('consent','update',{analytics_storage:'granted'});",
        // Decline: revoke analytics AND all advertising signals.
        onDecline:
          "gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});"
      }
    ],
    translations: {
      en: {
        consentNotice: {
          title: "Privacy preferences",
          description:
            "We use cookies to understand how visitors use our site. Choose your preferences below."
        },
        consentModal: {
          title: "Privacy preferences",
          description:
            "We use cookies for analytics. You can change these preferences at any time."
        },
        purposes: { analytics: "Analytics" }
      }
    }
  };

  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-cf-event]") : null;
    if (!el) return;
    var name = el.getAttribute("data-cf-event");
    if (!name) return;
    var params = {};
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      if (a.name.indexOf("data-cf-") === 0 && a.name !== "data-cf-event") {
        params[a.name.substring(8).replace(/-/g, "_")] = a.value;
      }
    }
    if (el.tagName === "A" && el.href) params.link_url = el.href;
    var txt = (el.textContent || "").trim();
    if (txt) params.link_text = txt.slice(0, 80);
    try { window.gtag && window.gtag("event", name, params); } catch (_) {}
  });
})();
