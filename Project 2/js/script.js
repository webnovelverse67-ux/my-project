// =======================
// MOBILE MENU TOGGLE
// =======================
function toggleMenu() {
  const navMenu = document.getElementById('navMenu').querySelector('ul');
  navMenu.classList.toggle('active');
}

// =======================
// DASHBOARD CAROUSEL
// =======================
let slideIndex = 0;
const slides = document.querySelectorAll('.dashboard-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add('active');
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add('active');
  }
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

// Auto-advance carousel
function autoSlide() {
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  showSlide(slideIndex);
}

// Initialize carousel
if (slides.length > 0) {
  showSlide(1);
  setInterval(autoSlide, 5000); // Change slide every 5 seconds
}

// =======================
// VIDEO PLAY FUNCTIONALITY
// =======================
function playVideo() {
  const video = document.getElementById('mainVideo');
  const placeholder = document.getElementById('videoPlaceholder');

  if (video && placeholder) {
    placeholder.style.display = 'none';
    video.style.display = 'block';
    video.play();
  }
}

// =======================
// LOGIN FORM HANDLING
// =======================
document.addEventListener('DOMContentLoaded', function() {
  // --- Dynamic View Switching ---
  const btnEmailLogin = document.getElementById('btn-email-login');
  const btnBack = document.getElementById('btn-back');
  const viewInitial = document.getElementById('login-view-initial');
  const viewEmail = document.getElementById('login-view-email');

  if (btnEmailLogin && btnBack && viewInitial && viewEmail) {
    btnEmailLogin.addEventListener('click', function() {
      viewInitial.classList.add('hidden');
      viewEmail.classList.remove('hidden');
    });

    btnBack.addEventListener('click', function() {
      viewEmail.classList.add('hidden');
      viewInitial.classList.remove('hidden');
    });
  }

  // --- Password Toggle ---
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password-input');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
      // Toggle the type attribute
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Optional: Toggle icon style or icon itself if needed
      // For now, the SVG is generic eye, usually you'd swap to eye-off
    });
  }

  // --- Login Submission ---
  const emailForm = document.getElementById('email-login-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = document.getElementById('email-input');
      const passwordInput = document.getElementById('password-input');

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Validation
      if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      if (password.length <= 8) {
        alert('Password must be longer than 8 characters.');
        return;
      }

      // Credential Check
      if (email === 'group@gmail.com' && password === '123456789') {
        // alert('Login Successful');
        window.location.href = 'loginpricing.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }
});

// =======================
// DASHBOARD LOGIC
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const dashboardContainer = document.querySelector('.dashboard-container');
  if (dashboardContainer) {
    // 1. Sidebar Collapse
    const collapseBtn = document.querySelector('.collapse-sidebar-btn');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const main = document.querySelector('.dashboard-main') || document.querySelector('.wizard-main');

    if (collapseBtn && sidebar && main) {
      collapseBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('sidebar-collapsed');

        if (sidebar.classList.contains('collapsed')) {
          collapseBtn.innerHTML = '»';
        } else {
          collapseBtn.innerHTML = '«';
        }
      });
    }

    // 2. Accordion Logic
    const steps = document.querySelectorAll('.setup-step');

    steps.forEach(step => {
      const header = step.querySelector('.step-header');
      const toggleBtn = step.querySelector('.toggle-step-btn');

      const toggleFn = (e) => {
        // Close others (optional, typical accordion behavior)
        // steps.forEach(s => {
        //   if (s !== step) {
        //     s.classList.remove('expanded');
        //     s.querySelector('.step-content').classList.add('hidden');
        //     s.querySelector('.toggle-step-btn').innerHTML = '⌄';
        //   }
        // });

        // Toggle current
        const content = step.querySelector('.step-content');
        const isExpanded = step.classList.contains('expanded');

        if (isExpanded) {
          step.classList.remove('expanded');
          content.classList.add('hidden');
          if(toggleBtn) toggleBtn.innerHTML = '⌄';
        } else {
          step.classList.add('expanded');
          content.classList.remove('hidden');
          if(toggleBtn) toggleBtn.innerHTML = '^';
        }
      };

      if (header) header.addEventListener('click', toggleFn);
      // if (toggleBtn) toggleBtn.addEventListener('click', toggleFn); // Header click covers it
    });
  }
});

