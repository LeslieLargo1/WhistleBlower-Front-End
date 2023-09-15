import React from 'react';
import { FaFileAlt, FaFileCode  } from 'react-icons/fa';

const GenerateReportHTML = ({ report }) => {

  const downloadReport = (format) => {
    let content = '';
    let mimeType = '';
    let fileExtension = '';

    switch (format) {
      case 'html':
        content = `
          <html>
            <head>
              <title>Report</title>
            </head>
            <body>
              <h1>${report.title}</h1>
              <p><strong>Status:</strong> ${report.status}</p>
              <p><strong>Priority:</strong> ${report.priority}</p>
              <p><strong>Description:</strong> ${report.description}</p>
            </body>
          </html>
        `;
        mimeType = 'text/html';
        fileExtension = 'html';
        break;
      
      case 'json':
        content = JSON.stringify(report, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
        break;

      case 'txt':
        content = `
          Title: ${report.title}
          Status: ${report.status}
          Priority: ${report.priority}
          Description: ${report.description}
        `;
        mimeType = 'text/plain';
        fileExtension = 'txt';
        break;

      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.style.display = 'none';
    a.href = url;
    a.download = `report_${report.id}.${fileExtension}`;

    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={() => downloadReport('html')}>
        <FaFileAlt /> Download as HTML
      </button>
      <button onClick={() => downloadReport('json')}>
        <FaFileCode /> Download as JSON
      </button>
      <button onClick={() => downloadReport('txt')}>
        <FaFileAlt  /> Download as TXT
      </button>
    </div>
  );
};

export default GenerateReportHTML;
