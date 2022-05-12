import React, { useEffect, useState } from 'react';

import { Header } from 'components/header';
import { DealsList } from 'components/deals-list';
import { Chart } from 'components/chart';
import { getQueryString } from 'utils/query';
import { DealType } from 'types/deal';

import styles from './app.module.scss';

export const App: React.FC = () => {
    const [deals, setDeals] = useState<DealType[]>([]);
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

    const handlerSelectDeal = (dealId: number) => {
        fetch(`http://localhost:3001/api/deal/${ dealId }`, {
            method: 'DELETE',
        }).then(() => {
            setDeals(deals.filter((deal) => deal.id !== dealId));
        }).catch(() => {
            console.log('Cant remove deal');
        });
    };

    useEffect(fetchDeals.bind(null, 10, 0), []);

    return (
        <div className={ styles.app }>
            <Header />
            <Chart data={ deals } />
            <DealsList
                deals={ deals }
                onShowNextPage={ handlerShowNextPage }
                onSelectDeal={ handlerSelectDeal }
            />
        </div>
    );
};
