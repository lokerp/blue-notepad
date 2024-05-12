import Button from './Button'

import File from '../classes/File'

import favoriteDisabledIcon from '../assets/icons/favoriteDisabled.svg'
import favoriteEnabledIcon from '../assets/icons/favoriteEnabled.svg'

import './FileFolder.css'

export default function FileFolder(props : 
                                    { name : string,
                                     files : Array<File>,
                                     isCurrentFolder? : boolean,
                                     handleFileBtnClick : (file : File) => void,
                                     handleFavoriteBtnClick : (file: File) => void}) {


    return (
        <div className='filefolder'>
            <p className='filefolder-name'>{props.name}</p>
            <ul className='filefolder-file-list'>
                {props.files.map((file) =>
                    <li className='filefolder-file' key={file.path}>
                        <Button onClick={() => props.handleFileBtnClick(file)}
                                className={`filefolder-btn ${props.isCurrentFolder ? 'filefolder-btn-current' : ''}`}
                                text={file.name}
                        />
                        <Button onClick={() => props.handleFavoriteBtnClick(file)}
                                className='filefolder-favorite-btn'
                                icon={file.isFavorite ? favoriteEnabledIcon : favoriteDisabledIcon}
                        />
                    </li>
                    )
                }
            </ul>
        </div>
    )
}