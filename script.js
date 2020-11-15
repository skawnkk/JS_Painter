const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const workDisplay = document.getElementById("work_display");
const initial_color = "dimgray";
const canvasSize = 500;

canvas.width = canvasSize;
canvas.height = canvasSize;

let isDrawing = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasSize, canvasSize);

ctx.strokeStyle = initial_color;
ctx.fillStyle = initial_color;
ctx.lineWidth = 0.5;



function painting(){
    isDrawing = true;
}

function noPainting(){
    isDrawing = false;
}

function handleCanvasClick(){   
    if(filling===true){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
};

function handleLightBtn(event){
    event.preventDefault();
}


canvas.addEventListener('mousemove', e =>{
    const x = e.offsetX;
    const y = e.offsetY;

    if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});
canvas.addEventListener('mousedown', painting);
canvas.addEventListener('mouseup', noPainting);
canvas.addEventListener('click', handleCanvasClick)
canvas.addEventListener('contextmenu', handleLightBtn);


function handleColorChange(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if (filling === true){
        filling = false;
        mode.innerText="fill";
    }else{
        filling = true;
        mode.innerText="paint";
    }
}

function handleSaveClick(){
    const dataURL = canvas.toDataURL();
    const a_tag = document.createElement("a");
    a_tag.href=dataURL;
    a_tag.download='js_Painter';
    a_tag.click();

    const img = new Image();
    img.src=dataURL;
    img.width= 100;
    img.height=100;
    img.classList.add("image");
    
    workDisplay.append(img);
    console.log(img);
}

Array.from(colors).forEach(color =>
color.addEventListener("click",handleColorChange))

    //pickColor in whole window.

if(range){
    range.addEventListener("input",handleRangeChange)
}

if(mode){
    mode.addEventListener("click",handleModeClick)
}

if(save){
    save.addEventListener("click",handleSaveClick)
}