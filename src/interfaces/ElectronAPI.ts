export default interface electronAPI {
    close: () => void,
    hide: () => void,
    isMaximized: () => Promise<boolean>,
    setMaximized: (isMaximized : boolean) => void,
    onMaxUnmax: (callback: (isMaximized: boolean) => void) => Electron.IpcRenderer,
    getFileContent: (path: string) => Promise<string>
}