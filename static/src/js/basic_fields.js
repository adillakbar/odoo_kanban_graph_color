odoo.define('ess.customGraphColor', function (require) {
    'use strict';

    var core = require('web.core');
    var _t = core._t;
    var DashboardGraph = require('web.basic_fields').JournalDashboardGraph;

    var colors_month_dict = {
        'Jan': '#1f77b4',
        'Feb': '#ff7f0e',
        'Mar': '#aec7e8',
        'Apr': '#ffbb78',
        'May': '#2ca02c',
        'Jun': '#98df8a',
        'Jul': '#d62728',
        'Aug': '#ff9896',
        'Sep': '#9467bd',
        'Oct': '#c5b0d5',
        'Nov': '#8c564b',
        'Dec': '#c49c94'
    }

    DashboardGraph.include({
        _getBarChartConfig: function () {
            var data = [];
            var labels = [];
            var backgroundColor = [];

            this.data[0].values.forEach(function (pt) {
                data.push(pt.value);
                labels.push(pt.label);
                var color = pt.type === 'past' ? '#ccbdc8' : (pt.type === 'future' ? '#a5d8d7' : '#ebebeb');
                if (pt.show_month_color === true)
                {
                    color = colors_month_dict[pt.label];
                }
                backgroundColor.push(color);
            });
            return {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        fill: 'start',
                        label: this.data[0].key,
                        backgroundColor: backgroundColor,
                    }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        yAxes: [{display: false}],
                    },
                    maintainAspectRatio: false,
                    tooltips: {
                        intersect: false,
                        position: 'nearest',
                        caretSize: 0,
                    },
                    elements: {
                        line: {
                            tension: 0.000001
                        }
                    },
                },
            };
        },
    });

});