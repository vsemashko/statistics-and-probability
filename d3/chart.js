/*var svg = d3.select('.main').html('').append('svg').attr('width', 600).attr('height', 300);
 var x = d3.scale.log().domain([250, 100000]).range([0, 600]);
 var y = d3.scale.linear().domain([15, 90]).range([250, 0]);
 var r = d3.scale.sqrt().domain([52070, 1380000000]).range([10, 40]);

 svg.append('circle').attr('fill', 'red')
 .attr('r', r(1380000000))
 .attr('cx', x(13330))
 .attr('cy', y(77));*/

let data = [4, 8, 15, 16, 23, 42];
/*let barX = d3.scale.linear().domain([0, d3.max(data)]).range([0, 500]);

 let chart = d3.select('.main').html('').classed({'chart': true})
 .selectAll('div').data(data)
 .enter().append('div').style('width', d => `${barX(d)}px`)
 .text(d => d);
 */

const width = 960;
const height = 600;

let y = d3.scale.linear().range([height, 0]);

let chart = d3.select('.main')
    .html('').append('svg').classed({'chart': true})
    .attr("width", width)
    .attr('height', height);


d3.json('data.json', (error, data) => {
    y.domain([0, d3.max(data, d => d.value)]);

    const barWidth = width / data.length;

    let bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', (d, i) => `translate(${i * barWidth},0)`);

    bar.append('rect')
        .attr("y", d => y(d.value))
        .attr('width', barWidth - 1)
        .attr('height', d => height - y(d.value));

    bar.append('text')
        .attr('x', barWidth / 2)
        .attr('y', d => y(d.value) + 3)
        .attr('dy', '.75em')
        .text(d => d.value);
});

