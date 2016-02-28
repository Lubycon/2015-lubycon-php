//////////////////data ready////////////////////////
//upload data
var upload_data = [
    {
        "value": 15,
        "month": 1,
    }, 
    {
        "value": 22,
        "month": 2,
    }, 
    {
        "value": 33,
        "month": 3,
    }, 
    {
        "value": 5,
        "month": 4,
    }, 
    {
        "value": 34,
        "month": 5,
    }, 
    {
        "value": 22,
        "month": 6,
    },
    {
        "value": 7,
        "month": 7,
    },
    {
        "value": 6,
        "month": 8,
    },
    {
        "value": 1,
        "month": 9,
    },
    {
        "value": 7,
        "month": 10,
    },
    {
        "value": 11,
        "month": 11,
    },
    {
        "value": 3,
        "month": 12,
    }
];
//upload data
//download data
var download_data = [
    {
        "value": 1,
        "month": 1,
    }, 
    {
        "value": 3,
        "month": 2,
    }, 
    {
        "value": 1,
        "month": 3,
    }, 
    {
        "value": 5,
        "month": 4,
    }, 
    {
        "value": 14,
        "month": 5,
    }, 
    {
        "value": 6,
        "month": 6,
    },
    {
        "value": 3,
        "month": 7,
    },
    {
        "value": 7,
        "month": 8,
    },
    {
        "value": 10,
        "month": 9,
    },
    {
        "value": 21,
        "month": 10,
    },
    {
        "value": 30,
        "month": 11,
    },
    {
        "value": 50,
        "month": 12,
    }
];
//download data
//like data
var like_data = [
    {
        "value": 30,
        "month": 1,
    }, 
    {
        "value": 50,
        "month": 2,
    }, 
    {
        "value": 50,
        "month": 3,
    }, 
    {
        "value": 30,
        "month": 4,
    }, 
    {
        "value": 38,
        "month": 5,
    }, 
    {
        "value": 27,
        "month": 6,
    },
    {
        "value": 15,
        "month": 7,
    },
    {
        "value": 23,
        "month": 8,
    },
    {
        "value": 55,
        "month": 9,
    },
    {
        "value": 23,
        "month": 10,
    },
    {
        "value": 26,
        "month": 11,
    },
    {
        "value": 37,
        "month": 12,
    }
];
//like data


var max_uv = d3.max(upload_data.map(function(d) { return d.value; }));//maximun value in upload data
var max_dv = d3.max(download_data.map(function(d) { return d.value;}));//maximun value in download data
var max_lv = d3.max(like_data.map(function(d) { return d.value;}));//maximun value in like data
//////////////////data ready////////////////////////

//////////////////chart ready///////////////////////
var vis = d3.select('#graph1'),
    vis2 = d3.select('#graph2'),
    vis3 = d3.select('#graph3'),
    
    WIDTH = 700,
    HEIGHT = 350,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },

    xScale = d3.scale.linear().domain([1,12]).range([MARGINS.left, WIDTH - MARGINS.right]),
    yScale = d3.scale.linear().domain([0,max_uv*1.2]).range([HEIGHT - MARGINS.top, MARGINS.bottom]),
    yScale2 = d3.scale.linear().domain([0,max_dv*1.2]).range([HEIGHT - MARGINS.top, MARGINS.bottom]),
    yScale3 = d3.scale.linear().domain([0,max_lv*1.2]).range([HEIGHT - MARGINS.top, MARGINS.bottom]),

    xAxis = d3.svg.axis()
            .scale(xScale),
  
    yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
    yAxis2 = d3.svg.axis()
            .scale(yScale2)
            .orient("left");
    yAxis3 = d3.svg.axis()
            .scale(yScale3)
            .orient("left");
//////////////////chart ready///////////////////////
//////////////////make guide line///////////////////

vis.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+(HEIGHT-MARGINS.bottom)+")")
    .call(xAxis);
vis.append("g")
    .attr("class","axis")
    .attr("transform","translate("+(MARGINS.left)+",0)")
    .call(yAxis);

