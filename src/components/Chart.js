import React from "react";
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

export function Graph(props) {
    return (
        <Line data={props.value}
        options={
            {plugins: {
            legend: {
            display: false}
                }
            }
        }/>
    )
}