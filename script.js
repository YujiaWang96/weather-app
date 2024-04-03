//http://api.weatherapi.com/v1/current.json?key= 5e7d29ed9e3b4c18b9523217240204 &q=London&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

/*
流程：
1.首先api注册后复制api给的URL,新建一个函数fetchResult来传递这个URL，记得是异步async的函数，然后会返回一个response数据。具体解析成json还是xml看情况了。
2.通过把json数据打印到控制台上可以清晰看到结构，此时各类数据就能一清二楚了，获取所需的数据存在变量中。现在从服务器获取数据已经搞定了 
3.把html的各种元素注册进来，就是上面6个
4.我们现在获取数据搞定，元素注册好了。接下来就是一点击按键，就把获取的数据替换掉之前数据
5.注册个提交事件form.addEvenTListener,形式选择submit，方法新建searchForLocation，提交则执行此方法
6.创建searchForLocation方法：参数e，因为form里是submit方式，所以e也自动视为提交事件。e.preventDefault就会消除浏览器点击时自动刷新页面从而更新目标地区天气
方法里面调用fetchResult方法，传入输入框里的城市作为参数，从而获取了当地天气
7.新建方法update来把获取到的天气信息更新之前的html的值

总结流程：点击button进入Line26，执行searchLocation方法--- 这个方法不会刷新页面，会把输入的城市存到target，然后api方法fetchresult传入target，得到相应信息
信息会提取到各个变量，这些变量会通过updateDetail方法来替换之前的旧变量


*/
form.addEventListener('submit', searchForLocation)//Dom知识，form标签得到后，给add一个事件，事件是提交。提交的操作方法是执行searchforlocation。一submit后所有的temp，time，name就都得到了

//let target = 'Mumbai';
const fetchResult = async (targetLocation) =>{
    let url = `http://api.weatherapi.com/v1/current.json?key= 5e7d29ed9e3b4c18b9523217240204 &q=${targetLocation}&aqi=no`// 反引号，声明一个变量 url，包含了天气 API 的请求链接
    const res = await fetch(url) // 发送一个异步请求到指定的 API 链接，并使用 await 等待 Promise 对象的解析,得到的res是response数据
    const data = await res.json(); //用await来等待数据完全从response解析成json，否则解析不完全，还是response数据
    console.log(data)

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp,locationName,time,condition);
}

function updateDetails(temp,locationName, time, condition) {

    let splitDate = time.split(' ')[0]; //得到字符串形式的xxxx-XX-XX年月日
    let splitTime = time.split(' ')[1];  //字符串形式的小时分钟
    let currentDay = getDayName(new Date(splitDate).getDay()) //把字符串年月日生成对象，再用getDay返回一个0-6的数字表示当天的星期数，0为周日

    temperatureField.innerText = `${temp}°c`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}


function searchForLocation(e) {  
    e.preventDefault()
    let target = searchField.value
    fetchResult(target)
}

function getDayName(number) {
    switch (number){
        case 0:{
            return 'Sunday'
            break;
        }
        case 1:{
            return 'Monday'
            break;
        }
        case 2:{
            return 'Tuesday'
            break;
        }
        case 3:{
            return 'Wednesday'
            break;
        }
        case 4:{
            return 'Thursday'
            break;
        }
        case 5:{
            return 'Friday'
            break;
        }
        case 6:{
            return 'Saturday'
            break;
        }

    }
}

//fetchResult(target)