// State management
let state = {
  progress: 0,
  days: 0,
  hours: 47,
  minutes: 59,
  currentStep: 1
};

// Order steps data
const orderSteps = [
  {
    id: 1,
    title: 'Order Confirmed',
    subtitle: 'Verified',
    time: 'Jan 17, 2026 at 2:34 PM',
    description: 'Your order has been received and confirmed',
    icon: '✓',
    color: 'emerald'
  },
  {
    id: 2,
    title: 'Preparing for Shipment',
    subtitle: 'In Progress',
    time: 'Expected: Jan 17, 2026 at 5:30 PM',
    description: 'Warange Distribution Center. Expected Jan 17, 2026 at 5:30 PM. Your package is being prepared',
    icon: '📦',
    color: 'orange'
  },
  {
    id: 3,
    title: 'In Transit',
    subtitle: 'Package on the way',
    time: 'Expected: Jan 18, 2026 at 8:35 AM',
    description: 'Package on the way to you',
    icon: '🚚',
    color: 'blue'
  },
  {
    id: 4,
    title: 'Out for Delivery',
    subtitle: 'At Destination Facility',
    time: 'Expected: Jan 20, 2026 at 6:30 PM',
    description: 'Final stop — your doorstep!',
    icon: '📍',
    color: 'purple'
  }
];

// Initialize app
function init() {
  // Animate progress on load
  setTimeout(() => {
    state.progress = 93;
    updateProgress();
  }, 500);

  // Start countdown timer
  startCountdown();

  // Cycle through order steps
  startOrderStepsCycle();

  // Render order journey
  renderOrderJourney();
}

// Update progress circle
function updateProgress() {
  const progressValue = document.getElementById('progressValue');
  const progressCircle = document.getElementById('progressCircle');
  
  if (progressValue && progressCircle) {
    progressValue.textContent = `${state.progress}%`;
    
    // Calculate stroke-dashoffset for the circle
    const circumference = 2 * Math.PI * 88;
    const offset = circumference * (1 - state.progress / 100);
    progressCircle.style.strokeDashoffset = offset;
  }
}

// Countdown timer
function startCountdown() {
  setInterval(() => {
    if (state.minutes > 0) {
      state.minutes--;
    } else if (state.hours > 0) {
      state.hours--;
      state.minutes = 59;
    } else if (state.days > 0) {
      state.days--;
      state.hours = 23;
      state.minutes = 59;
    }
    
    updateCountdown();
  }, 60000); // Update every minute
}

// Update countdown display
function updateCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  
  if (daysEl) daysEl.textContent = state.days;
  if (hoursEl) hoursEl.textContent = state.hours;
  if (minutesEl) minutesEl.textContent = state.minutes;
}

// Cycle through order steps
function startOrderStepsCycle() {
  setInterval(() => {
    state.currentStep = state.currentStep >= 4 ? 1 : state.currentStep + 1;
    renderOrderJourney();
  }, 3000);
}

// Render order journey
function renderOrderJourney() {
  const container = document.getElementById('orderJourney');
  if (!container) return;
  
  container.innerHTML = '';
  
  orderSteps.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'journey-step';
    stepEl.style.animationDelay = `${1.5 + index * 0.15}s`;
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'step-icon-container';
    
    const icon = document.createElement('div');
    icon.className = `step-icon ${step.id <= state.currentStep ? step.color : 'gray'} ${step.id === state.currentStep ? 'active' : ''}`;
    icon.textContent = step.icon;
    
    iconContainer.appendChild(icon);
    
    if (index < orderSteps.length - 1) {
      const line = document.createElement('div');
      line.className = `step-line ${step.id < state.currentStep ? 'complete' : ''}`;
      iconContainer.appendChild(line);
    }
    
    const info = document.createElement('div');
    info.className = 'step-info';
    
    const title = document.createElement('div');
    title.className = `step-title ${step.id === state.currentStep ? 'active' : ''}`;
    title.textContent = step.title;
    
    const subtitle = document.createElement('div');
    subtitle.className = `step-subtitle ${step.id === state.currentStep ? 'active' : 'inactive'}`;
    subtitle.textContent = step.subtitle;
    
    const time = document.createElement('div');
    time.className = 'step-time';
    time.textContent = step.time;
    
    const description = document.createElement('div');
    description.className = 'step-description';
    description.textContent = step.description;
    
    info.appendChild(title);
    info.appendChild(subtitle);
    info.appendChild(time);
    info.appendChild(description);
    
    stepEl.appendChild(iconContainer);
    stepEl.appendChild(info);
    
    container.appendChild(stepEl);
  });
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Modal action functions
function updateAddress() {
  alert('Address updated successfully!');
  closeModal('addressModal');
}

