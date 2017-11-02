/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var aqiData = {};

/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input');
    var value = document.getElementById('aqi-value-input');
    city.value = city.value.replace(/^\s*|\s*$/,'');
    value.value = value.value.replace(/^\s*|\s*$/,'');
    console.log(JSON.stringify(aqiData));

    if(!/^[\u4e00-\u9fa5A-Za-z]+$/.test(city.value)||city.value == ''){
        alert('�������ֱ���Ϊ��ĸ������')
        return false;
    }
    if(!/^\d+$/.test(value.value||value.value == '')){
        alert('ָ������Ϊ����')
        return false;
    }
    aqiData[city.value] = value.value;
}

/**
 * ��Ⱦaqi-table���
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    if(JSON.stringify(aqiData)!='{}') {
        table.innerHTML = '';
        //table.innerHTML += '<tr>'
        table.innerHTML += '<td>����</td><td>��������</td><td>����</td>'
        //table.innerHTML += '</tr>'
        for(var k in aqiData){
            //table.innerHTML += '<tr>'
            table.innerHTML += '<td>'+k+'</td><td>'+aqiData[k]+'</td><td>ɾ��</td>'
            //table.innerHTML += '</tr>'
        }
    }
}

/**
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
 */
function delBtnHandle() {
    // do sth.
    renderAqiList();
    var tr = document.querySelectorAll('#aqi-table tr');
    var del = document.querySelectorAll('#aqi-table tr td:nth-child(3)');
    //����һ
    //var index;
    //for(var i=1;i<del.length;i++){
    //    del[i].index = i;
    //    del[i].onclick = function(){
    //        tr[this.index].style.display = 'none';
    //    }
    //}


    //������

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

    // ���������add-btn��һ������¼������ʱ����addBtnHandle����

    // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����

}

init();
