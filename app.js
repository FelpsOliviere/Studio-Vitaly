function setupExitPopup() {
  const popup = document.getElementById('exit-popup');
  const closeBtn = document.getElementById('exit-close');
  if (!popup || !closeBtn) return;

  let alreadyShown = false;

  function showPopup() {
    if (alreadyShown) return;
    alreadyShown = true;
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
  }

  document.addEventListener('mouseout', (event) => {
    if (event.clientY <= 0) {
      showPopup();
    }
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  });

  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.classList.remove('show');
      popup.setAttribute('aria-hidden', 'true');
    }
  });
}

function setupLazyMap() {
  const mapFrame = document.querySelector('#localizacao iframe[data-src]');
  if (!mapFrame) return;

  const loadMap = () => {
    if (!mapFrame.src) {
      mapFrame.src = mapFrame.dataset.src;
    }
  };

  if (!('IntersectionObserver' in window)) {
    loadMap();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMap();
        observer.disconnect();
      }
    });
  }, { rootMargin: '300px 0px' });

  observer.observe(mapFrame);
}

function setupLazyElfsight() {
  const elfsightContainer = document.querySelector('[data-elfsight-app-lazy]');
  if (!elfsightContainer) return;

  const scriptUrl = elfsightContainer.dataset.elfsightSrc;
  if (!scriptUrl) return;

  let scriptLoaded = false;

  const loadElfsightScript = () => {
    if (scriptLoaded) return;
    scriptLoaded = true;

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);
  };

  if (!('IntersectionObserver' in window)) {
    loadElfsightScript();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadElfsightScript();
        observer.disconnect();
      }
    });
  }, { rootMargin: '400px 0px' });

  observer.observe(elfsightContainer);
}

setupExitPopup();
setupLazyMap();
setupLazyElfsight();
