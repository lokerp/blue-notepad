// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron/renderer'
import ElectronAPI from './interfaces/ElectronAPI'

const electronAPI : ElectronAPI = {
  close: () => ipcRenderer.send('close'),
  hide: () => ipcRenderer.send('hide'),
  isMaximized: () => ipcRenderer.invoke('isMaximized'),
  setMaximized: (isMaximized : boolean) => ipcRenderer.send('setMaximized', isMaximized),
  onMaxUnmax: (callback : (isMaximized: boolean) => void) => 
                ipcRenderer.on('maxUnmax', (event, isMaximized : boolean) => callback(isMaximized)),
  getFileContent: (path : string) => ipcRenderer.invoke('getFileContent', path), 
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)