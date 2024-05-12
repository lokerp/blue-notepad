import "./Fade.css"

export default function Fade({ isOn } : { isOn : boolean}) {
    return (
        <div className={`fade ${isOn === true ? 'fade-on' : ''}`}>
        </div>
    )
}