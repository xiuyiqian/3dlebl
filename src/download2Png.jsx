// DownloadComponent.jsx
import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

const DownloadComponent = ({ screenshotTarget }) => {
  useEffect(() => {
    const handleDownload = () => {
      html2canvas(screenshotTarget).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        const anchor = document.createElement('a');
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "my-image.png");
        anchor.click();
        anchor.remove();
      });
    };

    // Attach the event listener
    document.getElementById("dl-png").addEventListener("click", handleDownload);

    // Clean up the event listener on component unmount
    return () => {
      document.getElementById("dl-png").removeEventListener("click", handleDownload);
    };
  }, [screenshotTarget]);

  return (
    <div className="convert">
      <h2>Download HTML to PNG</h2>
      <button
        id="dl-png"
        style={{ fontSize: '28px', padding: '10px 20px', backgroundColor: 'black', color: 'white', borderRadius: '5px' }}
      >
        Download as PNG
      </button>
    </div>
  );
};

export default DownloadComponent;
