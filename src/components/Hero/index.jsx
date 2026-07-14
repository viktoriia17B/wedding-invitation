import styles from './hero.module.scss';

const Hero = ({ title, name, backgroundImg, nextSectionRef, onPlayAudio }) => {
    const handleStartScroll = () => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        onPlayAudio();
    }
    return (
        <section className={styles.hero} style={{
            '--bg-image': `url(${backgroundImg})`
        }}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                <div className={styles.center}>
                    <h2 className={styles.names}>{name}</h2>
                </div>
                <div className={styles.footer}>
                    <button className={styles.btn} type='button' onClick={handleStartScroll}>Відкрити запрошення</button>
                    <button className={styles.scrollHint} type='button' onClick={handleStartScroll} aria-label='Гортати вниз'>
                        <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='currentColor'
                            strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                            <path d='M6 9l6 6 6-6' />
                        </svg>
                    </button>
                </div>
            </div>
        </ section >
    )
};
export default Hero;