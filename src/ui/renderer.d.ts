export interface IElectronAPI {
 startSessionTimeTracking: () => void;
 getSessionDetails: () => void
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}