// =======================
// WIZARD LOGIC (Create Online Service)
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const wizardMain = document.querySelector('.wizard-main');
  if (wizardMain) {
    const btnNextToPrice = document.getElementById('btn-next-to-price');
    const btnBackToDetails = document.getElementById('btn-back-to-details');

    const step1Content = document.getElementById('step-1-content');
    const step2Content = document.getElementById('step-2-content');

    const navStep1 = document.getElementById('nav-step-1');
    const navStep2 = document.getElementById('nav-step-2');

    // Populate Time Selects
    const timeSelects = document.querySelectorAll('.time-select');
    timeSelects.forEach(select => {
        // Detect if hours or mins based on first option text
        if (select.options.length > 0) {
            const firstOpt = select.options[0].text;
            if (firstOpt.includes('hours')) {
                for(let i=1; i<=12; i++) {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.text = i + ' hour' + (i>1?'s':'');
                    select.appendChild(opt);
                }
            } else if (firstOpt.includes('mins')) {
                 [15, 30, 45].forEach(m => {
                    const opt = document.createElement('option');
                    opt.value = m;
                    opt.text = m + ' mins';
                    select.appendChild(opt);
                 });
            }
        }
    });

    // Navigation: Step 1 -> Step 2
    if (btnNextToPrice) {
      btnNextToPrice.addEventListener('click', function() {
        // Validate Step 1
        const serviceTitleInput = document.getElementById('service-title');
        const serviceDescInput = document.getElementById('service-description');

        let isValid = true;

        // Title Validation
        if (serviceTitleInput.value.length < 10) {
           serviceTitleInput.classList.add('error');
           isValid = false;
        }

        // Description Validation
        if (serviceDescInput.value.length < 20) {
           serviceDescInput.classList.add('error');
           isValid = false;
        }

        if (!isValid) {
          // Optional: Scroll to first error or shake button
          return;
        }

        // Proceed if valid
        step1Content.classList.remove('active');
        step1Content.classList.add('hidden');

        step2Content.classList.remove('hidden');
        step2Content.classList.add('active');

        navStep1.classList.remove('active');
        navStep1.querySelector('.step-circle').innerHTML = '✓'; // Mark as complete
        navStep1.querySelector('.step-circle').classList.add('success');

        navStep2.classList.add('active');
      });
    }

    // Navigation: Step 2 -> Step 1
    if (btnBackToDetails) {
      btnBackToDetails.addEventListener('click', function() {
        step2Content.classList.remove('active');
        step2Content.classList.add('hidden');

        step1Content.classList.remove('hidden');
        step1Content.classList.add('active');

        navStep2.classList.remove('active');
        navStep1.classList.add('active');
      });
    }

    // Navigation: Step 2 -> Step 3
    const btnNextToSchedule = document.getElementById('btn-next-to-schedule');
    const step3Content = document.getElementById('step-3-content');
    const navStep3 = document.querySelector('.step-item:nth-child(3)'); // Schedule step (index 3 in 1-based list? Actually .step-item list)
    // Wait, navStep3 ID logic: Step 1 is #nav-step-1, Step 2 is #nav-step-2.
    // HTML for Step 3 is just <li class="step-item disabled">...</li>. I should probably add an ID or select by child index.
    // Let's select by child index for robust targeting or add ID in HTML?
    // Current HTML:
    // <li class="step-item disabled"><div class="step-circle">3</div>...</li>

    // Let's use querySelector with nth-child to be safe with current HTML
    const navItems = document.querySelectorAll('.step-item');
    const navStep3Item = navItems[2]; // Index 2 is 3rd item

    if (btnNextToSchedule) {
      btnNextToSchedule.addEventListener('click', function() {
        let isValid = true;
        const isHourly = document.getElementById('btn-hourly').classList.contains('active');

        // Helper to check duration
        const checkDuration = (sectionId) => {
            const section = document.getElementById(sectionId);
            const selects = section.querySelectorAll('select.time-select');
            // Assuming pairs of Hour, Min.
            // Hourly has 2 pairs (Min, Max). Flat has 1 pair.

            // Logic: Just check if all visible selects are not "0 hours" AND "0 mins" at same time?
            // Better: Sum the time.
            let valid = true;

            // Group by pairs (parent div .time-select-row)
            const rows = section.querySelectorAll('.time-select-row');
            rows.forEach(row => {
               const hourVal = parseInt(row.children[0].value);
               const minVal = parseInt(row.children[1].value);
               // Note: value is "0 hours" text. parseInt("0 hours") -> 0.

               if (parseInt(row.children[0].value) === 0 && parseInt(row.children[1].value) === 0) {
                   valid = false;
                   // Visual feedback could be added here
                   row.style.border = "1px solid red";
               } else {
                   row.style.border = "none";
               }
            });
            return valid;
        };

        if (isHourly) {
           if (!checkDuration('hourly-duration-section')) isValid = false;
        } else {
           if (!checkDuration('flat-duration-section')) isValid = false;
        }

        if (!isValid) {
            alert("Please set a duration greater than 0.");
            return;
        }

        // Proceed
        step2Content.classList.remove('active');
        step2Content.classList.add('hidden');

        step3Content.classList.remove('hidden');
        step3Content.classList.add('active');

        navStep2.classList.remove('active');
        navStep2.querySelector('.step-circle').innerHTML = '✓';
        navStep2.querySelector('.step-circle').classList.add('success');
        navStep2.querySelector('.step-circle').classList.remove('blue'); // Remove number style

        navStep3Item.classList.remove('disabled');
        navStep3Item.classList.add('active');
        const circle3 = navStep3Item.querySelector('.step-circle');
        circle3.classList.add('blue'); // Add active color
      });
    }

    // Navigation: Step 3 -> Step 2
    const btnBackToPrice = document.getElementById('btn-back-to-price');
    if (btnBackToPrice) {
        btnBackToPrice.addEventListener('click', function() {
            step3Content.classList.remove('active');
            step3Content.classList.add('hidden');

            step2Content.classList.remove('hidden');
            step2Content.classList.add('active');

            navStep3Item.classList.remove('active');
            navStep3Item.querySelector('.step-circle').classList.remove('blue');

            navStep2.classList.add('active');
            // Revert checkmark if needed? Usually we keep it if valid, but active state overrides check style often.
            // Let's just make it active.
        });
    }

    // Price Type Toggle (Hourly / Flat)
    const btnHourly = document.getElementById('btn-hourly');
    const btnFlat = document.getElementById('btn-flat');
    const hourlyDurationSection = document.getElementById('hourly-duration-section');
    const flatDurationSection = document.getElementById('flat-duration-section');
    const rateSuffix = document.querySelector('.rate-suffix'); // If we kept it, but I removed it in HTML.

    if (btnHourly && btnFlat) {
      btnHourly.addEventListener('click', function() {
        btnHourly.classList.add('active');
        btnFlat.classList.remove('active');

        if(hourlyDurationSection) hourlyDurationSection.classList.remove('hidden');
        if(flatDurationSection) flatDurationSection.classList.add('hidden');
      });

      btnFlat.addEventListener('click', function() {
        btnFlat.classList.add('active');
        btnHourly.classList.remove('active');

        if(hourlyDurationSection) hourlyDurationSection.classList.add('hidden');
        if(flatDurationSection) flatDurationSection.classList.remove('hidden');
      });
    }

    // Cash Payments Toggle
    const toggleCash = document.getElementById('toggle-cash-payments');
    const cashOptionsContainer = document.getElementById('cash-options-container');

    if (toggleCash && cashOptionsContainer) {
      toggleCash.addEventListener('change', function() {
        if (this.checked) {
          cashOptionsContainer.classList.remove('hidden');
        } else {
          cashOptionsContainer.classList.add('hidden');
        }
      });
    }

    // Char Count for Cash Instructions
    const cashInstructions = document.getElementById('cash-instructions');
    const cashCharCount = document.getElementById('cash-char-count');
    if (cashInstructions && cashCharCount) {
      cashInstructions.addEventListener('input', function() {
        cashCharCount.textContent = `${this.value.length}/250`;
      });
    }
  }
});

