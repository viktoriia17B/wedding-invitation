import { forwardRef } from "react";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useState, useRef, useEffect } from "react";
import FinalScreen from "../FinalScreen";
import styles from './rsvpForm.module.scss';
import { ATTENDANCE_OPTIONS, ALCOHOL_OPTIONS } from "./rsvpOptions";
const RsvpForm = forwardRef(({ endpoint, backgroundImg }, ref) => {
    const nameInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        attending: 'yes',
        alcohol: []
    });
    const [status, setStatus] = useState('idle');
    useEffect(() => {
        if (formData.attending === 'no') {
            nameInputRef.current?.focus();
        }
        if (formData.attending === 'yes' && formData.alcohol.length > 0) {
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 200)
        }
    }, [formData.attending, formData.alcohol])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleCheckbox = (item) => {
        setFormData(prev => {
            const isSelected = prev.alcohol.includes(item);
            return {
                ...prev, alcohol: isSelected ? prev.alcohol.filter(i => i !== item)
                    : [...prev.alcohol, item]
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(endpoint,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            setStatus(res.ok ? 'sent' : 'error');
        }
        catch { setStatus('error') }
    };

    return (
        <section ref={ref} className={styles.rsvp}>
            {status === 'sent' ? (<FinalScreen backgroundImg={backgroundImg} {...formData} />) : (
                <div className={styles.content}>
                    <div className={styles.top}>
                        <h2 className={styles.title}>Анкета гостя</h2>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.visuallyHidden}>Ваше ім'я</label>
                        <input ref={nameInputRef} type='text' id="name" name="name" required className={styles.inputField} value={formData.name}
                            onChange={handleChange} placeholder="Ваше ім'я" />
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <p className={styles.groupLabel}>Чи зможете розділити з нами цей день?</p>
                            <div className={styles.container}>
                                {ATTENDANCE_OPTIONS.map(opt => (
                                    <label key={opt.value} className={`${styles.field} ${formData.attending === opt.value ? styles.active : ''}`}>
                                        <input type="radio" name="attending" value={opt.value}
                                            checked={formData.attending === opt.value} onChange={handleChange} />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                            {formData.attending === 'yes' && (
                                <div className={styles.formGroup}>
                                    <p className={styles.groupLabel}>Ваші побажання по напоям:</p>
                                    <div className={styles.container}>
                                        {ALCOHOL_OPTIONS.map(it => {
                                            const isChecked = formData.alcohol.includes(it);
                                            return (
                                                <label key={it} className={`${styles.field} ${isChecked ? styles.active : ''}`}>
                                                    <input type='checkbox' checked={isChecked} onChange={() => handleCheckbox(it)} />
                                                    {it}
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className={styles.btn} type='submit' disabled={status === 'sending'}>
                            {status === 'sending' ? 'Надсилаємо...' : 'ВІдправити'}</button>
                        {status === 'error' && (<p className={styles.error}>Щось пішло не так. Спробуйте пізніше.</p>)}
                    </form>
                </div>)}
        </section>
    )
});
export default RsvpForm;