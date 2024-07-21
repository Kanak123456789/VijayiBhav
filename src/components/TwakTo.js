import { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    // Check if Tawk.to script already exists
    if (!document.getElementById('tawk-script')) {
      // Defining Tawk_API globally
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      (function () {
        var s1 = document.createElement('script');
        s1.async = true;
        s1.src = 'https://embed.tawk.to/669d348fbecc2fed69288998/1i3b1akrk';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s1.id = 'tawk-script';
        var s0 = document.getElementsByTagName('script')[0];
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkTo;
