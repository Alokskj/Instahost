import { useState, useEffect, useCallback } from 'react';

const words = ['Instantly', 'Securely', 'Scalably'];

const TextAnimation = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    const tick = useCallback(() => {
        const fullWord = words[wordIndex];
        const updatedText = isDeleting
            ? fullWord.substring(0, text.length - 1)
            : fullWord.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullWord) {
            setIsDeleting(true);
            setDelta(1000);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setDelta(500);
        }
    }, [isDeleting, text, wordIndex]);

    useEffect(() => {
        const ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [delta, text, tick]);

    return (
        <span className="text-yellow-300 text-left inline-block min-w-[280px] sm:min-w-[340px] md:min-w-[400px]">
            <span>{text}</span>
            <span className="animate-blink">&#x2502;</span>
        </span>
    );
};

export default TextAnimation;
