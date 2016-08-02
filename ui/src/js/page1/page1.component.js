;(function (angular) {
  "use strict";

  angular.module("page1")
         .component("page1", {

           "templateUrl": "/js/page1/page1.html",
           "controller": ['$http',

           function ($http) {

             var self = this;
             var from_to = '/api/from_to/?'
             var someDate = new Date();
             var fi_dd = someDate.getDate();
             var fi_mm = someDate.getMonth() + 1;
             var fi_y = someDate.getFullYear();
             var firstDate = fi_y + '-' + fi_mm + '-' + fi_dd;
             var numberOfDaysToSub = 7;
             someDate.setDate(someDate.getDate() - numberOfDaysToSub);
             var la_dd = someDate.getDate();
             var la_mm = someDate.getMonth() + 1;
             var la_y = someDate.getFullYear();
             var lastDate = la_y + '-' + la_mm + '-' + la_dd;
             //lastDate = '2016-7-1';
             //firstDate = '2016-7-14';

             console.log(firstDate);
             console.log(lastDate);

             $http.get(from_to + 'from=' + lastDate + '&to=' + firstDate).success(
                    function(data, status)
                    {
                        console.log('Sucess');
                    }).error(function(error){ console.log("error")});

             var from_to_data = from_to + 'from=' + lastDate + '&to=' + firstDate;
             $http({method:"GET", url:from_to_data}).success(function(result){
                    self.high_data_pre = [];
                    var final_data = result.result;
                    //console.log(final_data);
                    self.high_data_pre.push(final_data);
                    //console.log(self.high_data_pre);
          angular.extend(self.chartOptions, {
               chart : {
                 backgroundColor: "transparent"
               },
               xAxis: {
                 categories: self.high_data_pre[0].data.date,
                 title: {
                  text: '',
                 }
               },

               yAxis: {
                min: 0,
                title: {
                 text: 'per day achieved',
                 align: 'high'
                },
                labels: {
                 overflow: 'justify'
                }
               },

               tooltip: {
                valueSuffix: ''
               },

               plotOptions: {
                bar: {
                 dataLabels: {
                 enabled: true
                 }
                }
               },

               credits: {
                enabled: false
               },

               series: [{
                name: 'DD',
                data: self.high_data_pre[0].data.data.DD
                }, {
                name: 'DF',
                data: self.high_data_pre[0].data.data.DF
                }, {
                name: 'CC',
                data: self.high_data_pre[0].data.data.CC
                }]
             });
           angular.extend(self.chartOptions2, {
         chart: {
            type: 'bar',
            backgroundColor: "transparent"
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: self.high_data_pre[0].volumes_data.volume_type,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'total achieved',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
       plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            //backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'package',
            data: [self.high_data_pre[0].volumes_data.volume_values.DD, self.high_data_pre[0].volumes_data.volume_values.DF,
            self.high_data_pre[0].volumes_data.volume_values.CC,self.high_data_pre[0].volumes_data.volume_values.GC]
        }]
             });
                    });

            self.check = function() {
                self.high_data = [];
                var dateEntered = document.getElementById('select').value
                var from = dateEntered.split('to')[0].replace(' ','');
                var to = dateEntered.split('to')[1].replace(' ','');
                $http.get(from_to + 'from=' + from + '&to=' + to).success(
                    function(data, status)
                    {
                        console.log('Sucess');
                    }).error(function(error){ console.log("error")});
                var from_to_data = from_to + 'from=' + from + '&to=' + to
                console.log(from_to_data);
                $http({method:"GET", url:from_to_data}).success(function(result){
                    var final_data = result.result;
                    self.high_data.push(final_data);
                    console.log(self.high_data[0].volumes_data.volume_type);
           angular.extend(self.chartOptions, {
               chart: {
                 backgroundColor: "transparent"
               },
               xAxis: {
                 categories: self.high_data[0].data.date,
                 title: {
                  text: null
                 }
               },

               yAxis: {
                min: 0,
                title: {
                 text: '',
                 align: 'high'
                },
                labels: {
                 overflow: 'justify'
                }
               },

               tooltip: {
                valueSuffix: ''
               },

               plotOptions: {
                bar: {
                 dataLabels: {
                 enabled: true
                 }
                }
               },

               credits: {
                enabled: false
               },

               series: [{
                name: 'DD',
                data: self.high_data[0].data.data.DD
                }, {
                name: 'DF',
                data: self.high_data[0].data.data.DF
                }, {
                name: 'CC',
                data: self.high_data[0].data.data.CC
                }]
             });
           angular.extend(self.chartOptions2, {
         /*chart: {
            type: 'bar'
        },*/
         chart : {
                 backgroundColor: "transparent",
                 type: 'bar'
               },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: self.high_data[0].volumes_data.volume_type,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'total achieved',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
       plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        /*legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },*/
        credits: {
            enabled: false
        },
        series: [{
            name: 'Past Week',
            data: [self.high_data[0].volumes_data.volume_values.CC, self.high_data[0].volumes_data.volume_values.DF, self.high_data[0].volumes_data.volume_values.DD,self.high_data[0].volumes_data.volume_values.GC]
        }]
             });
                });

            }

            self.chartOptions = {};
            self.chartOptions2 = {};
            self.chartOptions3 = {
            chart: {
            type: 'column',
            backgroundColor: "transparent"
                },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'errors'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Population',
            data: [
                ['DF', 23],
                ['DD', 16],
                ['DC', 14],
                ['FF', 14],
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
            };
            self.chartOptions4 = {
                    chart: {
            type: 'column',
            backgroundColor: "transparent"
                    },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'In percentage'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'DF',
                y: 56.33,

            }, {
                name: 'DD',
                y: 24.03,

            }, {
                name: 'CC',
                y: 10.38,

            }, {
                name: 'GC',
                y: 4.77,

            } ]
        }],
        drilldown: {
            series: [ ]
        }
            }
            self.hideLoading();

            }],

            "bindings": {

              "hideLoading": "&",
              "showLoading": "&"
            }
         });

}(window.angular));
