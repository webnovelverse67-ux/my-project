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
        // Simple toggle for now, could be more complex animation
        if (sidebar.style.width === '0px' || sidebar.style.display === 'none') {
          sidebar.style.display = 'flex';
          sidebar.style.width = '260px';
          main.style.marginLeft = '260px';
          collapseBtn.innerHTML = '«';
        } else {
          sidebar.style.display = 'none'; // Or width 0
          main.style.marginLeft = '0';
          // Move button out? Usually persistent header needed.
          // For simplicity in this demo, let's just assume it hides.
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