// =======================
// LOGIN PRICING PAGE LOGIC
// =======================
document.addEventListener('DOMContentLoaded', function() {
  // Check if we are on the login pricing page
  const pricingGrid = document.querySelector('.pricing-plan-grid');

  if (pricingGrid) {
    // 1. Back Button -> Logout
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }

    // 2. Pill Toggle Logic (Monthly/Annually)
    const pillMonthly = document.getElementById('pill-monthly');
    const pillAnnually = document.getElementById('pill-annually');
    const priceVals = document.querySelectorAll('.price-val');

    if (pillMonthly && pillAnnually) {
      let isAnnual = false;

      function updatePrices() {
        if (isAnnual) {
          pillMonthly.classList.remove('active');
          pillAnnually.classList.add('active');
        } else {
          pillMonthly.classList.add('active');
          pillAnnually.classList.remove('active');
        }

        priceVals.forEach(priceEl => {
          const monthly = priceEl.getAttribute('data-monthly');
          const annually = priceEl.getAttribute('data-annually');
          if (isAnnual) {
            priceEl.textContent = '$' + annually;
          } else {
            priceEl.textContent = '$' + monthly;
          }
        });
      }

      pillMonthly.addEventListener('click', function() {
        if(isAnnual) { isAnnual = false; updatePrices(); }
      });

      pillAnnually.addEventListener('click', function() {
        if(!isAnnual) { isAnnual = true; updatePrices(); }
      });
    }

    // 3. Hide Details Logic
    const toggleBtns = document.querySelectorAll('.hide-details-btn');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Find the feature-section in the same card
        // Structure: btn -> div.toggle-details-container -> div.plan-body -> div.feature-section
        const cardBody = btn.closest('.plan-body');
        const featureSection = cardBody.querySelector('.feature-section');
        const arrow = btn.querySelector('.arrow');

        if (featureSection) {
          featureSection.classList.toggle('collapsed');

          if (featureSection.classList.contains('collapsed')) {
             // Collapsed state
             btn.innerHTML = 'Show Details <span class="arrow">^</span>';
             // Rotate arrow logic is handled by CSS .collapsed on btn usually, let's toggle class on btn too
             btn.classList.add('collapsed');
          } else {
             // Expanded state
             btn.innerHTML = 'Hide Details <span class="arrow">^</span>';
             btn.classList.remove('collapsed');
          }
        }
      });
    });
  }
});

