document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".container"),t=document.querySelector(".music-container"),a=[e,t],n=document.createElement("style");n.textContent=`
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes moveUp {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(-60px);
            }
        }
    `,document.head.appendChild(n),a.forEach(e=>{e&&(e.style.boxShadow="0 10px 20px rgba(0,0,0,0.1)",e.style.zIndex="1",e.style.position="relative",e.style.willChange="transform",e.style.backfaceVisibility="hidden",e.style.transformStyle="preserve-3d",e.style.opacity="0")});let o=0,r=0,i=0,s=0,l=null,d=0,$=0;function c(){o+=(i-o)*.1,r+=(s-r)*.1,$+=(d-$)*.05,e&&(e.style.transform=`perspective(1000px) translateY(${$}px) rotateX(${r}deg) rotateY(${o}deg)`),t&&"1"===t.style.opacity&&(t.style.transform=`perspective(1000px) rotateX(${r}deg) rotateY(${o}deg)`),l=requestAnimationFrame(c)}function y(e){e&&e.addEventListener("mousemove",t=>{let a=e.getBoundingClientRect(),n=t.clientX-a.left,o=t.clientY-a.top,r=a.width/2,l=a.height/2;i=(n-r)/r*9,s=(o-l)/l*9,t.stopPropagation()})}function m(e){e&&e.addEventListener("mouseleave",()=>{i=0,s=0})}l=requestAnimationFrame(c),a.forEach(y),a.forEach(m),a.forEach(e=>{e&&e.addEventListener("mouseenter",e=>{e.stopPropagation()})}),document.body.addEventListener("click",()=>{e&&(e.style.animation="fadeIn 0.8s forwards",e.addEventListener("animationend",t=>{"fadeIn"===t.animationName&&(e.style.animation="",e.style.opacity="1")},{once:!0})),setTimeout(()=>{t&&(t.style.animation="fadeIn 0.8s forwards",t.addEventListener("animationend",e=>{"fadeIn"===e.animationName&&(t.style.animation="",t.style.opacity="1")},{once:!0})),e&&(d=-20)},2480)},{once:!0})});
