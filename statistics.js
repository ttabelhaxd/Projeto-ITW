var Counter = [];
var Name = [];

$.ajax({
type: 'GET',
url: 'http://192.168.160.58/Olympics/api/statistics/Games_Athletes',
headers: {
'Content-Type': 'application/json'
},
success: function (data, status, xhr) {

var athData = data;

athData.forEach(element => {
Counter.push(element.Counter);
Name.push(element.Name);
});

createBarGraph(Counter, Name);

}
});

function createBarGraph(Counter, Name) {
let barChart = new Chart("myChart", {
type: "bar",
data: {
labels: Name,
datasets: [{
data: Counter,
label: 'Número de Atletas por jogo',
backgroundColor: ["#60a3bc", "#079992"]
}]
},
options:{

}
});
}
