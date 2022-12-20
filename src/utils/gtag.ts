declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
