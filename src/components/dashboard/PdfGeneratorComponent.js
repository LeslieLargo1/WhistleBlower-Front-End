import React from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { FaFilePdf } from 'react-icons/fa';
import axios from 'axios';

const PdfGeneratorComponent = ({ reportId }) => {
  const { token } = useAuth();

  const generatePDF = async () => {
    if (!reportId) {
      console.error("reportId is undefined. Cannot generate PDF.");
      return;
    }
    try {
      const response = await axios.post(`https://whistle-blower-server.vercel.app/reports/${reportId}/pdf`, {}, {
        headers: { "Authorization": `Bearer ${token}` },
        responseType: 'blob'
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
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
