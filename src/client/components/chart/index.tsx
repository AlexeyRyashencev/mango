import React, { useEffect, useRef } from 'react';
import { DealType } from 'types/deal';

import styles from './styles.module.scss';

const CANVAS_HEIGHT = 286;
const CANVAS_WIDTH = window.innerWidth;
const GRID_VERTICAL_LINES_COUNT = 12;
const GRID_HORIZONTAL_LINES_COUNT = 5;

type Props = {
    data: DealType[];
    selectedDealId: string;
    canvasProps?: {};
};

/* calculate max deal value and return percent between max deal value and CANVAS_HEIGHT */
const getMaxDiffHeightPercent = (data: DealType[]): number => {
    let maxDealValue = CANVAS_HEIGHT;
    for (let deal of data) {
        if (Number(deal.value) > maxDealValue) {
            maxDealValue = Number(deal.value);
        }
    }
    return maxDealValue / CANVAS_HEIGHT * 100;
};

/* convert deal value to canvas Y pixel */
const convertCoordinateToYPixel = (dealValue: number, maxDiffHeightPercent: number): number =>
    (-dealValue * 100 / maxDiffHeightPercent) + CANVAS_HEIGHT;


export const Chart: React.FC<Props> = (props: Props) => {
    const canvasRef = useRef(null)
    const { data, selectedDealId } = props;
    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        let px = 0;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const maxDiffHeightPercent = getMaxDiffHeightPercent(data);

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = CANVAS_HEIGHT;

        /* draw grid */
        let xGridLinesStep = Math.floor(window.innerWidth / GRID_VERTICAL_LINES_COUNT);
        let yGridLinesStep = Math.floor(CANVAS_HEIGHT / GRID_HORIZONTAL_LINES_COUNT);

        ctx.strokeStyle = 'rgba(235, 245, 248, 0.05)';
        ctx.lineWidth = 1;

        for (let xLines = 0; xLines < GRID_VERTICAL_LINES_COUNT; xLines++) {
            ctx.beginPath();
            ctx.moveTo(xGridLinesStep, 0);
            ctx.lineTo(xGridLinesStep, CANVAS_HEIGHT);
            ctx.stroke();
            xGridLinesStep += Math.floor(window.innerWidth / GRID_VERTICAL_LINES_COUNT);
        }
        for (let yLines = 0; yLines < GRID_HORIZONTAL_LINES_COUNT; yLines++) {
            ctx.beginPath();
            ctx.moveTo(0, yGridLinesStep);
            ctx.lineTo(CANVAS_WIDTH, yGridLinesStep);
            ctx.stroke();
            yGridLinesStep += Math.floor(CANVAS_HEIGHT / GRID_HORIZONTAL_LINES_COUNT);
        }

        /* draw deals data */
        ctx.strokeStyle = '#00A3FF';
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(px, convertCoordinateToYPixel(Number(data[0].value), maxDiffHeightPercent));


        for (let i = 1; i < data.length; i++) {
            px += 30;
            const py = convertCoordinateToYPixel(Number(data[i].value), maxDiffHeightPercent);
            ctx.lineTo(px, py);

            /* Use Bezier curves */
            /* const points = data.reduce((acc, current): { x: number; y: number; }[] => {
                 xDealStep += 30;
                 return [...acc, {
                     x: xDealStep,
                     y: convertCoordinateToYPixel(Number(current.value), maxDiffHeightPercent),
                 }]
             }, [{ x: xDealStep, y: convertCoordinateToYPixel(Number(data[0].value), maxDiffHeightPercent) }]);
             const t = 1;
             for (let i = 0; i < points.length - 1; i++) {
                 const p0 = (i > 0) ? points[i - 1] : points[0];
                 const p1 = points[i];
                 const p2 = points[i + 1];
                 const p3 = (i != points.length - 2) ? points[i + 2] : p2;

                 const cp1x = p1.x + (p2.x - p0.x) / 6 * t;
                 const cp1y = p1.y + (p2.y - p0.y) / 6 * t;

                 const cp2x = p2.x - (p3.x - p1.x) / 6 * t;
                 const cp2y = p2.y - (p3.y - p1.y) / 6 * t;

                 ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
             } */
        }
        ctx.stroke();

        /* draw selected deal */
        const selectedDealIndex = data.findIndex((deal) => deal.id === selectedDealId);
        if (selectedDealIndex >= 0) {
            const py = convertCoordinateToYPixel(data[selectedDealIndex].value, maxDiffHeightPercent);

            ctx.beginPath();
            ctx.strokeStyle = '#346D8D';
            ctx.lineWidth = 1;
            ctx.moveTo(30 * selectedDealIndex, 0);
            ctx.lineTo(30 * selectedDealIndex, CANVAS_HEIGHT);
            ctx.moveTo(0, py);
            ctx.lineTo(CANVAS_WIDTH, py);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = 'rgba(132,211,255, 0.33)';
            ctx.ellipse(30 * selectedDealIndex, py, 24, 24, 0, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = '#84D3FF';
            ctx.ellipse(30 * selectedDealIndex, py, 10, 10, 0, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.ellipse(30 * selectedDealIndex, py, 7, 7, 0, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }

    }, [props]);

    return (
        <div className={ styles.chart }>
            <canvas ref={ canvasRef } { ...props.canvasProps } />
        </div>
    );
};
