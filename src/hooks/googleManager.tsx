/* eslint-disable @typescript-eslint/no-explicit-any */
const useGoogleManager = () => {
  interface CustomWindow extends Window {
    dataLayer: any[];
  }

  const addEvent = ({
    event,
    app_category,
    ticker,
  }: {
    event: string;
    app_category?: string | undefined;
    ticker?: string | undefined;
  }) => {
    const customWindow = window as unknown as CustomWindow;

    if (!customWindow.dataLayer) return;

    const objEvent: {
      event: string;
      app_category?: string | undefined;
      ticker?: string | undefined;
    } = {
      event: event,
    };

    if (app_category) {
      objEvent["app_category"] = app_category;
    }

    if (ticker) {
      objEvent["ticker"] = ticker;
    }

    customWindow.dataLayer.push(objEvent);
  };

  return { addEvent };
};

export default useGoogleManager;
