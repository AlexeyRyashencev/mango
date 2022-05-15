import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import crossImg from '../../../../public/assets/cross-icon.png';

type Props = {
    show: boolean;
    onClose: () => void;
};

export const NewDealModal: React.FC<Props> = (props: Props) => {
    const { show, onClose } = props;
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            date: new Date(),
            value: 0,
        },
    });
    if (!show) {
        return null;
    }

    const onSubmit = () => {

    }

    return (
        <React.Fragment>
            <div className={ styles.bg }></div>
            <div className={ styles.modal }>
                <div className={ styles.headerWr }>
                    <h3 className={ styles.header }>Make a New Deal</h3>
                    <div className={ styles.closeIconWr } onClick={ onClose }>
                        <img src={ crossImg } alt="close modal" />
                    </div>
                </div>
                <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
                    <div className={ styles.formRow }>
                        <label>Current Date</label>
                        <input type="datetime-local" { ...register('date') } />
                    </div>
                    <div className={ styles.formRow }>
                        <label>Enter value</label>
                        <input autoComplete="off" type="number" { ...register('value') } />
                    </div>
                    <div className={ styles.formFooter }>
                        <input autoComplete="off" className={ styles.submit } type="submit" value="Proceed" />
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
};
