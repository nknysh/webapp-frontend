// Libraries
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick';
import Highcharts from 'highcharts';

ReactChartkick.addAdapter(Highcharts);

const Chart = {
  Line: LineChart,
  Pie: PieChart,
};

export default Chart;
