document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("openingGate");
  const openButton = document.getElementById("openInvitation");
  function openInvitation(){
    if(!gate || gate.classList.contains("opened")) return;
    gate.classList.add("opened");
    setTimeout(()=>{document.body.classList.remove("intro-lock");window.scrollTo({top:0,behavior:"auto"});},720);
    setTimeout(()=>gate.setAttribute("aria-hidden","true"),1500);
  }
  if(openButton) openButton.addEventListener("click",openInvitation);
  if(gate) gate.addEventListener("click",e=>{if(e.target.closest(".seal-button")) return;openInvitation();});
  document.querySelectorAll(".scroll-cue").forEach(button=>button.addEventListener("click",()=>{
    const target=document.querySelector(button.dataset.next);if(target)target.scrollIntoView({behavior:"smooth",block:"start"});
  }));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("visible",entry.isIntersecting)),{threshold:.22});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  document.querySelectorAll(".depth-layer").forEach(layer=>{
    layer.addEventListener("pointermove",event=>{const r=layer.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;layer.style.transform=`perspective(800px) rotateX(${y*-7}deg) rotateY(${x*9}deg) translateZ(14px)`;});
    layer.addEventListener("pointerleave",()=>layer.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)");
  });
  const shareButton=document.getElementById("shareButton");
  if(shareButton) shareButton.addEventListener("click",async()=>{
    const shareData={title:"कुडिकला परिवार | श्री गणेशोत्सव २०२६",text:"कुडिकला परिवाराच्या घरी लाडक्या बाप्पाचे १४ सप्टेंबर २०२६ रोजी २ दिवसांसाठी मंगल आगमन होत आहे. श्रींच्या दर्शनासाठी आपण कुटुंबियांसह आवर्जून उपस्थित राहावे.",url:window.location.href};
    try{if(navigator.share){await navigator.share(shareData);}else if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(window.location.href);alert("निमंत्रणाची लिंक कॉपी झाली आहे.");}else{alert("कृपया वेबसाइटची लिंक कॉपी करून शेअर करा.");}}catch(error){console.log("Share cancelled:",error);}
  });
});
