import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { NewDealFormType } from 'types/new-deal-form-type';

import styles from './styles.module.scss';
import crossImg from '../../../../public/assets/cross-icon.png';
import checkImg from '../../../../public/assets/check-icon.png';

type Props = {
    show: boolean;
    onClose: () => void;
    onSubmitForm: (formData: NewDealFormType) => Promise<boolean>;
};

export const NewDealModal: React.FC<Props> = (props: Props) => {
    const { show, onClose, onSubmitForm } = props;
    const [playSuccessAnimation, setPlaySuccessAnimationStatus] = useState<boolean>(false);

    const updateSuccessElement = () => {
        setPlaySuccessAnimationStatus(false);
        onClose();
    }

    const { register, handleSubmit } = useForm<NewDealFormType>({
        mode: 'onSubmit',
        defaultValues: {
            date: new Date().toDateString(),
            value: 0,
        },
    });

    if (!show) {
        return null;
    }

    const onSubmit = async (formData: NewDealFormType) => {

        const showAnimation = await onSubmitForm(formData);
        if (showAnimation) {
            setPlaySuccessAnimationStatus(true);
        }
    };

    return (
        <React.Fragment>
            <div className={ styles.bg }></div>
            <div className={ styles.modal }>
                { playSuccessAnimation ? (
                    <div className={ styles.successWr } onAnimationEnd={ updateSuccessElement }>
                        <div className={ styles.success }>
                            <div className={ styles.checkIconWr }>
                                <img src={ checkImg } alt="check" />
                            </div>
                        </div>
                        <h2>Your deal was<br />submitted successfully!</h2>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className={ styles.headerWr }>
                            <h3 className={ styles.header }>Make a New Deal</h3>
                            <div className={ styles.closeIconWr } onClick={ onClose }>
                                <img src={ crossImg } alt="close modal" />
                            </div>
                        </div>
                        <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
                            <div className={ styles.formRow }>
                                <label>Current Date</label>
                                <input type="datetime" { ...register('date') } />
                            </div>
                            <div className={ styles.formRow }>
                                <label>Enter value</label>
                                <input autoComplete="off" type="number" { ...register('value') } />
                            </div>
                            <div className={ styles.formFooter }>
                                <input autoComplete="off" className={ styles.submit } type="submit" value="Proceed" />
                            </div>
                        </form>
                    </React.Fragment>
                ) }
            </div>
        </React.Fragment>
    )
};
