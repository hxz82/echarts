//获取表格中的数据
function getTable(){
    var mytable = document.getElementById("box");
    var rows=mytable.rows.length;
    var data = [];
    var title =[];
    for(var i=0;i<rows; i++){
        for(var j=0,cells=mytable.rows[i].cells.length; j<cells; j++){
            if(!data[j]){
                data[j] = new Array();
            }
            if(i==0&&j>=3){
                title.push(mytable.rows[i].cells[j].innerHTML);
            }

            data[j][i]= mytable.rows[i].cells[j].innerHTML;
        }
    }
    return data;
}

//X轴数据
function getCname(){
    var data=getTable();
    var cname=data[1].slice(1,data[1].length);
    return cname;
}

//去除百分号
function remove(){
    var num=[];
    var data=getTable();
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data[i].length;j++){
            if(!num[i]){
                num[i] = new Array();
            }
            num[i][j]=parseFloat(data[i][j])
        }
    }
    return num;
}
//条形图数据
function barData(){
    var sers=[]
    var data=getTable();
    var num=remove();
    for(var i=0;i<data.length;i++){
        if(i>=3){
            sers.push({
                name:data[i][0],
                type:"bar",
                data:num[i].slice(1,num[i].length)
            })
        }
    }
    return sers;
}
//图例名称
function legend(){
    var end=[];
    var data=getTable();
    for(var i=0;i<data.length;i++){
        if(i>=3){
           end.push(data[i][0])
        }
    }
    return end;
}

// 图例选中状态
function legendData(){
    var chose={};
    var data=getTable();
    for(var i=0;i<data.length;i++){
        if(i>=3){
            chose[data[i][0]]=false;
            chose[data[3][0]]=true;
        }
    }
    return chose;
}

//表格 统计图切换
$("#sel").on("change",function(){
    if(this.value=="tu"){
        var height=$(document).height();
        $(".cover").css("height",height);
        $("#box").css("display","none");
        $(".tu").css("display","block");
        //条形图
        var myChart2 = echarts.init(document.getElementById('main_2'));
        option = {
            title: {
                text: '汇总报表'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                data:legend(),
                left:150,
                selected:legendData()

            },
            grid: {
                left: '3%',
                bottom: 70
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 65,
                    end: 85
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 65,
                    end: 85
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    interval:0,
                    boundaryGap: true,
                    axisLabel:{
                        interval:0,
                        rotate:40
                    },
                    data:getCname()
                },
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series:barData()
        }

        myChart2.setOption(option);
        window.onresize = myChart2.resize;
    }else if(this.value=="table"){
        var height=$(document).height();
        $(".cover").css("height",height);
        $("#box").css("display","block");
        $(".tu").css("display","none");

    }
})

//关闭饼图
$(".cover>div>a").click(function(){
    $(".cover").fadeOut();
})
//饼图
$(function(){
    $("#box>thead>tr>th:eq(0),#box>thead>tr>th:eq(1),#box>thead>tr>th:eq(2)").unbind("click")
})

$("#box>thead>tr>th").click(function(){
    var height=$(document).height();
    $(".cover").css("height",height);
    $(".cover").css("display","block");
    $("#bing").css("display","block");
    var idx=$(this).index();
    var data=getTable();
    var cname=getCname();
    var bdata=data[idx].slice(1,data[idx].length);
    var bdata_pbj=[];
    for(var i=0;i<bdata.length&cname.length;i++){
        bdata_pbj.push({value:parseFloat(bdata[i]),name:cname[i]})
    }
    var myChart1 = echarts.init(document.getElementById('bing'));
    option = {
        title :{
            text: data[idx-0][0],
            x:'center'
        },
        tooltip :{
            trigger: 'item'
        },
        legend:{
            orient: 'vertical',
            left: 'left',
            top:100,
            data:data[1].slice(1,data[1].length)
        },
        series : [
            {
                type: 'pie',
                radius : '55%',
                center: ['65%', '55%'],
                data:bdata_pbj,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart1.setOption(option);
    window.onresize = myChart1.resize;
})
