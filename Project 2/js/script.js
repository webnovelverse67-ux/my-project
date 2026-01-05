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
    const main = document.querySelector('.dashboard-main');

    if (collapseBtn) {
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

    // Navigation: Step 1 -> Step 2
    if (btnNextToPrice) {
      btnNextToPrice.addEventListener('click', function() {
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

    // Price Type Toggle (Hourly / Flat)
    const btnHourly = document.getElementById('btn-hourly');
    const btnFlat = document.getElementById('btn-flat');

    if (btnHourly && btnFlat) {
      btnHourly.addEventListener('click', function() {
        btnHourly.classList.add('active');
        btnFlat.classList.remove('active');
        // Logic to show/hide hourly specific fields could go here
      });

      btnFlat.addEventListener('click', function() {
        btnFlat.classList.add('active');
        btnHourly.classList.remove('active');
        // Logic to show/hide flat specific fields could go here
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
      if (val.length >= 10) {
        this.style.borderColor = '#10b981'; // green
      } else {
        this.style.borderColor = '#e5e7eb';
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
      if (val.length >= 20) {
        this.style.borderColor = '#10b981';
      } else {
        this.style.borderColor = '#e5e7eb';
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

  // --- 4. Wizard Sidebar Collapse ---
  const collapseWizardBtn = document.querySelector('.collapse-wizard-btn');
  const wizardSidebar = document.querySelector('.wizard-sidebar');
  const wizardMain = document.querySelector('.wizard-main');

  if (collapseWizardBtn && wizardSidebar && wizardMain) {
    collapseWizardBtn.addEventListener('click', function() {
      wizardSidebar.classList.toggle('collapsed');
      wizardMain.classList.toggle('wizard-collapsed');

      if (wizardSidebar.classList.contains('collapsed')) {
        collapseWizardBtn.innerHTML = '»'; // Point right to expand
      } else {
        collapseWizardBtn.innerHTML = '«'; // Point left to collapse
      }
    });

    // Initialize correct arrow
    if (wizardSidebar.classList.contains('collapsed')) {
        collapseWizardBtn.innerHTML = '»';
    } else {
        collapseWizardBtn.innerHTML = '«';
    }
  }
