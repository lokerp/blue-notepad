import { useEffect, useState } from 'react'

import Button from './Button'
import closeIcon from '../assets/icons/close.svg'
import maximizeIcon from '../assets/icons/maximize.svg'
import unmaximizeIcon from '../assets/icons/unmaximize.svg'
import hideIcon from '../assets/icons/hide.svg'
import sideBireOpenIcon from '../assets/icons/sideBarOpen.svg'

import File from '../classes/File'
import ElectronAPI from '../interfaces/ElectronAPI'

import './Header.css'

let isFirstInit = true

export default function Header(props 
                             : { currentFile : File,
                                 isSidebarOpened : boolean,
                                 onSidebarOpenBtnClick : () => void }) {

    const [isMaximized, setIsMaximized] = useState<boolean>(false);
    let maxUnmaxIcon = isMaximized ? unmaximizeIcon : maximizeIcon;
    
    useEffect(() => {
      async function onFirstInit() {
        isFirstInit = false
        const isMaximized = await window.electronAPI.isMaximized()
        setIsMaximized(isMaximized)

        window.electronAPI.onMaxUnmax((isMaximized : boolean) => setIsMaximized(isMaximized))
      }

      if (isFirstInit) {
        isFirstInit = false
        onFirstInit()
      }
    }, [])

    async function handleMaxUnmaxBtnClick() {
      window.electronAPI.setMaximized(isMaximized)
    }

    return (
        <div className='container header'>
          <div className='container d-flex justify-content-space-between align-items-center h-100'>
            <div data-tauri-drag-region className='header-item header-left'>
              <Button onClick={props.onSidebarOpenBtnClick}
                        className={`header-btn ${props.isSidebarOpened === true ? 'hidden' : ''}`}
                        icon={sideBireOpenIcon}
              />
            </div>
            <div data-tauri-drag-region className='header-item header-center'>
              <Button onClick={() => undefined}
                      className='header-central-btn'
                      text={props.currentFile.name}
              />
            </div>
            <div data-tauri-drag-region className='header-item header-right'>
              <Button onClick={() => window.electronAPI.hide()}
                      className='header-btn'
                      icon={hideIcon}
              />
              <Button onClick={() => handleMaxUnmaxBtnClick()}
                      className='header-btn'
                      icon={maxUnmaxIcon}
              />
              <Button onClick={() => window.electronAPI.close()}
                      className='header-btn'
                      icon={closeIcon}
              />
            </div>
          </div>
        </div>
    )
  }