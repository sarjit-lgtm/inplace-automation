/**
 * Inplace Studio — Automation Engine Hook (v2)
 * Hooks into submitToGHL() and goSuccess() to capture form submissions.
 */
(function () {
  var AUTOMATION_URL = "https://inplace-automation-engine.vercel.app/api/webhooks/new-lead";
  var TIMELINE_MAP = { now: "ASAP", "3mo": "1-3 Months", "6mo": "3-6 Months", flex: "Flexible" };
  var STYLE_MAP = { modern: "Modern", transitional: "Transitional", traditional: "Traditional", european: "Contemporary", coastal: "Other", other: "Other" };
  var NATURE_MAP = { remodel: "Renovation", "new-build": "New Build" };
  var SOURCE_MAP = { "Interior Designer Referral": "Referral", "Word of Mouth": "Referral", "Google Search": "Google Ads", "Instagram / Social Media": "Meta (FB/IG)", Houzz: "Website Chat", "Architectural Digest / Press": "Website Chat", "Drove Past the Studio": "Walk-In", "Returning Client": "Referral" };

  function getCardValue(groupId) {
    var group = document.getElementById(groupId);
    if (!group) return "";
    var sel = group.querySelector(".ips-card.sel");
    return sel ? (sel.getAttribute("data-v") || "") : "";
  }
  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }
  function budgetToRange(s) {
    var n = parseInt(s.replace(/[^0-9]/g, ""), 10);
    if (isNaN(n)) return "Not Disclosed";
    if (n >= 200000) return "$200K+";
    if (n >= 100000) return "$100K-$200K";
    if (n >= 50000) return "$50K-$100K";
    if (n >= 25000) return "$25K-$50K";
    return "Under $25K";
  }

  var sent = false;
  function sendToAutomation() {
    if (sent) return;
    var firstName = getVal("ips-fname");
    var phone = getVal("ips-phone");
    if (!firstName || !phone) return; // form not filled yet
    sent = true;

    var payload = {
      firstName: firstName,
      lastName: getVal("ips-lname"),
      email: getVal("ips-email"),
      phone: phone,
      source: SOURCE_MAP[getVal("ips-source")] || "Website Chat",
      budgetRange: budgetToRange(getVal("ips-budget")),
      timeline: TIMELINE_MAP[getCardValue("ips-s7-time")] || "",
      kitchenType: NATURE_MAP[getCardValue("ips-s1-nature")] || "",
      stylePref: STYLE_MAP[getCardValue("ips-s2-style")] || "",
      preferredContact: getCardValue("ips-s8-contact") || "",
      utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
      utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
      utmTerm: new URLSearchParams(window.location.search).get("utm_term") || ""
    };

    console.log("[Inplace Automation] Sending lead:", payload);
    fetch(AUTOMATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(function (r) { return r.json(); })
    .then(function (d) { console.log("[Inplace Automation] Success:", d); })
    .catch(function (e) { console.error("[Inplace Automation] Error:", e); });
  }

  // METHOD 1: Hook into submitToGHL (the actual submit function)
  var checkSubmit = setInterval(function () {
    if (typeof window.submitToGHL === "function" && !window._ipsHooked) {
      window._ipsHooked = true;
      var original = window.submitToGHL;
      window.submitToGHL = function () {
        var result = original.apply(this, arguments);
        setTimeout(sendToAutomation, 1000);
        return result;
      };
      console.log("[Inplace Automation] Hooked into submitToGHL");
      clearInterval(checkSubmit);
    }
  }, 500);
  setTimeout(function () { clearInterval(checkSubmit); }, 15000);

  // METHOD 2: Hook into goSuccess (the success screen function)
  var checkSuccess = setInterval(function () {
    if (typeof window.goSuccess === "function" && !window._ipsHooked2) {
      window._ipsHooked2 = true;
      var original2 = window.goSuccess;
      window.goSuccess = function () {
        var result = original2.apply(this, arguments);
        setTimeout(sendToAutomation, 500);
        return result;
      };
      console.log("[Inplace Automation] Hooked into goSuccess");
      clearInterval(checkSuccess);
    }
  }, 500);
  setTimeout(function () { clearInterval(checkSuccess); }, 15000);

  // METHOD 3: Watch for success panel to become active (backup)
  var observer = new MutationObserver(function () {
    var panel = document.querySelector('.ips-panel[data-s="success"]');
    if (panel && panel.classList.contains("active")) {
      sendToAutomation();
    }
  });
  var body = document.querySelector(".ips-body");
  if (body) {
    observer.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  // METHOD 4: Listen for click on submit button on step 8
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("#ips-next, .ips-next");
    if (!btn) return;
    var panel = document.querySelector(".ips-panel.active");
    if (panel && panel.getAttribute("data-s") === "8") {
      setTimeout(sendToAutomation, 2000);
    }
  });

  console.log("[Inplace Automation] Hook v2 loaded");
})();
