const btns=document.querySelectorAll('.buttons button');
const imgs=document.querySelectorAll('.images img');

for(let i=1;i< btns.length;i++)
{
    btns[i].addEventListener('click', filterImg);
}
function setActiveBtn(e){
    btns.forEach(btn=>{
        btn.classList.remove('btn-clicked');
    });
    e.target.classList.add('btn-clicked');
}
function filterImg(e){
    setActiveBtn(e);
    imgs.forEach(img=>{
        img.classList.remove('img-shrink');
        img.classList.add('img-expand');
        const imgType=parseInt(img.dataset.img);
        const btnType=parseInt(e.target.dataset.btn);
        if(imgType!==btnType){
            img.classList.remove('img-expand');
            img.classList.add('img-shrink');

        }
    });
}
btns[0].addEventListener('click', (e)=>{
    setActiveBtn(e);
    imgs.forEach(img=>{
        img.classList.remove('img-shrink');
        img.classList.add('img-expanded');
    });
});