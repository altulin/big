/* eslint-disable @typescript-eslint/no-explicit-any */
const useGoogleManager = () => {
  interface CustomWindow extends Window {
    dataLayer: any[];
  }

  interface IObj {
    event: string;
    app_category?: string | undefined;
    ticker?: string | undefined;
    user_id?: string | undefined;
  }

  const addEvent = ({ event, app_category, ticker, user_id }: IObj) => {
    const customWindow = window as unknown as CustomWindow;

    if (!customWindow.dataLayer) return;

    const objEvent: IObj = {
      event: event,
    };

    if (app_category) {
      objEvent["app_category"] = app_category;
    }

    if (ticker) {
      objEvent["ticker"] = ticker;
    }

    if (user_id) {
      objEvent["user_id"] = ticker;
    }

    customWindow.dataLayer.push(objEvent);
  };

  return { addEvent };
};

export default useGoogleManager;
