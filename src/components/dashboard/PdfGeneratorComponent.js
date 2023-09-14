import React from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { FaFilePdf } from 'react-icons/fa';

const PdfGeneratorComponent = ({ reportId }) => {
  const { token } = useAuth();

  const generatePDF = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    try {
      const response = await fetch(`https://whistle-blower-server.vercel.app/reports/${reportId}/pdf`, {
        method: 'POST',
        headers: myHeaders,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `report_${reportId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        console.log(`PDF generated for report ${reportId}`);
      } else {
        console.error(`Failed to generate PDF for report ${reportId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to generate PDF for report ${reportId}:`, error);
    }
  };

  return (
    <div>
      <button onClick={generatePDF}><FaFilePdf />Generate PDF</button>
    </div>
  );
};

export default PdfGeneratorComponent;
