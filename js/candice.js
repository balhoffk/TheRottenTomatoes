// Initializes the page with a default blank plot
function init() {

    var trace1 = 
    {
        x: ["Jan 1", "Apr 1", "Jul 1", "Oct 1", "Dec 1"],
        y: [60, 70, 80, 90, 100],
        name :"Forecasted Crime",
        type: "scatter"  
    };
    var layout = {
        title: (`Birthday Week - Forecasted vs. Actual Crime`),
        xaxis: {title: "Time"},
        yaxis: {title: "Levels of Crime",
                type: "linear"}
    };
  
    Plotly.newPlot("birthday", trace1, layout);
  }
  init();



d3.csv('../raw_data/crime_weather_fore.csv').then(data => {
    csvData = data;
    dates = data.map(row => row.date);

    var sample1 = data.filter(row => row.date >= '2019-04-05' && row.date <= '2019-04-12')
    var sample2 = data.filter(row => row.date >= '2019-05-25' && row.date <= '2019-06-02')
    var sample3 = data.filter(row => row.date >= '2019-05-31' && row.date <= '2019-06-06')
    var sample4 = data.filter(row => row.date >= '2019-07-02' && row.date <= '2019-07-09')
    var sample5 = data.filter(row => row.date >= '2019-07-22' && row.date <= '2019-07-29')
  
    var names = ['Candice','Jackie','Kannan','Kevin & Georgia','Ethan'];
    var all_samples = [sample1, sample2, sample3, sample4, sample5];

        for (let i = 0; i < all_samples.length; i++) {
            console.log(all_samples[i]);
            
            d3.select('#selBirthday').append('option').text(all_samples[i][0].date).attr('value',i);
            d3.select('#selBirthday').on('change', () => {
                        index = d3.select('#selBirthday').property("value");
                        trace_function(all_samples[index])
                    })
            
        };
       
   function trace_function(item){
       var trace1 = 
           {
               x: item.map(row => row.date),
               y: item.map(row => row.All_Crime),
               name :"All Crime",
               type: "scatter",
               line: {color: "red"}
               
           };
       
       var trace2 = 
           {
               x: item.map(row => row.date),
               y: item.map(row => row.forecasted_crime),
               name :"Forecasted Crime",
               type: "scatter",
               line: {color: "blue"}  
           };
       
       var all_traces = [trace1, trace2]

       var layout = {
           title: (`${names[index]}'s Birthday Week - Forecasted vs. Actual Crime`),
           xaxis: {title: "2019 Week"},
           yaxis: {title: "Number of Crimes Committed",
                   type: "linear"}
       };
       
       Plotly.newPlot("birthday", all_traces,layout);

   }
 
});