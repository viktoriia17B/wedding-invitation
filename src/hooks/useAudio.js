import { useState, useEffect, useRef } from 'react';
export const useAudio = (music) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const playAudio = () => {
        if (!audioRef.current) {
            const audio = new Audio();
            // Safari/iOS не відтворює OGG Vorbis — обираємо підтримуваний формат
            audio.src = audio.canPlayType('audio/ogg; codecs="vorbis"') ? music.ogg : music.mp3;
            audio.loop = true;// Музика буде повторюватися по колу
            audio.volume = 0.5;
            audioRef.current = audio;
        }
        return audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
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
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true));
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
