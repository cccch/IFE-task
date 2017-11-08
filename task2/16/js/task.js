/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input');
    var value = document.getElementById('aqi-value-input');
    city.value = city.value.replace(/^\s*|\s*$/,'');
    value.value = value.value.replace(/^\s*|\s*$/,'');
    console.log(JSON.stringify(aqiData));

    if(!/^[\u4e00-\u9fa5A-Za-z]+$/.test(city.value)||city.value == ''){
        alert('城市名字必须为字母或中文')
        return false;
    }
    if(!/^\d+$/.test(value.value||value.value == '')){
        alert('指数必须为整数')
        return false;
    }
    aqiData[city.value] = value.value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    if(JSON.stringify(aqiData)!='{}') {
        table.innerHTML = '';
        //table.innerHTML += '<tr>'
        table.innerHTML += '<td>城市</td><td>空气质量</td><td>操作</td>'
        //table.innerHTML += '</tr>'
        for(var k in aqiData){
            //table.innerHTML += '<tr>'
            table.innerHTML += '<td>'+k+'</td><td>'+aqiData[k]+'</td><td>删除</td>'
            //table.innerHTML += '</tr>'
        }
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    renderAqiList();
    var tr = document.querySelectorAll('#aqi-table tr');
    var del = document.querySelectorAll('#aqi-table tr td:nth-child(3)');
    //方法一
    //var index;
    //for(var i=1;i<del.length;i++){
    //    del[i].index = i;
    //    del[i].onclick = function(){
    //        tr[this.index].style.display = 'none';
    //    }
    //}


    //方法二

    for(var i=1;i<del.length;i++){
        //del[i].onclick = function(){
        //    fn(i)
        //}
        (function(i){
            del[i].addEventListener('click',function(){
                tr[i].style.display = 'none';
            })
        })(i)
    }

}

function init() {
    var btn = document.getElementById('add-btn');
    btn.onclick = function(){
        addBtnHandle();
        delBtnHandle();
    }

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