function cancelOrder() {
  alert('Order cancelled successfully. Refund will be processed in 3-5 business days.');
  closeModal('cancelModal');
}

function sendMessage() {
  alert('Message sent!');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    const modal = e.target.closest('.modal');
    if (modal) {
      closeModal(modal.id);
    }
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      closeModal(activeModal.id);
    }
  }
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  init();
  
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(card);
  });
  
  // Add ripple effect to buttons
  document.querySelectorAll('.btn, .action-button, .nav-button').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .btn, .action-button, .nav-button {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add parallax effect to delivery route background
  const deliveryRoute = document.querySelector('.delivery-route');
  if (deliveryRoute) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      deliveryRoute.style.backgroundPosition = `${rate}px ${rate}px`;
    });
  }
  
  // Add typing indicator animation for chat
  const chatInput = document.querySelector('.chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  // Animate numbers on scroll
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  
  // Observe stat values for animation
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const value = parseInt(entry.target.textContent);
        if (!isNaN(value)) {
          animateValue(entry.target, 0, value, 1000);
          entry.target.dataset.animated = 'true';
        }
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-value').forEach(stat => {
    statObserver.observe(stat);
  });
  
  // Add loading state simulation
  const simulateLoading = () => {
    const app = document.getElementById('app');
    app.style.opacity = '0';
    
    setTimeout(() => {
      app.style.transition = 'opacity 0.5s ease-in';
      app.style.opacity = '1';
    }, 100);
  };
  
  simulateLoading();
  
  // Add focus trap for modals
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  const trapFocus = (modal) => {
    const focusableContent = modal.querySelectorAll(focusableElements);
    const firstFocusable = focusableContent[0];
    const lastFocusable = focusableContent[focusableContent.length - 1];
    
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
    
    firstFocusable.focus();
  };
  
  // Apply focus trap to all modals
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('transitionend', () => {
      if (modal.classList.contains('active')) {
        trapFocus(modal);
      }
    });
  });
  
  // Add accessibility improvements
  document.querySelectorAll('button, a, .nav-item, .cart-container').forEach(el => {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    
    el.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
  
  // Add ARIA labels
  const searchButton = document.querySelector('.search-button');
  if (searchButton) {
    searchButton.setAttribute('aria-label', 'Search');
  }
  
  const cartContainer = document.querySelector('.cart-container');
  if (cartContainer) {
    cartContainer.setAttribute('aria-label', 'Shopping cart with 3 items');
  }
  
  // Add live region for dynamic updates
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';
  document.body.appendChild(liveRegion);
  
  // Update live region when order step changes
  const originalRenderOrderJourney = renderOrderJourney;
  renderOrderJourney = function() {
    originalRenderOrderJourney();
    const currentStepData = orderSteps.find(step => step.id === state.currentStep);
    if (currentStepData) {
      liveRegion.textContent = `Order status updated: ${currentStepData.title}`;
    }
  };
  
  // Add print styles
  const printStyles = document.createElement('style');
  printStyles.textContent = `
    @media print {
      .nav-bar,
      .secondary-nav,
      .success-banner,
      .footer,
      .action-buttons,
      .compact-actions,
      .modal {
        display: none !important;
      }
      
      .card {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      
      body {
        background: white !important;
      }
    }
  `;
  document.head.appendChild(printStyles);
  
  // Add performance monitoring
  if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.renderTime || entry.loadTime);
        }
      }
    });
    
    try {
      perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }
  }
  
  // Add service worker for offline support (optional)
  if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  
  // Add error boundary
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Could show user-friendly error message here
  });
  
  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
  });
  
  // Log initialization complete
  console.log('Amazon Order Tracking app initialized successfully!');
});

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.updateAddress = updateAddress;
window.cancelOrder = cancelOrder;
window.sendMessage = sendMessage;