// =======================
// PRICING TOGGLE
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('billing-toggle');
  const monthlyOpt = document.getElementById('monthly-opt');
  const yearlyOpt = document.getElementById('yearly-opt');

  // Elements to toggle
  const yearlyPrices = document.querySelectorAll('.yearly-price');
  const monthlyPrices = document.querySelectorAll('.monthly-price');

  if (toggleSwitch) {
    // Default state: Yearly (active)
    let isYearly = true;

    function updateView() {
      if (isYearly) {
        toggleSwitch.classList.remove('monthly-active');
        toggleSwitch.classList.add('active'); // active means right side (yearly)
        if (yearlyOpt) yearlyOpt.classList.add('active');
        if (monthlyOpt) monthlyOpt.classList.remove('active');

        yearlyPrices.forEach(el => el.style.display = 'block');
        monthlyPrices.forEach(el => el.style.display = 'none');
      } else {
        toggleSwitch.classList.add('monthly-active');
        toggleSwitch.classList.remove('active');
        if (yearlyOpt) yearlyOpt.classList.remove('active');
        if (monthlyOpt) monthlyOpt.classList.add('active');

        yearlyPrices.forEach(el => el.style.display = 'none');
        monthlyPrices.forEach(el => el.style.display = 'block');
      }
    }

    // Toggle on click
    toggleSwitch.addEventListener('click', function() {
      isYearly = !isYearly;
      updateView();
    });

    // Also toggle if clicking the labels
    if (monthlyOpt) {
      monthlyOpt.addEventListener('click', function() {
        if (isYearly) {
          isYearly = false;
          updateView();
        }
      });
    }

    if (yearlyOpt) {
      yearlyOpt.addEventListener('click', function() {
        if (!isYearly) {
          isYearly = true;
          updateView();
        }
      });
    }

    // Initial call
    updateView();
  }
});

