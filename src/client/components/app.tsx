import React, { useEffect, useState } from 'react';

import { Header } from 'components/header';
import { DealsList } from 'components/deals-list';
import { Chart } from 'components/chart';
import { NewDealModal } from 'components/new-deal-modal';

import { getQueryString } from 'utils/query';
import { DealType } from 'types/deal';

import styles from './app.module.scss';

export const App: React.FC = () => {
    const [deals, setDeals] = useState<DealType[]>([]);
    const [selectedDealId, setSelectedDealId] = useState<string>('');
    const [showNewDealModal, setShowNewDealModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    const fetchDeals = (count: number, page: number) => {
        fetch('http://localhost:3001/api/deals?' + getQueryString({
            count,
            page,
        })).then((res) => res.json()).then((data) => {
            setDeals(data);
        });
    };

    const handlerShowNextPage = () => {
        new Promise((resolve) => resolve(page)).then((page: number) => {
            setPage(page + 1);
            return page + 1;
        }).then((newPage: number) => {
            fetchDeals(10, newPage);
        });
    };

    const handlerSelectDeal = (dealId: string) => {
        setSelectedDealId(dealId === selectedDealId ? '' : dealId);
    };

    const handlerRemoveDeal = (dealId: string) => {
        fetch(`http://localhost:3001/api/deal/${ dealId }`, {
            method: 'DELETE',
        }).then(() => {
            setDeals(deals.filter((deal) => deal.id !== dealId));
        }).catch(() => {
            console.log('Cant remove deal');
        });
    };

    const handlerTriggerNewDealModalState = (show: boolean) => {
        setShowNewDealModal(show);
    };

    useEffect(fetchDeals.bind(null, 10, 0), []);

    return (
        <div className={ styles.app }>
            <Header onShowNewDealModal={ handlerTriggerNewDealModalState.bind(null, true) } />
            <Chart
                data={ deals }
                selectedDealId={ selectedDealId }
            />
            <DealsList
                deals={ deals }
                selectedDealId={ selectedDealId }
                onShowNextPage={ handlerShowNextPage }
                onRemoveDeal={ handlerRemoveDeal }
                onSelectDeal={ handlerSelectDeal }
            />
            <NewDealModal
                show={ showNewDealModal }
                onClose={ handlerTriggerNewDealModalState.bind(null, false) }
            />
        </div>
    );
};
