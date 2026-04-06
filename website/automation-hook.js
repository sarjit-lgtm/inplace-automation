/**
 * Inplace Studio — Automation Engine Hook
 *
 * Add this script AFTER your existing form code on the page.
 * It intercepts the form submission and sends all data to the automation engine.
 *
 * Usage: <script src="automation-hook.js"></script>
 *   OR paste the contents inside a <script> tag after your form code.
 */

(function () {
  const AUTOMATION_URL = "https://inplace-automation-engine.vercel.app/api/webhooks/new-lead";

  // Map timeline values from form to automation engine format
  const TIMELINE_MAP = {
    now: "ASAP",
    "3mo": "1-3 Months",
    "6mo": "3-6 Months",
    flex: "Flexible",
  };

  // Map style values to readable names
  const STYLE_MAP = {
    modern: "Modern",
    transitional: "Transitional",
    traditional: "Traditional",
    european: "Contemporary",
    coastal: "Other",
    other: "Other",
  };

  // Map nature values to kitchen type
  const NATURE_MAP = {
    remodel: "Renovation",
    "new-build": "New Build",
  };

  // Map source values from "How did you hear" to lead source
  const SOURCE_MAP = {
    "Interior Designer Referral": "Referral",
    "Word of Mouth": "Referral",
    "Google Search": "Google Ads",
    "Instagram / Social Media": "Meta (FB/IG)",
    Houzz: "Website Chat",
    "Architectural Digest / Press": "Website Chat",
    "Drove Past the Studio": "Walk-In",
    "Returning Client": "Referral",
  };

  // Helper: get selected card values from a group
  function getCardValues(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return [];
    const selected = group.querySelectorAll(".ips-card.sel");
    return Array.from(selected).map(function (card) {
      return card.getAttribute("data-v") || "";
    });
  }

  // Helper: get single card value
  function getCardValue(groupId) {
    var vals = getCardValues(groupId);
    return vals.length > 0 ? vals[0] : "";
  }

  // Helper: get input value by ID
  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  // Helper: convert budget string to range category
  function budgetToRange(budgetStr) {
    var num = parseInt(budgetStr.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) return "Not Disclosed";
    if (num >= 200000) return "$200K+";
    if (num >= 100000) return "$100K-$200K";
    if (num >= 50000) return "$50K-$100K";
    if (num >= 25000) return "$25K-$50K";
    return "Under $25K";
  }

  // Watch for the form submission
  // The existing form code calls ipsSub() or similar on the final step.
  // We hook into the success panel becoming visible.
  var sent = false;

  function sendToAutomation() {
    if (sent) return;
    sent = true;

    var firstName = getVal("ips-fname");
    var lastName = getVal("ips-lname");
    var email = getVal("ips-email");
    var phone = getVal("ips-phone");
    var budget = getVal("ips-budget");
    var sourceDropdown = getVal("ips-source");

    // Collect all form data
    var payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      source: SOURCE_MAP[sourceDropdown] || "Website Chat",
      budgetRange: budgetToRange(budget),
      timeline: TIMELINE_MAP[getCardValue("ips-s7-time")] || "",
      kitchenType: NATURE_MAP[getCardValue("ips-s1-nature")] || "",
      stylePref: STYLE_MAP[getCardValue("ips-s2-style")] || "",
      // UTM parameters from URL
      utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
      utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
      utmTerm: new URLSearchParams(window.location.search).get("utm_term") || "",
    };

    // Send to automation engine (fire and forget — don't block the form)
    fetch(AUTOMATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        console.log("[Inplace Automation] Lead sent successfully:", data);
      })
      .catch(function (err) {
        console.error("[Inplace Automation] Failed to send lead:", err);
      });
  }

  // METHOD 1: Hook into the existing ipsSub function if it exists
  var originalIpsSub = window.ipsSub;
  if (typeof originalIpsSub === "function") {
    window.ipsSub = function () {
      originalIpsSub.apply(this, arguments);
      // Small delay to let validation pass before we send
      setTimeout(sendToAutomation, 500);
    };
  }

  // METHOD 2: Watch for the success panel to appear (backup)
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1 && node.classList && node.classList.contains("ips-success")) {
          sendToAutomation();
        }
      });
    });
    // Also check if success panel became active
    var successPanel = document.querySelector(".ips-success");
    if (successPanel && successPanel.offsetParent !== null) {
      sendToAutomation();
    }
  });

  // Start observing the form body for changes
  var formBody = document.querySelector(".ips-body");
  if (formBody) {
    observer.observe(formBody, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
  }

  // METHOD 3: Intercept any submit button click on step 8
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".ips-next");
    if (!btn) return;
    // Check if we're on step 8 (the last step)
    var activePanel = document.querySelector(".ips-panel.active");
    if (activePanel && activePanel.getAttribute("data-s") === "8") {
      // The user clicked "Submit" on the final step
      // Wait for validation to pass and success to show
      setTimeout(function () {
        var success = document.querySelector(".ips-success");
        if (success && (success.style.display !== "none" || success.classList.contains("active"))) {
          sendToAutomation();
        }
      }, 1000);
    }
  });

  console.log("[Inplace Automation] Hook loaded — ready to capture form submissions");
})();