// =======================
// SMOOTH SCROLLING FOR ANCHORS
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =======================
// BUTTON EFFECTS
// =======================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.transform = 'scale(1)';
  });
});

// =======================
// DROPDOWN MENU FUNCTIONALITY
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle && menu) {
      // Close dropdown when clicking outside
      document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.transform = 'translateY(-10px)';
        }
      });
    }
  });
});

// =======================
// CREATE ONLINE SERVICE LOGIC
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const serviceTitleInput = document.getElementById('service-title');
  const serviceDescInput = document.getElementById('service-description');
  const previewTitle = document.getElementById('preview-title');
  const previewDesc = document.getElementById('preview-desc');
  const previewImageDiv = document.getElementById('preview-image-div');

  const titleCount = document.getElementById('title-char-count');
  const descCount = document.getElementById('desc-char-count');

  // --- 1. Form Validation & Real-time Preview ---
  if (serviceTitleInput) {
    serviceTitleInput.addEventListener('input', function() {
      const val = this.value;
      titleCount.textContent = `${val.length}/200`;

      // Update preview
      previewTitle.textContent = val.length > 0 ? val : 'Service Title';

      // Validation style
      if (val.length < 10 && val.length > 0) {
        this.classList.add('error');
        this.classList.remove('success');
      } else if (val.length >= 10) {
        this.classList.remove('error');
        this.classList.add('success');
      } else {
        // Empty
        this.classList.remove('error');
        this.classList.remove('success');
      }
    });

    // Also validate on blur for "force" effect feeling
    serviceTitleInput.addEventListener('blur', function() {
      if (this.value.length < 10) {
         this.classList.add('error');
      }
    });
  }

  if (serviceDescInput) {
    serviceDescInput.addEventListener('input', function() {
      const val = this.value;
      descCount.textContent = `${val.length}/1000`;

      // Update preview (truncate if too long for card)
      previewDesc.textContent = val.length > 0 ? (val.length > 80 ? val.substring(0, 80) + '...' : val) : 'Service Description';

      // Validation style
      if (val.length < 20 && val.length > 0) {
        this.classList.add('error');
        this.classList.remove('success');
      } else if (val.length >= 20) {
        this.classList.remove('error');
        this.classList.add('success');
      } else {
        this.classList.remove('error');
        this.classList.remove('success');
      }
    });

    serviceDescInput.addEventListener('blur', function() {
      if (this.value.length < 20) {
         this.classList.add('error');
      }
    });
  }

  // --- 2. Custom Service Logic ---
  const customServiceCheck = document.getElementById('custom-service-check');
  const multiBookContainer = document.getElementById('multi-book-container');

  if (customServiceCheck && multiBookContainer) {
    customServiceCheck.addEventListener('change', function() {
      if (this.checked) {
        multiBookContainer.classList.remove('hidden');
      } else {
        multiBookContainer.classList.add('hidden');
      }
    });
  }

  // --- 3. Upload Media Logic ---
  const btnUploadTrigger = document.getElementById('btn-upload-trigger');
  const fileInput = document.getElementById('file-input');
  const mediaGrid = document.getElementById('media-grid');
  const uploadModal = document.getElementById('upload-modal');
  const modalImgPreview = document.getElementById('modal-img-preview');
  const btnCancelUpload = document.getElementById('btn-cancel-upload');
  const btnConfirmUpload = document.getElementById('btn-confirm-upload');

  let currentFile = null;

  if (btnUploadTrigger && fileInput) {
    btnUploadTrigger.addEventListener('click', function() {
      fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        currentFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          modalImgPreview.src = e.target.result;
          uploadModal.classList.remove('hidden');
        }
        reader.readAsDataURL(currentFile);
      }
    });
  }

  if (btnCancelUpload) {
    btnCancelUpload.addEventListener('click', function() {
      uploadModal.classList.add('hidden');
      fileInput.value = ''; // reset
      currentFile = null;
    });
  }

  if (btnConfirmUpload) {
    btnConfirmUpload.addEventListener('click', function() {
      if (currentFile && mediaGrid) {
        // Find first empty slot
        const slots = mediaGrid.querySelectorAll('.media-slot');
        let targetSlot = null;
        let slotIndex = -1;

        // Skip first slot (upload button)
        for (let i = 1; i < slots.length; i++) {
           if (slots[i].classList.contains('empty')) {
             targetSlot = slots[i];
             slotIndex = i;
             break;
           }
        }

        if (targetSlot) {
          // Read file again to set bg or img tag
          const reader = new FileReader();
          reader.onload = function(e) {
            const imgSrc = e.target.result;

            // Update slot
            targetSlot.classList.remove('empty');
            targetSlot.innerHTML = `
              <img src="${imgSrc}" alt="Uploaded Image">
              <div class="tile-actions">
                <button class="tile-btn edit" title="Change"><span style="pointer-events:none">✎</span></button>
                <button class="tile-btn crop" title="Crop"><span style="pointer-events:none">✂</span></button>
                <button class="tile-btn delete" title="Delete"><span style="pointer-events:none">🗑</span></button>
              </div>
            `;

            // If this is the first image uploaded (slot index 1), update preview card
            // Actually, any image uploaded should probably update preview if it's the "cover"
            // Logic: if preview placeholder has no image, set this. Or if it's the first slot.
            // Let's assume the first filled slot (index 1) is cover.
            const filledSlots = mediaGrid.querySelectorAll('.media-slot:not(.empty)');
            // filledSlots[0] is main-slot. filledSlots[1] is our first image.
            if (slotIndex === 1) {
              previewImageDiv.style.backgroundImage = `url('${imgSrc}')`;
              previewImageDiv.style.backgroundColor = 'transparent';
            }

            // Attach delete listener to new button
            const deleteBtn = targetSlot.querySelector('.tile-btn.delete');
            deleteBtn.addEventListener('click', function() {
              targetSlot.innerHTML = '';
              targetSlot.classList.add('empty');

              // If we deleted the cover image (slot 1), remove from preview or find next
              if (slotIndex === 1) {
                 // Check if slot 2 has image
                 const nextSlot = slots[2];
                 if (!nextSlot.classList.contains('empty')) {
                   const nextImg = nextSlot.querySelector('img').src;
                   previewImageDiv.style.backgroundImage = `url('${nextImg}')`;
                 } else {
                   previewImageDiv.style.backgroundImage = 'none';
                   previewImageDiv.style.backgroundColor = '#4fc3ff';
                 }
              }
            });
            // Edit/Crop placeholders (no functionality requested yet beyond "options")
          }
          reader.readAsDataURL(currentFile);
        } else {
          alert('Maximum 5 images allowed (plus cover logic).');
          // Note: Layout has 6 slots, 1 is button. So 5 images.
        }

        uploadModal.classList.add('hidden');
        fileInput.value = '';
        currentFile = null;
      }
    });
  }
});

  // --- 4. Wizard Sidebar Collapse logic removed (Sidebar is static) ---

  // --- 5. Step 3: Schedule Logic ---
  const btnEditTimezone = document.getElementById('btn-edit-timezone');
  const timezoneDisplay = document.getElementById('timezone-display');
  const timezoneEditor = document.getElementById('timezone-editor');
  const btnCancelTimezone = document.getElementById('btn-cancel-timezone');
  const btnSaveTimezone = document.getElementById('btn-save-timezone');
  const timezoneSelect = document.getElementById('timezone-select');
  const currentTimezoneText = document.getElementById('current-timezone-text');

  // Common Timezones List
  const commonTimezones = [
    "UTC - Coordinated Universal Time (UTC +0:00)",
    "EST - Eastern Standard Time (UTC -5:00)",
    "CST - Central Standard Time (UTC -6:00)",
    "MST - Mountain Standard Time (UTC -7:00)",
    "PST - Pacific Standard Time (UTC -8:00)",
    "GMT - Greenwich Mean Time (UTC +0:00)",
    "CET - Central European Time (UTC +1:00)",
    "EET - Eastern European Time (UTC +2:00)",
    "GST - Dubai Time (UTC +4:00)",
    "IST - India Standard Time (UTC +5:30)",
    "CST - China Standard Time (UTC +8:00)",
    "JST - Japan Standard Time (UTC +9:00)",
    "AEST - Australian Eastern Standard Time (UTC +10:00)"
  ];

  if (timezoneSelect) {
    // Populate Dropdown
    commonTimezones.forEach(tz => {
       const opt = document.createElement('option');
       opt.value = tz;
       opt.textContent = tz;
       timezoneSelect.appendChild(opt);
    });
    // Set default selection to current text if matches, else default
    if (currentTimezoneText) {
        timezoneSelect.value = currentTimezoneText.textContent;
    }
  }

  if (btnEditTimezone) {
    btnEditTimezone.addEventListener('click', function() {
       timezoneEditor.classList.remove('hidden');
       timezoneDisplay.classList.add('hidden');
    });
  }

  if (btnCancelTimezone) {
    btnCancelTimezone.addEventListener('click', function() {
       timezoneEditor.classList.add('hidden');
       timezoneDisplay.classList.remove('hidden');
    });
  }

  if (btnSaveTimezone) {
    btnSaveTimezone.addEventListener('click', function() {
       const selected = timezoneSelect.value;
       if (currentTimezoneText) currentTimezoneText.textContent = selected;
       timezoneEditor.classList.add('hidden');
       timezoneDisplay.classList.remove('hidden');
    });
  }

  // Navigation: Next to Method
  const btnNextToMethod = document.getElementById('btn-next-to-method');
  const btnBackToPrice = document.getElementById('btn-back-to-price');

  if (btnBackToPrice) {
    btnBackToPrice.addEventListener('click', function() {
       goToStep(2);
    });
  }

  if (btnNextToMethod) {
    btnNextToMethod.addEventListener('click', function() {
       // Optional: Validation (at least one day selected?)
       // User instructions didn't specify validation strictness, but we can just proceed.
       goToStep(4);
    });
  }

  // Fix: Ensure Step 3 Content ID is known to goToStep logic if strictly ID based
  // goToStep logic uses 'step-{n}-content' which matches our HTML.
  // Sidebar items are 'nav-step-{n}'.


  // --- 6. Step 4: Method Logic ---
  const cardBuiltin = document.getElementById('card-builtin');
  const cardCustom = document.getElementById('card-custom');
  const customMethodDetails = document.getElementById('custom-method-details');
  const customMethodSelect = document.getElementById('custom-method-select');
  const customInputContainer = document.getElementById('custom-input-container');
  const customInputLabel = document.getElementById('custom-input-label');
  const customInputField = document.getElementById('custom-input-field');

  let selectedMethod = 'builtin'; // default

  function updateMethodSelection(method) {
    selectedMethod = method;
    if (method === 'builtin') {
       if(cardBuiltin) cardBuiltin.classList.add('selected');
       if(cardCustom) cardCustom.classList.remove('selected');
       if(customMethodDetails) customMethodDetails.classList.add('hidden');
    } else {
       if(cardBuiltin) cardBuiltin.classList.remove('selected');
       if(cardCustom) cardCustom.classList.add('selected');
       if(customMethodDetails) customMethodDetails.classList.remove('hidden');
    }
  }

  // Initial State (Default Built-in)
  // Or should default be none? Image shows Built-in selected.
  updateMethodSelection('builtin');

  if (cardBuiltin) {
    cardBuiltin.addEventListener('click', function() {
       updateMethodSelection('builtin');
    });
  }

  if (cardCustom) {
    cardCustom.addEventListener('click', function() {
       updateMethodSelection('custom');
    });
  }

  if (customMethodSelect) {
    customMethodSelect.addEventListener('change', function() {
      const val = this.value;
      if (!val) return;

      customInputContainer.classList.remove('hidden');
      customInputField.value = ''; // clear previous input

      if (val === 'Phone Number') {
         customInputLabel.textContent = 'Phone Number*';
         customInputField.placeholder = 'Enter phone number';
         customInputField.type = 'tel';
         // Optional: Add flag icon logic if we had assets
      } else {
         customInputLabel.textContent = 'Link*';
         customInputField.placeholder = 'Enter a link';
         customInputField.type = 'text'; // or url
      }
    });
  }

  // Navigation: Next to Add-ons (Step 5)
  const btnNextToAddons = document.getElementById('btn-next-to-addons');
  const btnBackToSchedule = document.getElementById('btn-back-to-schedule');

  if (btnBackToSchedule) {
    btnBackToSchedule.addEventListener('click', function() {
       goToStep(3);
    });
  }

  if (btnNextToAddons) {
    btnNextToAddons.addEventListener('click', function() {
       // Validation
       if (selectedMethod === 'custom') {
          // Check if option selected
          if (!customMethodSelect.value) {
             alert('Please select a custom method option.');
             return;
          }
          // Check if input filled
          if (!customInputField.value.trim()) {
             customInputField.classList.add('error');
             return;
          }
       }
       // If Built-in, no extra validation needed (assuming it's valid to select it)

       goToStep(5); // Proceed to Add-ons (Step 5)
    });
  }
