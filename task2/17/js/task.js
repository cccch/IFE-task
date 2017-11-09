/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表(day)
 */
function dayChart(city) {
    var ul = document.getElementById('ul');
    ul.innerHTML = '';
    var i = 0;
    for(let k in aqiSourceData[city]){
        let li = document.createElement('li');
        //li.style.transition = '0.2s 1s';
        //li.style.height = aqiSourceData[city][k] + 'px';
        //li.style.left = i*18+'px';
        //li.style.width = 10+'px';
        //li.style.backgroundColor = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
        //li.title = city+k+':'+aqiSourceData[city][k];
        //i++;
        ul.appendChild(li);
        //添加transition必须先添加dom元素并且结束进程，重新渲染
        setTimeout(function(){
            li.style.transition = '0.2s 1s';
            li.style.height = aqiSourceData[city][k] + 'px';
            li.style.left = i*18+'px';
            li.style.width = 10+'px';
            li.style.backgroundColor = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
            li.title = city+k+':'+aqiSourceData[city][k];
            i++;
        },0)



        //for(var i=0;i<30;i++){
        //    i1 = i+1;
        //    var li = document.createElement('li');
        //    li.style.height = aqiSourceData["北京"]["2016-01-"+(i1<10?'0'+i1:i1)]+"px";
        //    li.style.left = i*20+'px';
        //    ul.appendChild(li);
        //}
    }
}
//渲染图表(week)
function weekchart(city){
    var ul = document.getElementById('ul');
    ul.innerHTML = '';
    var i = 1;
    var avg = 0;
    var j = 0;
    for(let k in aqiSourceData[city]){
        avg += aqiSourceData[city][k]
        if(j%7==0&&j!=0){
            let li = document.createElement('li');
            ul.appendChild(li);
            //添加transition必须先添加dom元素并且结束进程，重新渲染
            (function(avg){
                setTimeout(function(){
                    console.log(avg);
                    li.style.height = Math.ceil(avg/7) + 'px';
                    li.style.left = i*120+'px';
                    li.style.width = 40+'px';
                    li.style.backgroundColor = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
                    li.title = city+'第'+i+'周'+':'+Math.ceil(avg/7);
                    i++;
                },0)
            }(avg))
            avg = 0;
        }
        j++
    }
}




//渲染图表(month)
function monthchart(city){
    var ul = document.getElementById('ul');
    ul.innerHTML = '';
    var i = 1;
    var avg = 0;
    var j = 0;
    for(let k in aqiSourceData[city]){
        avg += aqiSourceData[city][k]
        if(j%30==0&&j!=0){
            let li = document.createElement('li');
            ul.appendChild(li);
            //添加transition必须先添加dom元素并且结束进程，重新渲染
            (function(avg){
                setTimeout(function(){
                    li.style.height = Math.ceil(avg/30) + 'px';
                    li.style.left = i*300+'px';
                    li.style.width = 80+'px';
                    li.style.backgroundColor = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
                    li.title = city+'第'+i+'月'+':'+Math.ceil(avg/30);
                    i++;

                },0)
            })(avg)
            avg = 0;
        }
        j++
    }
}

/**
 * 日、周、月的radio事件点击时的事件注册函数
 */
function graTimeChange(){
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    var radio = document.querySelectorAll('#form-gra-time input');
    for(var i=0;i<radio.length;i++){
        radio[i].addEventListener('change',function(){
            var select = document.getElementById('city-select');
            var city = select.value;
            if(this.value == 'day'){
                dayChart(city)
            }
            if(this.value == 'week'){
                weekchart(city)
            }
            if(this.value == 'month'){
                monthchart(city)
            }

        })
    }}



/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var select = document.getElementById('city-select');
    var radio = document.querySelectorAll('#form-gra-time input');
    // 设置对应数据

    // 调用图表渲染函数
    select.addEventListener('change',function(){
    for(var k in aqiSourceData){
        if(this.value == k){
            if(radio[0].checked){
                dayChart(k)
            }
            if(radio[1].checked){
                weekchart(k)
            }
            if(radio[2].checked){
                monthchart(k)
            }
        }
        }
        //console.log(this.value);

    })
}


/**
 * 初始化函数
 */
function init() {
    graTimeChange()
    citySelectChange();
    dayChart('北京');
}

init();
