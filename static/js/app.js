//adding the dropdown information 

function buildMeta(sample){
  d3.json('../data/samples.json').then((data)=>{
      var meta_sample = data.metadata;
      var results = meta_sample.filter(sampleObject => sampleObject.id==sample);
      var result = results[0];
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value])=>{
          panel.append("h6").text(`${key.toUpperCase()}:${value}`);
      });
  });
}

//Creating Horizaontal Bar Chart

function buildCharts(sample){
  d3.json('../data/samples.json').then((data)=>{
      var samples = data.samples;
      var results = samples.filter(sampleObject => sampleObject.id==sample);
      var result = results[0];
      var otu_ids=result.otu_ids
      var otu_labels=result.otu_labels
      var sample_values=result.sample_values

      var yticks = otu_ids.slice(0,10).map(x=>`OTU ${x}`).reverse();
      var barData = [{y:yticks,
                      x: sample_values.slice(0,10).reverse(),
                      text: otu_labels.slice(0,10).reverse(),
                      type: "bar",
                      orientation:"h",
                      }];
      var barLayout = {title: "Bacteria Types Found",
                      margin: {t:30, l:150}};
      Plotly.newPlot("bar",barData,barLayout); 
console.log(samples[0].otu_ids)

//Creating Bubble Chart
      var bubble_data = [{
          x: samples[0].otu_ids,
          y: samples[0].sample_values,
          text:samples[0].otu_labels.slice(0,10),
          mode: 'markers',
          marker: {
            size: samples[0].sample_values,
            color: samples[0].otu_ids
          }
        }];
        var bubble_layout = {
          title:{text: ` OTU IDs and Sample Values`} ,
          xaxis: {title: `OTU ID`},
          yaxis: {title: `Sample Values`}
        };
    
        Plotly.newPlot('bubble', bubble_data, bubble_layout);     
  });
}

function update(){
var dropdown=d3.selectAll('#selDataset');
d3.json('../data/samples.json').then((data)=>{
  var sample_names = data.names
sample_names.forEach((name)=>{
dropdown.append('option').text(name).property('value', name);
});
  var Sample1 = sample_names[0];
  buildCharts(Sample1);
  buildMeta(Sample1);
});
}
function optionChanged(Sample2){
  buildCharts(Sample2);
  buildMeta(Sample2);
}
update();


