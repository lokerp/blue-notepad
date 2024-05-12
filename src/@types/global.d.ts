import ElectronAPI from "../interfaces/ElectronAPI";

declare global {
    interface Window {
        electronAPI : ElectronAPI
    }
}