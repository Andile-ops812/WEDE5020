/* ================================================================
   FILE: validation.js
   PURPOSE: Client-side validation for the Enquiry form
   (enquires.html). Runs only when the Submit button is clicked.
   AUTHOR: Andile Ndlovu
   STUDENT NUMBER: ST10452270
   MODULE: WEDE5020
   ================================================================ */

// Wait until the HTML has fully loaded before attaching any logic
document.addEventListener("DOMContentLoaded", function () {

  // Grab the enquiry form element by its ID
  const enquiryForm = document.getElementById("enquiryForm");

  // Only run this code if the enquiry form actually exists on the page
  // (so this same file could later be reused on other pages safely)
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", handleEnquirySubmit);
  }

  // ----------------------------------------------------------------
  // Handles the Submit click for the Enquiry form
  // ----------------------------------------------------------------
  function handleEnquirySubmit(event) {
    event.preventDefault(); // stop the page from reloading

    // Grab each field we need to validate
    const nameField = document.getElementById("enquiryName");
    const emailField = document.getElementById("enquiryEmail");
    const subjectField = document.getElementById("enquirySubject");
    const messageField = document.getElementById("enquiryMessage");

    // Clear any old error messages before re-checking
    clearError("enquiryNameError");
    clearError("enquiryEmailError");
    clearError("enquirySubjectError");
    clearError("enquiryMessageError");

    // Track whether the whole form is valid
    let isValid = true;

    // --- Name check: must not be empty ---
    if (nameField.value.trim() === "") {
      showError("enquiryNameError", "Please enter your full name.");
      isValid = false;
    }

    // --- Email check: must not be empty AND must match a basic email pattern ---
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value.trim() === "") {
      showError("enquiryEmailError", "Please enter your email address.");
      isValid = false;
    } else if (!emailPattern.test(emailField.value.trim())) {
      showError("enquiryEmailError", "Please enter a valid email address.");
      isValid = false;
    }

    // --- Subject dropdown check: must have a real option selected ---
    if (subjectField.value === "") {
      showError("enquirySubjectError", "Please select what you are enquiring about.");
      isValid = false;
    }

    // --- Message check: must not be empty ---
    if (messageField.value.trim() === "") {
      showError("enquiryMessageError", "Please enter a message.");
      isValid = false;
    }

    // If every check passed, show the success response
    if (isValid) {
      showSuccessResponse();
    }
  }

  // ----------------------------------------------------------------
  // Displays an error message under a specific field
  // ----------------------------------------------------------------
  function showError(spanId, message) {
    const span = document.getElementById(spanId);
    if (span) {
      span.textContent = message;
    }
  }

  // ----------------------------------------------------------------
  // Clears a previously shown error message
  // ----------------------------------------------------------------
  function clearError(spanId) {
    const span = document.getElementById(spanId);
    if (span) {
      span.textContent = "";
    }
  }

  // ----------------------------------------------------------------
  // Shows a generic thank-you message and hides the form
  // ----------------------------------------------------------------
  function showSuccessResponse() {
    const responseDiv = document.getElementById("enquiryResponse");
    const form = document.getElementById("enquiryForm");

    responseDiv.textContent = "Thank you for your enquiry! A member of our team will be in touch with you shortly.";
    responseDiv.style.display = "block";

    form.style.display = "none";
  }

});
