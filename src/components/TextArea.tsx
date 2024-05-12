import { FormEvent, useEffect, useState } from 'react'

import './TextArea.css'

import File from '../classes/File'

export default function TextArea(props : 
                                    { currentFile : File }) {
    const [text, setText] = useState('')

    useEffect(() => {
        async function getFileContent() {
            const content = await window.electronAPI.getFileContent(props.currentFile.path)
            setText(content)
        }
        getFileContent()
    }, [props.currentFile])
    
    function onInput(event : FormEvent<HTMLTextAreaElement>) {
        setText(event.currentTarget.value)
    }

    return (<textarea value={text} onInput={onInput}></textarea>)
}