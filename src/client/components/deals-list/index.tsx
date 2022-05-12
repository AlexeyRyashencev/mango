import React, { useState } from 'react';
import { DealType } from 'src/client/types/deal';
import classname from 'classnames';
import trashIcon from '../../../../public/assets/trash.png';
import styles from './styles.module.scss';

type Props = {
    deals: DealType[];
    onShowNextPage: () => {};
    onSelectDeal: (dealId: string) => {};
};

export const DealsList: React.FC<Props> = (props: Props) => {
    const { deals, onShowNextPage, onSelectDeal } = props;
    const [selectedDeal, setSelectedDeal] = useState<string>('');

    const handlerRowSelected = (dealId: string) => (
        setSelectedDeal(dealId === selectedDeal ? '' : dealId)
    );

    return (
        <>
            <div className={ styles.table }>
                <div className={ styles.tableHeader }>
                    <div className={ styles.tableRow }>
                        <div className={ styles.tableCell }>Value</div>
                        <div className={ styles.tableCell }>Date and time</div>
                        <div className={ styles.tableCell }></div>
                    </div>
                </div>
                <div className={ styles.tableBody }>
                    { deals.map((deal) => {
                        const isRowSelected = selectedDeal === deal.id;
                        return (
                            <div
                                key={ deal.id }
                                className={ classname(styles.tableRow, { [styles.selected]: isRowSelected }) }
                                onClick={ handlerRowSelected.bind(null, deal.id) }
                            >
                                <div className={ styles.tableCell }>{ deal.value }</div>
                                <div className={ styles.tableCell }>{ new Date(deal.date).toLocaleString() }</div>

                                <div className={ styles.tableCell }>
                                    { isRowSelected && (
                                        <div
                                            className={ styles.trashIconWr }
                                            onClick={ onSelectDeal.bind(null, deal.id) }
                                        >
                                            <img src={ trashIcon } alt="delete"></img>
                                        </div>
                                    ) }
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <div className={ styles.tableFooter }>
                <button onClick={ onShowNextPage } className={ styles.footerButton }>Load next page</button>
            </div>
        </>
    );
};
