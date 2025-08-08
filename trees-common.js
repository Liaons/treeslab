// TREES Lab - Funcionalidades Compartilhadas

// Configuração global
const TREES_CONFIG = {
  files: {
    publications: 'peer_reviewed_scientific_articles.csv',
    team: 'trees_lab_people_clean.csv'
  },
  animations: {
    duration: 600,
    delay: 100
  }
};

// Função para carregar CSV
async function loadCSV(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    return Papa.parse(text, { header: true, skipEmptyLines: true }).data;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

// Animação de contadores
function animateCounter(elementId, targetValue, duration = 2000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let startValue = 0;
  const increment = targetValue / (duration / 50);
  
  const timer = setInterval(() => {
    startValue += increment;
    if (startValue >= targetValue) {
      startValue = targetValue;
      clearInterval(timer);
    }
    element.textContent = Math.floor(startValue);
  }, 50);
}

// Animações de scroll
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observar elementos existentes
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Função para observar novos elementos
  window.observeNewElements = function() {
    document.querySelectorAll('.fade-in:not(.observed)').forEach(el => {
      el.classList.add('observed');
      observer.observe(el);
    });
  };
}

// Navegação suave
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Efeito da navbar no scroll
function initNavbarScroll() {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Função para truncar texto
function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Função para alternar seções colapsáveis
function toggleCollapsible(button) {
  const content = button.nextElementSibling;
  const isActive = button.classList.contains('active');
  
  // Fechar todas as outras seções colapsáveis
  const allCollapsibles = document.querySelectorAll('.collapsible');
  const allContents = document.querySelectorAll('.collapsible-content');
  
  allCollapsibles.forEach(col => col.classList.remove('active'));
  allContents.forEach(content => content.classList.remove('active'));
  
  // Alternar seção atual
  if (!isActive) {
    button.classList.add('active');
    content.classList.add('active');
  }
}

// Inicialização padrão
function initDefaultFeatures() {
  initScrollAnimations();
  initSmoothScroll();
  initNavbarScroll();
  
  // Trigger animações iniciais
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * TREES_CONFIG.animations.delay);
    });
  }, 300);
}

// Adicionar ao escopo global
window.TREES = {
  config: TREES_CONFIG,
  loadCSV,
  animateCounter,
  initScrollAnimations,
  initSmoothScroll,
  initNavbarScroll,
  truncateText,
  toggleCollapsible,
  initDefaultFeatures
};
