const canvas = document.getElementById('jsCanvas'); //создаем объект canvas - это тег html для рисования
const ctx = canvas.getContext('2d'); // вызываем getContext - для рисования
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 700;

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH; //задали ширину и высоту канваса как в css

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_HEIGHT,CANVAS_WIDTH);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR; // задали по умолчанию цвет и ширину линии (как в html коде)
ctx.fillStyle = INITIAL_COLOR;

let painting = false; // задали переменную, которая хранит значение - рисуем ли мы в данный момент времени (по умолчанию - НЕТ)
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY; // получаем координаты, где двигается мышь
    if (!painting) { // если сейчас не находимся в режиме рисования (кнопка мыши не нажата) ...
        ctx.beginPath(); //...отслеживаем точку, где будет стартовая точка при рисовании
        ctx.moveTo(x, y);//...перемещаем стартовую точку в эти координаты
    } else { // если находимся в режиме рисования (нажата кнопка мыши) ...
        ctx.lineTo(x, y); //проводим линию к текущим координатам
        ctx.stroke(); // отрисовываем эту линию
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor; // сохраняем в переменную параметр backgroundColor
    ctx.strokeStyle = color; // в контекст записываем свойство
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handleModeClick(){
    if (filling === true) {
        filling = false;
        mode.innerText = "Filling";
    } else {
        filling = true;
        mode.innerText = "Painting";
    }
}

function handleCanvasClick(){
    if (filling) {
        ctx.fillRect(0,0,CANVAS_HEIGHT,CANVAS_WIDTH);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS [Export]";
    link.click();
}

if (canvas) { // при загрузке страницы проверяем, существует ли канвас, если да - обрабатываем далее события
    canvas.addEventListener('mousemove', onMouseMove); // если внутри канваса есть движение мыши - вызываем функцию onMouseMove, выше сама функция
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
} 

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick)); // собрали в массив нашу палитру, каждую кнопку сохранили в переменную color, задали обработчик клика по каждой кнопке цвета, и при клике вызывается функция handleColorClick

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}