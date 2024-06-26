export interface IModalState {
  [key: string]: { step?: number; text?: string };
}

interface IInitialState {
  modalState: IModalState | null;
}

export const initialState: IInitialState = {
  // modalState: null,
  // modalState: { error: { text: "Ошибка" } },
  modalState: { auth: { step: 1 } },
};