// Helper function for navigation (placed at end for safety)
function goToStep(stepNum) {
  // Hide all sections
  document.querySelectorAll('.wizard-section').forEach(s => s.classList.add('hidden'));

  // Show target section
  const targetSection = document.getElementById('step-' + stepNum + '-content');
  if (targetSection) {
     targetSection.classList.remove('hidden');
     window.scrollTo(0,0);
  }

  // Update Sidebar
  const navItems = document.querySelectorAll('.step-item');
  navItems.forEach((item, index) => {
     // index is 0-based. Step 1 is index 0.
     // Current step: index = stepNum - 1

     const stepIndex = index + 1;
     const circle = item.querySelector('.step-circle');

     if (stepIndex < stepNum) {
        // Previous steps: Success
        item.classList.remove('active', 'disabled');
        circle.classList.add('success');
        circle.classList.remove('blue');
        circle.textContent = '✓';
     } else if (stepIndex === stepNum) {
        // Current step: Active
        item.classList.add('active');
        item.classList.remove('disabled');
        circle.classList.add('blue');
        circle.classList.remove('success');
        circle.textContent = stepNum;
     } else {
        // Future steps: Disabled
        item.classList.remove('active');
        item.classList.add('disabled');
        circle.classList.remove('blue', 'success');
        circle.textContent = stepIndex;
     }
  });
}
