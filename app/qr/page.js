"use client"
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator = () => {
  const [value, setValue] = useState('https://bornebyte.vercel.app');

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>QR Code Generator</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text or URL"
          style={{
            padding: '10px',
            width: '300px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ 
        background: 'white', 
        padding: '16px', 
        display: 'inline-block',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Scan this QR code with your phone
      </div>
    </div>
  );
};

export default QRCodeGenerator;