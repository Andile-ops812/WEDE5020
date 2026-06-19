/* ================================================================
   FILE: js_assets/main.js
   DESCRIPTION: Site-wide JavaScript for Mercedes-Benz — Part 3.
   Handles:
     1. Mobile navigation hamburger toggle         — ALL pages
     2. Scroll-triggered entrance animations       — ALL pages
     3. Products page accordion                    — products.html
     4. Products page search / filter              — products.html
     5. Enquiry form validation + dynamic response — enquires.html
     6. Contact form validation + mailto compile   — contact.html
   AUTHOR: Andile Ndlovu
   STUDENT NUMBER: ST10452270
   MODULE: WEDE5020
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ----------------------------------------------------------
     1. HAMBURGER MENU TOGGLE (all pages)
     The .nav-toggle button is hidden on desktop via CSS.
     On mobile it appears and toggles the "open" class on the
     .navigation list, which shows or hides it.
     aria-expanded keeps screen readers informed of the state.
     ---------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navList   = document.querySelector(".navigation");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close the menu automatically when any nav link is tapped */
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     2. SCROLL-TRIGGERED ENTRANCE ANIMATIONS (all pages)
     Any element with class "animate-on-scroll" starts invisible
     and shifted down. IntersectionObserver adds "visible" when
     the element enters the viewport, triggering the CSS
     transition defined in mystyles.css.
     Falls back gracefully on older browsers.
     ---------------------------------------------------------- */
  var animatedEls = document.querySelectorAll(".animate-on-scroll");

  if (animatedEls.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); /* animate once only */
          }
        });
      }, { threshold: 0.12 });

      animatedEls.forEach(function (el) { observer.observe(el); });
    } else {
      /* Fallback: show everything immediately */
      animatedEls.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ----------------------------------------------------------
     3. PRODUCTS PAGE ACCORDION (products.html only)
     Each .accordion-trigger button controls a matching
     .accordion-panel. Clicking toggles the panel open or closed.
     aria-expanded and the hidden attribute are both updated so
     the change is accessible to screen readers.
     Multiple panels can be open at the same time.
     ---------------------------------------------------------- */
  var accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var isOpen  = trigger.getAttribute("aria-expanded") === "true";
      var panelId = trigger.getAttribute("aria-controls");
      var panel   = document.getElementById(panelId);

      trigger.setAttribute("aria-expanded", String(!isOpen));
      if (panel) { panel.hidden = isOpen; }
    });
  });

  /* ----------------------------------------------------------
     4. PRODUCTS PAGE SEARCH / FILTER (products.html only)
     Typing in the #productSearch input filters the accordion
     items in real time, matching text against both the visible
     card content and the hidden data-keywords attribute on each
     .accordion-item (so synonyms like "electric" or "suv" work).
     Matching panels open automatically to reveal the content.
     A live result count is written to #searchCount.
     ---------------------------------------------------------- */
  var productSearch = document.getElementById("productSearch");
  var searchCount   = document.getElementById("searchCount");

  if (productSearch) {
    var accordionItems = document.querySelectorAll(".accordion-item");

    productSearch.addEventListener("input", function () {
      var query = productSearch.value.trim().toLowerCase();
      var hits  = 0;

      accordionItems.forEach(function (item) {
        var keywords = (item.dataset.keywords || "").toLowerCase();
        var text     = item.textContent.toLowerCase();
        var match    = query === "" || text.includes(query) || keywords.includes(query);

        item.style.display = match ? "" : "none";

        /* Auto-open matching panels so the user sees why it matched */
        if (match && query !== "") {
          var t = item.querySelector(".accordion-trigger");
          var p = t ? document.getElementById(t.getAttribute("aria-controls")) : null;
          if (t && p) { t.setAttribute("aria-expanded", "true"); p.hidden = false; }
        }

        if (match) hits++;
      });

      if (searchCount) {
        if (query === "") {
          searchCount.textContent = "";
        } else if (hits === 0) {
          searchCount.textContent = "No models match \u201c" + query + "\u201d.";
        } else {
          searchCount.textContent = hits + " model" + (hits === 1 ? "" : "s") + " found.";
        }
      }
    });
  }

}); /* end DOMContentLoaded */


