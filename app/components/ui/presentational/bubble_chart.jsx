import React from 'react';
import ReactBubbleChart from 'react-bubble-chart';


import translate from '../../main/translate';

var colorLegend = [
  "#0c1544",
  "#f70047",
  "#fd7c00",
   "#00f791"
];

const BubbleChart = ({data}) => {
    let index = -1;
    const bubbleData = data.reduce((prev, sameSizedItems) => {
      return prev.concat( sameSizedItems.items.map((item) => {
          index++;
          return {
            _id: index,
            displayText: item,
            value: sameSizedItems.size,
            colorValue: index % colorLegend.length
          }
        })
      )}, []
    );

    return (
      <div className="bubble-chart">
        <ReactBubbleChart
          className="bubble-chart-container"
          data={ bubbleData}
          colorLegend={colorLegend}

        />
      </div>
    );

};

export default translate(BubbleChart);
