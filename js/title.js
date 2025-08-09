const titleText="markovich";let index=0;function typeTitle(){index<titleText.length?(document.title+=titleText[index],index++,setTimeout(typeTitle,300)):setTimeout(()=>{document.title="",index=0,typeTitle()},2e3)}typeTitle();const additionalCSS=`
.timeline {
    position: relative;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    cursor: pointer;
    overflow: visible;
    transition: height 0.2s ease;
}

.timeline:hover {
    height: 8px;
}

.timeline-progress {
    height: 100%;
    background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.8));
    border-radius: inherit;
    transition: all 0.3s ease;
    position: relative;
}

.timeline-thumb {
    position: absolute;
    top: 50%;
    right: -8px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    transform: translateY(-50%) scale(0);
    cursor: grab;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 10;
}

.timeline-thumb:active {
    cursor: grabbing;
    transform: translateY(-50%) scale(1.2);
}

.timeline:hover .timeline-thumb {
    transform: translateY(-50%) scale(1);
}

.timeline-thumb.dragging {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

@keyframes popIn {
    0% {
        transform: translateY(-50%) scale(0);
    }
    50% {
        transform: translateY(-50%) scale(1.2);
    }
    100% {
        transform: translateY(-50%) scale(1);
    }
}

.timeline-thumb.pop-in {
    animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
`;function addTimelineStyles(){let e=document.createElement("style");e.textContent=additionalCSS,document.head.appendChild(e)}function initializeInteractiveTimeline(){addTimelineStyles();let e=document.querySelector(".timeline"),t=document.querySelector(".timeline-progress"),i=document.querySelector(".audioPlayer"),n=document.querySelector(".current-time"),a=document.querySelector(".total-time");if(!e||!t||!i){console.error("Elementos da timeline n\xe3o encontrados");return}let r=document.createElement("div");r.className="timeline-thumb",t.appendChild(r);let o=!1,l=!1,s=null;function d(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}function u(){if(!o&&i.duration){let e=i.currentTime/i.duration*100;t.style.width=`${e}%`,n.textContent=d(i.currentTime)}i.paused||(s=requestAnimationFrame(u))}function c(t){let i=e.getBoundingClientRect(),n=t.type.includes("touch")?t.touches[0].clientX:t.clientX,a=(n-i.left)/i.width;return Math.max(0,Math.min(1,a))}function $(e){if(i.duration){let a=e*i.duration;i.currentTime=a,t.style.width=`${100*e}%`,n.textContent=d(a)}}function m(e){o=!0,r.classList.add("dragging"),document.body.style.userSelect="none",e.preventDefault();let t=c(e);$(t)}function p(e){if(!o)return;e.preventDefault();let t=c(e);$(t)}function f(){o&&(o=!1,r.classList.remove("dragging"),document.body.style.userSelect="",i.paused||(s=requestAnimationFrame(u)))}e.addEventListener("mouseenter",()=>{l||(r.classList.add("pop-in"),l=!0,setTimeout(()=>{r.classList.remove("pop-in")},400))}),e.addEventListener("click",e=>{if(!o){let t=c(e);$(t)}}),r.addEventListener("mousedown",m),e.addEventListener("mousedown",i=>{(i.target===e||i.target===t)&&m(i)}),document.addEventListener("mousemove",p),document.addEventListener("mouseup",f),r.addEventListener("touchstart",m,{passive:!1}),e.addEventListener("touchstart",i=>{(i.target===e||i.target===t)&&m(i)},{passive:!1}),document.addEventListener("touchmove",p,{passive:!1}),document.addEventListener("touchend",f),i.addEventListener("loadedmetadata",()=>{a.textContent=d(i.duration)}),i.addEventListener("play",()=>{s&&cancelAnimationFrame(s),s=requestAnimationFrame(u)}),i.addEventListener("pause",()=>{s&&(cancelAnimationFrame(s),s=null)}),window.addEventListener("beforeunload",()=>{s&&cancelAnimationFrame(s)}),console.log("Timeline interativa inicializada com sucesso!")}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",initializeInteractiveTimeline):initializeInteractiveTimeline();