/* ================================================================
   GLOBAL FORM FUNCTIONS
   Declared in the global scope (outside DOMContentLoaded) so they
   can be called from onsubmit attributes in the HTML.
   ================================================================ */

/* ----------------------------------------------------------
   5. ENQUIRY FORM VALIDATION  (enquires.html)
   Validates all four fields. On success, hides the form and
   shows a dynamic response that includes estimated pricing and
   availability based on the selected tier and enquiry type.
   This satisfies the Part 3 brief requirement: "display a
   response showing estimated price or availability".
   ---------------------------------------------------------- */
function handleEnquirySubmit(event) {
  event.preventDefault();

  var nameField    = document.getElementById("enquiryName");
  var emailField   = document.getElementById("enquiryEmail");
  var subjectField = document.getElementById("enquirySubject");
  var messageField = document.getElementById("enquiryMessage");

  /* Clear previous error messages */
  clearError("enquiryNameError");
  clearError("enquiryEmailError");
  clearError("enquirySubjectError");
  clearError("enquiryMessageError");

  var isValid = true;

  /* --- Name: must not be blank --- */
  if (!nameField.value.trim()) {
    showError("enquiryNameError", "Please enter your full name.");
    nameField.classList.add("input-error");
    isValid = false;
  } else {
    nameField.classList.remove("input-error");
  }

  /* --- Email: must not be blank AND must pass basic format check --- */
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailField.value.trim()) {
    showError("enquiryEmailError", "Please enter your email address.");
    emailField.classList.add("input-error");
    isValid = false;
  } else if (!emailPattern.test(emailField.value.trim())) {
    showError("enquiryEmailError", "Please enter a valid email address (e.g. name@example.com).");
    emailField.classList.add("input-error");
    isValid = false;
  } else {
    emailField.classList.remove("input-error");
  }

  /* --- Subject dropdown: a real option must be selected --- */
  if (!subjectField.value) {
    showError("enquirySubjectError", "Please select what you are enquiring about.");
    subjectField.classList.add("input-error");
    isValid = false;
  } else {
    subjectField.classList.remove("input-error");
  }

  /* --- Message: must not be blank --- */
  if (!messageField.value.trim()) {
    showError("enquiryMessageError", "Please enter your message.");
    messageField.classList.add("input-error");
    isValid = false;
  } else {
    messageField.classList.remove("input-error");
  }

  if (!isValid) return false;

  /* --- Build dynamic price + availability response --- */
  var priceInfo = {
    "mercedes-benz": {
      label:        "Mercedes-Benz (C-Class, E-Class, GLE)",
      price:        "from R\u202f680\u202f000",
      availability: "In stock at both our Sandton and Polokwane branches."
    },
    "amg": {
      label:        "AMG (C63, G63, GT)",
      price:        "from R\u202f830\u202f000 (C63) to R\u202f5\u202f100\u202f000 (G63)",
      availability: "C63 available now; G63 has limited units \u2014 early booking recommended."
    },
    "maybach": {
      label:        "Maybach (S580, GLS 600)",
      price:        "from R\u202f3\u202f200\u202f000",
      availability: "Available on special order. Estimated lead time: 8\u201312 weeks."
    },
    "test-drive": {
      label:        "Test Drive Booking",
      price:        "No cost \u2014 test drives are complimentary.",
      availability: "Available Monday\u2013Friday 08:00\u201317:00 and Saturday 08:00\u201314:00 at both branches."
    },
    "financing": {
      label:        "Financing Options",
      price:        "Competitive rates from 9.25% p.a.",
      availability: "Pre-approval usually confirmed within 24 hours. Bring a valid ID and 3 months\u2019 bank statements."
    },
    "other": {
      label:        "General Enquiry",
      price:        "N/A",
      availability: "Our team will respond within one business day."
    }
  };

  var selected = priceInfo[subjectField.value] || priceInfo["other"];
  var firstName = nameField.value.trim().split(" ")[0];

  var html =
    "<h3>\u2713 Enquiry Received!</h3>" +
    "<p>Thank you, <strong>" + escapeHtml(firstName) + "</strong>. " +
    "We have received your enquiry about <strong>" + escapeHtml(selected.label) + "</strong>.</p>" +
    "<table class='response-table'>" +
    "<tr><th>Estimated Price</th><td>" + escapeHtml(selected.price) + "</td></tr>" +
    "<tr><th>Availability</th><td>" + escapeHtml(selected.availability) + "</td></tr>" +
    "<tr><th>Next Step</th><td>A consultant will contact you at <strong>" +
    escapeHtml(emailField.value.trim()) + "</strong> within 24 hours.</td></tr>" +
    "</table>";

  var responseDiv = document.getElementById("enquiryResponse");
  var form        = document.getElementById("enquiryForm");

  responseDiv.innerHTML = html;
  responseDiv.style.display = "block";
  form.style.display = "none";

  responseDiv.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}


