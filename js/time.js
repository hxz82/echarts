//获取表格中的数据
function getTable(){
    var mytable = document.getElementById("time");
    var rows=mytable.rows.length;
    var data = [];
    for(var i=0;i<rows; i++){
        for(var j=0,cells=mytable.rows[i].cells.length; j<cells; j++){
            if(!data[j]){
                data[j] = new Array();
            }
            data[j][i] = mytable.rows[i].cells[j].innerHTML;
        }
    }
    return data;
}
//X轴数据
function getTime(){
    var data=getTable();
    var tname=data[1].slice(1,data[1].length);
    return tname;
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
//生成折线图数据
function lineData(){
    var data=getTable();
    var num=remove();
    var sers=[];
    for(var i=0;i<data.length;i++){
        if(i>=2){
            sers.push({
                name:data[i][0],
                type:"line",
                data:num[i].slice(1,num[i].length)
            })
        }
    }
    return sers
}
//图例名称
function legend(){
    var end=[];
    var data=getTable();
    for(var i=0;i<data.length;i++){
        if(i>=2){
            end.push(data[i][0])
        }
    }
    return end;
}


//图例选中状态
function legendChose(){
    var chose={};
    var data=getTable();
    for(var i=0;i<data.length;i++){
        if(i>=2){
            chose[data[i][0]]=false;
            chose[data[2][0]]=true;
        }
    }
    return chose;
}

//折线图
$("#sel_time").change(function(){
    if(this.value=="xian"){
        $("#main_2").css("display","block")
        $("#time").css("display","none")
        var myChart2 = echarts.init(document.getElementById('main_2'));
        option = {
            title: {
                text: ''
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
                selected:legendChose()
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data:getTime()
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series:lineData()
        }
        myChart2.setOption(option);
        window.onresize = myChart2.resize;
    }else if(this.value=="table"){
        $("#main_2").css("display","none");
        $("#time").css("display","block")
    }
})
