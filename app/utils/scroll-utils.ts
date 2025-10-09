/**
 * Scrolls all scrollable containers to top before executing a callback
 * @param callback - Function to execute after scrolling
 * @param delay - Delay in milliseconds before executing callback (default: 150ms)
 */
export const scrollToTopAndNavigate = (callback?: () => void, delay: number = 150) => {
  if (!callback) return;
  
  // Find all possible scrollable containers and scroll them to top
  const scrollableSelectors = [
    'main', // Main layout container
    '.overflow-y-auto', // Any element with overflow-y-auto class
    '[data-scrollable]', // Any element marked as scrollable
  ];
  
  let scrolled = false;
  
  // Try to find and scroll each type of container
  scrollableSelectors.forEach(selector => {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
      if (container.scrollTop > 0) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        scrolled = true;
      }
    });
  });
  
  // Fallback to window scroll if no scrollable containers found or scrolled
  if (!scrolled) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Small delay to allow scroll to start, then navigate
  setTimeout(() => {
    callback();
  }, delay);
};