/* ----------------------------------------------------------
   6. CONTACT FORM VALIDATION  (contact.html)
   Validates Name, Email, Message Type, and Message.
   On success, compiles all fields into a pre-filled mailto:
   link so the visitor's mail client sends the message to
   Mercedes-Benz. This satisfies the Part 3 brief requirement
   to "compile the information into an email format".
   ---------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();

  var nameField        = document.getElementById("contactName");
  var emailField       = document.getElementById("contactEmail");
  var messageTypeField = document.getElementById("contactMessageType");
  var messageField     = document.getElementById("contactMessage");

  /* Clear previous errors */
  clearError("contactNameError");
  clearError("contactEmailError");
  clearError("contactMessageTypeError");
  clearError("contactMessageError");

  var isValid = true;

  /* --- Name --- */
  if (!nameField.value.trim()) {
    showError("contactNameError", "Please enter your name.");
    nameField.classList.add("input-error");
    isValid = false;
  } else {
    nameField.classList.remove("input-error");
  }

  /* --- Email --- */
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailField.value.trim()) {
    showError("contactEmailError", "Please enter your email address.");
    emailField.classList.add("input-error");
    isValid = false;
  } else if (!emailPattern.test(emailField.value.trim())) {
    showError("contactEmailError", "Please enter a valid email address.");
    emailField.classList.add("input-error");
    isValid = false;
  } else {
    emailField.classList.remove("input-error");
  }

  /* --- Message Type --- */
  if (!messageTypeField.value) {
    showError("contactMessageTypeError", "Please select a message type.");
    messageTypeField.classList.add("input-error");
    isValid = false;
  } else {
    messageTypeField.classList.remove("input-error");
  }

  /* --- Message --- */
  if (!messageField.value.trim()) {
    showError("contactMessageError", "Please enter your message.");
    messageField.classList.add("input-error");
    isValid = false;
  } else {
    messageField.classList.remove("input-error");
  }

  if (!isValid) return false;

  /* --- Compile into a mailto: link --- */
  var subject = messageTypeField.value + " from " + nameField.value.trim();
  var body =
    "Name: "         + nameField.value.trim()        + "\n" +
    "Email: "        + emailField.value.trim()        + "\n" +
    "Message Type: " + messageTypeField.value         + "\n\n" +
    "Message:\n"     + messageField.value.trim();

  window.location.href =
    "mailto:netmaster@infovan.co.za" +
    "?subject=" + encodeURIComponent(subject) +
    "&body="    + encodeURIComponent(body);

  /* Show confirmation card and hide the form */
  var responseDiv = document.getElementById("contactResponse");
  var form        = document.getElementById("contactForm");

  if (responseDiv) {
    responseDiv.innerHTML =
      "<h3>\u2713 Message Sent!</h3>" +
      "<p>Thank you, <strong>" + escapeHtml(nameField.value.trim()) + "</strong>. " +
      "Your <strong>" + escapeHtml(messageTypeField.value) + "</strong> has been compiled " +
      "and sent to our team. We will reply to <strong>" +
      escapeHtml(emailField.value.trim()) + "</strong> within 24 hours.</p>";
    responseDiv.style.display = "block";
    responseDiv.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (form) form.style.display = "none";
  return false;
}


/* ================================================================
   SHARED UTILITY FUNCTIONS
   ================================================================ */

/** Writes an error message into the span with the given id. */
function showError(spanId, message) {
  var span = document.getElementById(spanId);
  if (span) span.textContent = message;
}

/** Clears any error message from the span with the given id. */
function clearError(spanId) {
  var span = document.getElementById(spanId);
  if (span) span.textContent = "";
}

/**
 * Escapes HTML special characters before inserting user input
 * into the page via innerHTML, preventing XSS injection.
 */
function escapeHtml(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
