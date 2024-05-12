import { useState } from 'react'

import Button from './Button'

import sideBarClose from '../assets/icons/sideBarClose.svg'
import newFile from '../assets/icons/newFile.svg'
import saveFile from '../assets/icons/saveFile.svg'
import webVersion from '../assets/icons/webVersion.svg'

import './Sidebar.css'
import FileFolderComp from './FileFolder'
import File from '../classes/File'
import Folders from '../interfaces/Folders'

export default function Sidebar(props :
                                 { onSidebarCloseBtnClick: () => void,
                                  folders : Folders,
                                  handleFileBtnClick: (file: File) => void,
                                  handleFavoriteBtnClick: (file: File) => void }) {
    
    
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div>   
                    <Button onClick={props.onSidebarCloseBtnClick}
                            className='sidebar-header-btn'
                            icon={sideBarClose}
                    />
                    <Button onClick={() => undefined}
                            className='sidebar-header-btn'
                            icon={newFile}
                    />                
                </div>
                <div>
                    <Button onClick={() => undefined}
                            className='sidebar-header-btn'
                            icon={saveFile}
                    />
                    <Button onClick={() => undefined}
                            className='sidebar-header-btn'
                            icon={webVersion}
                    />
                </div>
            </div>
            <ul className='sidebar-filefolder-list'>
                <li>
                    <FileFolderComp name={props.folders.currentFolder.name}
                                    files={Array.from(props.folders.currentFolder.files.values())}
                                    handleFileBtnClick={() => undefined}
                                    handleFavoriteBtnClick={props.handleFavoriteBtnClick}
                                    isCurrentFolder={true}
                    />
                </li>
                {props.folders.favoritesFolder.files.size > 0 &&
                    <li>
                        <FileFolderComp name={props.folders.favoritesFolder.name}
                                        files={Array.from(props.folders.favoritesFolder.files.values())}
                                        handleFileBtnClick={props.handleFileBtnClick}
                                        handleFavoriteBtnClick={props.handleFavoriteBtnClick}
                        />
                    </li>
                }
                {props.folders.recentFolder.files.size > 0 &&
                    <li>
                        <FileFolderComp name={props.folders.recentFolder.name}
                                        files={Array.from(props.folders.recentFolder.files.values())}
                                        handleFileBtnClick={props.handleFileBtnClick}
                                        handleFavoriteBtnClick={props.handleFavoriteBtnClick}
                        />
                    </li>
                }
                {props.folders.customFolders.map(folder => 
                    folder.files.size > 0 &&
                    <li>
                        <FileFolderComp name={folder.name}
                                        files={Array.from(folder.files.values())}
                                        handleFileBtnClick={props.handleFileBtnClick}
                                        handleFavoriteBtnClick={props.handleFavoriteBtnClick}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}