import React from 'react';
import classname from 'classnames';

import { DealType } from 'types/deal';
import styles from './styles.module.scss';
import trashIcon from '../../../../public/assets/trash.png';

type Props = {
    deals: DealType[];
    selectedDealId: string;
    onShowNextPage: () => void;
    onSelectDeal: (dealId: string) => void;
    onRemoveDeal:(dealId: string) => void;
};

export const DealsList: React.FC<Props> = (props: Props) => {
    const {
        deals,
        selectedDealId,
        onShowNextPage,
        onSelectDeal,
        onRemoveDeal,
    } = props;

    const handlerRowSelected = (dealId: string) => {
        onSelectDeal(dealId);

    };

    return (
        <React.Fragment>
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
                        const isRowSelected = selectedDealId === deal.id;
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
                                            onClick={ onRemoveDeal.bind(null, deal.id) }
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
        </React.Fragment>
    );
};
