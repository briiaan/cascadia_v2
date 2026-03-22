const emailTemplate = ({ name, email, phone, message }) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Request - Cascadia Custom Framing</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background: #033f60;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 25px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .info-table td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    .info-table tr:last-child td {
      border-bottom: none;
    }
    .info-table .label {
      font-weight: bold;
      color: #555;
      width: 30%;
    }
    .footer {
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 12px;
      background: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Header -->
    <div class="header">
      <h1>New Service Request</h1>
      <p>Cascadia Custom Framing</p>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello,</h2>
      <p>A new request has been submitted through your website:</p>

      <table class="info-table">
        <tr>
          <td class="label">Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td class="label">Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td class="label">Phone:</td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td class="label">Message:</td>
          <td>${message}</td>
        </tr>
      </table>

      <p>Please respond promptly to provide excellent service!</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2026 Cascadia Custom Framing. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

export default emailTemplate;