vis2.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+(HEIGHT-MARGINS.bottom)+")")
    .call(xAxis);
vis2.append("g")
    .attr("class","axis")
    .attr("transform","translate("+(MARGINS.left)+",0)")
    .call(yAxis2);

vis3.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+(HEIGHT-MARGINS.bottom)+")")
    .call(xAxis);
vis3.append("g")
    .attr("class","axis")
    .attr("transform","translate("+(MARGINS.left)+",0)")
    .call(yAxis3);

//////////////////make guide line//////////////////





/////////////////graph line ready//////////////////
var lineGen = d3.svg.line()
    .x(function(d){
        return xScale(d.month);
    })
    .y(function(d){
        return yScale(d.value);
    })
    .interpolate("linear");

var areaGen = d3.svg.area()
    .x(function(d){
        return xScale(d.month);
    })
    .y0(HEIGHT-MARGINS.bottom)
    .y1(function(d){
        return yScale(d.value);
    })
    .interpolate("linear");
/////////////////////////////////////////
var lineGen2 = d3.svg.line()
    .x(function(d){
        return xScale(d.month);
    })
    .y(function(d){
        return yScale2(d.value);
    })
    .interpolate("linear");

var areaGen2 = d3.svg.area()
    .x(function(d){
        return xScale(d.month);
    })
    .y0(HEIGHT-MARGINS.bottom)
    .y1(function(d){
        return yScale2(d.value);
    })
    .interpolate("linear");
////////////////////////////////////////
var lineGen3 = d3.svg.line()
    .x(function(d){
        return xScale(d.month);
    })
    .y(function(d){
        return yScale3(d.value);
    })
    .interpolate("linear");

var areaGen3 = d3.svg.area()
    .x(function(d){
        return xScale(d.month);
    })
    .y0(HEIGHT-MARGINS.bottom)
    .y1(function(d){
        return yScale3(d.value);
    })
    .interpolate("linear");
//////////////////graph line ready//////////////////
//////////////////draw graph line///////////////////
//graph1 draw start
vis.append('svg:path')
    .attr('d', lineGen(upload_data))
    .attr('class','up_graph_line')
    .attr('stroke','#48cfad')
    .attr('stroke-width','2')
    .attr('fill','none');

vis.append('svg:path')
    .attr('d', areaGen(upload_data))
    .attr('class','up_graph_area')
    .attr('stroke-width','0')
    .attr('fill','#48cfad')
    .attr('opacity','0.5');

//graph1 draw end
//graph2 draw start    
vis2.append('svg:path')
    .attr('d', lineGen2(download_data))
    .attr('class','down_graph_line')
    .attr('stroke','#ffbe54')
    .attr('stroke-width','2')
    .attr('fill','none');

vis2.append('svg:path')
    .attr('d', areaGen2(download_data))
    .attr('class','down_graph_area')
    .attr('stroke-width','0')
    .attr('fill','#ffbe54')
    .attr('opacity','0.5');
//graph2 draw end
//graph3 draw start
vis3.append('svg:path')
    .attr('d', lineGen3(like_data))
    .attr('class','like_graph_line')
    .attr('stroke','#488ccb')
    .attr('stroke-width','2')
    .attr('fill','none');

vis3.append('svg:path')
    .attr('d', areaGen3(like_data))
    .attr('class','like_graph_area')
    .attr('stroke-width','0')
    .attr('fill','#488ccb')
    .attr('opacity','0.5');
