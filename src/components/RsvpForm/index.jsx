import { useState, useRef, useEffect } from "react";
import FinalScreen from "../FinalScreen";
import Divider from '../Divider';
import styles from './rsvpForm.module.scss';
import { ATTENDANCE_OPTIONS, ALCOHOL_OPTIONS } from "./rsvpOptions";
const RsvpForm = ({ endpoint, backgroundImg }) => {
    const nameInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        attending: 'yes',
        alcohol: [],
        _gotcha: '' // Formspree honeypot: людина лишає поле порожнім, бот заповнює — заявка відхиляється
    });
    const [status, setStatus] = useState('idle');
    const hasFocusedForAlcohol = useRef(false); // реф, що зберігається між рендерами без запуску ре-рендеру;
    useEffect(() => {
        if (formData.attending === 'no') {
            nameInputRef.current?.focus();
        }
    }, [formData.attending]);
    useEffect(() => {
        if (formData.attending === 'yes' && formData.alcohol.length > 0 && !hasFocusedForAlcohol.current) {
            hasFocusedForAlcohol.current = true;
            nameInputRef.current?.focus();
        }
        if (formData.alcohol.length === 0) {
            hasFocusedForAlcohol.current = false;
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
        <section className={styles.rsvp}>
            {status === 'sent' ? (<FinalScreen backgroundImg={backgroundImg} {...formData} />) : (
                <div className={styles.content}>
                    <div className={styles.top}>
                        <h2 className={styles.title}>Анкета гостя</h2>
                        <Divider />
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
                            <input type="text" name="_gotcha" value={formData._gotcha} onChange={handleChange}
                                className={styles.visuallyHidden} tabIndex="-1" autoComplete="off" aria-hidden="true" />
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.visuallyHidden}>Ваше ім'я</label>
                                <input ref={nameInputRef} type='text' id="name" name="name" required className={styles.inputField} value={formData.name}
                                    onChange={handleChange} placeholder="Ваше ім'я" />
                            </div>
                        </div>
                        <button className={styles.btn} type='submit' disabled={status === 'sending'}>
                            {status === 'sending' ? 'Надсилаємо...' : 'Відправити'}</button>
                        {status === 'error' && (<p className={styles.error}>Щось пішло не так. Спробуйте пізніше.</p>)}
                    </form>
                </div>)}
        </section>
    )
};
export default RsvpForm;