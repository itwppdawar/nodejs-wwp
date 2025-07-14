import { IResetMail } from "../interface/interface.templatemail";

const CLIENT_URL =
	process.env.NODE_ENV !== "production"
		? process.env.URL_DEV
		: process.env.URL_PROD;

export const tempMailReset = (to: string, token: string): IResetMail => {
	return {
		from: process.env.MAIL_USERNAME,
		to: to,
		subject: "Confirmation Reset Password",
		html: `
        <!DOCTYPE html>
    <html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Aktivasi Akun</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>

<body style="margin: 0; padding: 0; background-color: #f6f8fb; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f6f8fb;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        
        <!-- Main Card Table -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #07cd10; padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.2;">
                PT BRAHMA BENUA SEJAHTERA
              </h1>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 32px 24px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 24px; font-size: 18px; font-weight: 600; color: #333333; line-height: 1.4;">
                Halo! ,
              </p>
              
              <!-- Main Message -->
              <p style="margin: 0 0 24px; font-size: 16px; color: #555555; line-height: 1.6;">
                Anda melakukan Reset Password Silakan Melakukan Aktivasi Lagi.
              </p>
              
              <!-- Security Note -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #07cd10; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">
                  <strong>💡 Catatan Keamanan:</strong><br>
                  Link aktivasi ini akan kedaluwarsa dalam 24 jam untuk menjaga keamanan akun Anda.
                </p>
              </div>
              
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 40px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #07cd10; border-radius: 8px; box-shadow: 0 4px 12px rgba(7, 205, 16, 0.3);">
                    <a href="${CLIENT_URL}/api/v1/user/activation/${token}" 
                       style="display: inline-block; padding: 16px 32px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease;">
                      🚀 Aktivasi Akun Sekarang
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <hr style="border: none; height: 1px; background-color: #e9ecef; margin: 0;">
            </td>
          </tr>
          
          <!-- Help Section -->
          <tr>
            <td style="padding: 32px;">
              <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #333333;">
                Butuh Bantuan?
              </h3>
              <p style="margin: 0 0 12px; font-size: 14px; color: #666666; line-height: 1.5;">
                Jika Anda mengalami kesulitan atau tidak merasa mendaftar, silakan hubungi tim support kami:
              </p>
              <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">
                📧 Email: <a href="ttzluthfi@gmail.com" style="color: #07cd10; text-decoration: none;">support@brahmabenua.com</a><br>
                📞 Telepon: <a href="082151234906" style="color: #07cd10; text-decoration: none;">+62 21-xxx-xxxx</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 32px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #888888;">
                &copy; ${new Date().getFullYear()} PT BRAHMA BENUA SEJAHTERA
              </p>
              <p style="margin: 0; font-size: 12px; color: #aaaaaa;">
                Email ini dikirim secara otomatis, mohon tidak membalas email ini.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
  <!-- Gmail App Dark Mode Support -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>
  
</body>
</html>
        `,
	};
};
