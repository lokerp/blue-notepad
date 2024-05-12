import { useState, useEffect } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'

import File from '../classes/File'
import FileFolder from '../classes/FileFolder'
import { default as Folders, foldersDeepCopy} from '../interfaces/Folders'

import './App.css'
import TextArea from './TextArea'

const initialFolders : Folders = {
  currentFolder: new FileFolder("Текущий", new Array<File>(new File(String.raw`C:\Users\Danya\Documents\Electron\blue-notepad\files\говно1.txt`, false))),
  favoritesFolder: new FileFolder("Избранные", new Array<File>()),
  recentFolder: new FileFolder("Недавние", new Array<File>(new File(String.raw`C:\Users\Danya\Documents\Electron\blue-notepad\files\говно2.txt`, true), new File(String.raw`C:\Users\Danya\Documents\Electron\blue-notepad\files\говно3.txt`, true))),
  customFolders: new Array<FileFolder>()
}

let isFirstInit = true

function App() {
  const [isSidebarOpened, setIsSideBarOpened] = useState(true);
  const [folders, setFolders] = useState(initialFolders);
  
  const currentFile = Array.from(folders.currentFolder.files.values())[0]

  useEffect(() => {
    if (isFirstInit) {
      isFirstInit = false
      
    }
  }, [])

  function handleFavoriteBtnClick(file: File) {
    console.log(folders)
    const copiedFolders = foldersDeepCopy(folders);
    const copiedFile = file.deepCopy(undefined, !file.isFavorite);

    [copiedFolders.currentFolder, copiedFolders.recentFolder, ...copiedFolders.customFolders].forEach((folder) => {
      const exists = folder.files.has(copiedFile.path)
      if (exists) {
        folder.files.set(copiedFile.path, copiedFile)
      }
    })

    if (copiedFile.isFavorite) {
      copiedFolders.favoritesFolder.files.set(copiedFile.path, copiedFile)
    }
    else {
      copiedFolders.favoritesFolder.files.delete(copiedFile.path)
    }

    setFolders(copiedFolders);
  }

  function handleFileBtnClick(file: File) {
    const copiedFolders = foldersDeepCopy(folders)
    const copiedFile = file.deepCopy()
    const previousFile = Array.from(copiedFolders.currentFolder.files.values())[0]
    copiedFolders.currentFolder = copiedFolders.currentFolder
                                               .deepCopy(undefined, new Map<string, File>([
                                                [copiedFile.path, copiedFile]
                                              ]))
    copiedFolders.recentFolder.files.set(previousFile.path, previousFile)

    setFolders(copiedFolders)
  }

  return (
    <div className='app'>
      {isSidebarOpened && 
        <Sidebar onSidebarCloseBtnClick={() => setIsSideBarOpened(false)}
                 folders={folders}
                 handleFileBtnClick={handleFileBtnClick}
                 handleFavoriteBtnClick={handleFavoriteBtnClick}
        />}
      <div className='app-main'>
        <Header currentFile={currentFile}
                isSidebarOpened={isSidebarOpened}
                onSidebarOpenBtnClick={() => setIsSideBarOpened(true)}
        />
        <TextArea currentFile={currentFile}

        />
      </div>
    </div>
  )
}

export default App
