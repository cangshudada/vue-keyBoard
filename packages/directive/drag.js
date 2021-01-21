const handleDrag = {
    bind(el) {
        el.onmousedown = e => {
            //算出鼠标相对元素的位置
            const disX = e.clientX - el.parentNode.offsetLeft;
            const disY = e.clientY - el.parentNode.offsetTop;

            document.onmousemove = e => {
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                const left = e.clientX - disX;
                const top = e.clientY - disY;

                //移动当前元素
                el.parentNode.style.left = left + 'px';
                el.parentNode.style.top = top + 'px';
            };
            document.onmouseup = e => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
}

export default handleDrag;