//graph3 draw end
//////////////////draw graph line///////////////////
//////////////////datapoint start/////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GRAPH1 start
vis.selectAll("svg")
    .data(upload_data)
    .enter().append("circle")
    .attr('class', 'datapoint')
    .attr('cx', function(d,i) { return xScale(d.month); })
    .attr('cy', function(d,i) { return yScale(d.value); })
    .attr('r', 5)
    .attr('index', function(d,i){ return i})
    .attr('fill', 'white')
    .attr('stroke', '#48cfad')
    .attr('stroke-width', '1')
    
    .on('mouseover', function(){//mouse_over event
        d3.select(this).transition()//animation for circle
            .delay(0)
            .duration(300)
            .attr('r',10);                     


            var value_both = d3.select('div.value');
            value_both.selectAll("p")
                .data(upload_data)
                .enter();            
            
            var cv = $(this).attr('index');//circles index(jQuery)
            
            $('.value_text').html(function() {
                if(cv==0){/////////////////////////////////////////////////////////////////// you should change to switch later//
                    return "<font size='18'>" + "2015-January" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[0].value + "</font>";
                }
                else if(cv==1){
                    return "<font size='18'>" + "2015-February" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[1].value + "</font>";
                }
                else if(cv==2){
                    return "<font size='18'>" + "2015-March" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[2].value + "</font>";
                }
                else if(cv==3){
                    return "<font size='18'>" + "2015-April" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[3].value + "</font>";
                }
                else if(cv==4){
                    return "<font size='18'>" + "2015-May" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[4].value + "</font>";
                }
                else if(cv==5){
                    return "<font size='18'>" + "2015-June" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[5].value + "</font>";
                }
                else if(cv==6){
                    return "<font size='18'>" + "2015-July" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[6].value + "</font>";
                }
                else if(cv==7){
                    return "<font size='18'>" + "2015-August" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[7].value + "</font>";
                }
                else if(cv==8){
                    return "<font size='18'>" + "2015-September" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[8].value + "</font>";
                }
                else if(cv==9){
                    return "<font size='18'>" + "2015-October" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[9].value + "</font>";
                }
                else if(cv==10){
                    return "<font size='18'>" + "2015-November" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[10].value + "</font>";
                }
                else if(cv==11){
                    return "<font size='18'>" + "2015-December" + "</font>" + "<br>" + "Contents : <font color='#48cfad'>" + upload_data[11].value + "</font>";
                }
            });

        var tooltipX = $(this).offset().left + 10;///circle X = tooltip_X
        var tooltipY = $(this).offset().top + 10;////circle Y = tooltip_Y

        $('#tooltip').css('top',tooltipY);
        $('#tooltip').css('left',tooltipX);

        $('#tooltip').stop().fadeIn(200);
    })

    
    .on('mouseout', function(){//mouse_out event
         d3.select(this).transition()
            .delay(0)
            .duration(500)
            .attr('r',5);

        $('#tooltip').stop().fadeOut(200);

    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GRAPH1 end
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GRAPH2 start
vis2.selectAll("svg")
    .data(download_data)
    .enter().append("circle")
    .attr('class', 'datapoint')
    .attr('cx', function(d,i) { return xScale(d.month); })
    .attr('cy', function(d,i) { return yScale2(d.value); })
    .attr('r', 5)
    .attr('index', function(d,i){ return i})
    .attr('fill', 'white')
    .attr('stroke', '#ffbe54')
    .attr('stroke-width', '1')
    
    .on('mouseover', function(){//mouse_over event
        d3.select(this).transition()//animation for circle
            .delay(0)
            .duration(300)
            .attr('r',10);                     


            var value_both = d3.select('div.value');
            value_both.selectAll("p")
                .data(download_data)
                .enter();            

            var cv = $(this).attr('index');//circles index(jQuery)
            
            $('.value_text').html(function() {
                if(cv==0){/////////////////////////////////////////////////////////////////// you should change to switch later//
                    return "<font size='18'>" + "2015-January" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[0].value + "</font>";
                }
                else if(cv==1){
                    return "<font size='18'>" + "2015-February" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[1].value + "</font>";
                }
                else if(cv==2){
                    return "<font size='18'>" + "2015-March" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[2].value + "</font>";
                }
                else if(cv==3){
                    return "<font size='18'>" + "2015-April" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[3].value + "</font>";
                }
                else if(cv==4){
                    return "<font size='18'>" + "2015-May" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[4].value + "</font>";
                }
                else if(cv==5){
                    return "<font size='18'>" + "2015-June" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[5].value + "</font>";
                }
                else if(cv==6){
                    return "<font size='18'>" + "2015-July" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[6].value + "</font>";
                }
                else if(cv==7){
                    return "<font size='18'>" + "2015-August" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[7].value + "</font>";
                }
                else if(cv==8){
                    return "<font size='18'>" + "2015-September" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[8].value + "</font>";
                }
                else if(cv==9){
                    return "<font size='18'>" + "2015-October" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[9].value + "</font>";
                }
                else if(cv==10){
                    return "<font size='18'>" + "2015-November" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[10].value + "</font>";
                }
                else if(cv==11){
                    return "<font size='18'>" + "2015-December" + "</font>" + "<br>" + "Contents : <font color='#ffbe54'>" + download_data[11].value + "</font>";
                }
            });

        var tooltipX = $(this).offset().left + 10;///circle X = tooltip_X
        var tooltipY = $(this).offset().top + 10;////circle Y = tooltip_Y

        $('#tooltip').css('top',tooltipY);
        $('#tooltip').css('left',tooltipX);

        $('#tooltip').stop().fadeIn(200);

    })

    
    .on('mouseout', function(){//mouse_out event
         d3.select(this).transition()
            .delay(0)
            .duration(500)
            .attr('r',5);

        $('#tooltip').stop().fadeOut(200);

    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GRAPH2 end
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GRAPH3 start
vis3.selectAll("svg")
    .data(like_data)
    .enter().append("circle")
    .attr('class', 'datapoint')
    .attr('cx', function(d,i) { return xScale(d.month); })
    .attr('cy', function(d,i) { return yScale3(d.value); })
    .attr('r', 5)
    .attr('index', function(d,i){ return i})
    .attr('fill', 'white')
    .attr('stroke', '#488ccb')
    .attr('stroke-width', '1')
    
    .on('mouseover', function(){//mouse_over event
        d3.select(this).transition()//animation for circle
            .delay(0)
            .duration(300)
            .attr('r',10);                     


            var value_both = d3.select('div.value');
            value_both.selectAll("p")
                .data(like_data)
                .enter();            
            
            var cv = $(this).attr('index');//circles index(jQuery)
            
            $('.value_text').html(function() {
                if(cv==0){/////////////////////////////////////////////////////////////////// you should change to switch later//
                    return "<font size='18'>" + "2015-January" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[0].value + "</font>";
                }
                else if(cv==1){
                    return "<font size='18'>" + "2015-February" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[1].value + "</font>";
                }
                else if(cv==2){
                    return "<font size='18'>" + "2015-March" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[2].value + "</font>";
                }
                else if(cv==3){
                    return "<font size='18'>" + "2015-April" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[3].value + "</font>";
                }
                else if(cv==4){
                    return "<font size='18'>" + "2015-May" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[4].value + "</font>";
                }
                else if(cv==5){
                    return "<font size='18'>" + "2015-June" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[5].value + "</font>";
                }
                else if(cv==6){
                    return "<font size='18'>" + "2015-July" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[6].value + "</font>";
                }
                else if(cv==7){
                    return "<font size='18'>" + "2015-August" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[7].value + "</font>";
                }
                else if(cv==8){
                    return "<font size='18'>" + "2015-September" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[8].value + "</font>";
                }
                else if(cv==9){
                    return "<font size='18'>" + "2015-October" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[9].value + "</font>";
                }
                else if(cv==10){
                    return "<font size='18'>" + "2015-November" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[10].value + "</font>";
                }
                else if(cv==11){
                    return "<font size='18'>" + "2015-December" + "</font>" + "<br>" + "Contents : <font color='#488ccb'>" + like_data[11].value + "</font>";
                }
            });

        var tooltipX = $(this).offset().left + 10;///circle X = tooltip_X
        var tooltipY = $(this).offset().top + 10;////circle Y = tooltip_Y

        $('#tooltip').css('top',tooltipY);
        $('#tooltip').css('left',tooltipX);

        $('#tooltip').stop().fadeIn(200);
    })

    
    .on('mouseout', function(){//mouse_out event
         d3.select(this).transition()
            .delay(0)
            .duration(500)
            .attr('r',5);

        $('#tooltip').stop().fadeOut(200);

    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GRAPH3 end
//////////////////datapoint end///////////////////////
