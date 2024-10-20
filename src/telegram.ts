interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }
  
  interface TelegramWebAppInitData {
    query_id?: string;
    user?: TelegramWebAppUser;
    auth_date: number;
    hash: string;
  }
  
  declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: TelegramWebAppInitData;
          ready: () => void;
          expand: () => void;
          close: () => void;
          openInvoice: (url: string) => Promise<void>;
        };
      };
    }
  }
  
  export const TelegramWebApp = {
    init: () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
    },
    getUser: (): TelegramWebAppUser | null => {
      return window.Telegram?.WebApp.initDataUnsafe.user || null;
    },
    openInvoice: async (total: number) => {
      if (window.Telegram?.WebApp.openInvoice) {
        try {
          // In a real implementation, you would make an API call to your server to create an invoice
          const invoiceUrl = await createInvoice(total);
          await window.Telegram.WebApp.openInvoice(invoiceUrl);
          console.log('Invoice opened successfully');
        } catch (error) {
          console.error('Error opening invoice:', error);
          alert('There was an error processing your payment. Please try again.');
        }
      } else {
        console.log(`Opening invoice for $${total.toFixed(2)}`);
        alert(`This is where we would open a Telegram invoice for $${total.toFixed(2)}. In a real implementation, this would use the Telegram Bot API.`);
      }
    },
  };
  
  // This function would be implemented on your server
  async function createInvoice(total: number): Promise<string> {
    // Make an API call to your server to create an invoice
    // Return the invoice URL provided by the Telegram Bot API
    return `https://t.me/your_bot?start=invoice_${Date.now()}`;
  }