import React from 'react';
import styles from './styles.module.scss';
import img from '../../../../public/assets/logo.png';

type Props = {
    onShowNewDealModal: () => void;
};

export const Header: React.FC<Props> = (props: Props) => (
    <header className={ styles.header }>
        <div className={ styles.logoWr } onClick={ () => window.location.reload() }>
            <div className={ styles.logo }>
                <img src={ img } alt="logo"></img>
            </div>
            Mango Deals
        </div>
        <div className={ styles.buttonWr }>
            <button onClick={ props.onShowNewDealModal } className={ styles.button }>New Deal</button>
        </div>
    </header>
);
