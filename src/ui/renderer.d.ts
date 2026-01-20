export interface IElectronAPI {
 startSessionTimeTracking: () => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}