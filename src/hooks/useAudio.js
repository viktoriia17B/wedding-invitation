import { useState, useREf, useEffect, useRef } from 'react';
export const useAudio = (music) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPalying] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const playAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(music);
            audioRef.current.loop = true;// Музика буде повторюватися по колу
            audioRef.current.volume = 0.5;
        }
        return audioRef.current.play()
            .then(() => {
                setIsPalying(true);
                setShowBtn(true);
            })
            .catch(err => {
                console.log('Браузер заблокував', err);
                setShowBtn(true);
            });
    };
    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPalying(false);
        } else {
            audioRef.current.play().then(() => setIsPalying(true));
        }
    };
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);
    return { isPlaying, showBtn, playAudio, toggleAudio };
}