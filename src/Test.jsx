import React from 'react'

export default function Test() {
    console.log("chali raxa");
  return (
    <div>
      <div className='relative'>
      <div class="custom-shape-divider-bottom-1737538376">
        <p className='text-black'>ffdf</p>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">

        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div>
      </div>

      <style jsx>{`
       .typing-dots {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100%; 
}

.dot {
  font-size: 2rem;
  margin: 0 2px;
  animation: blink 2s infinite; 
}

.dot:nth-child(2) {
  animation-delay: 0.4s; 
}

.dot:nth-child(3) {
  animation-delay: 0.8s; 
}

@keyframes blink {
  0%, 33% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
  .custom-shape-divider-bottom-1737538376 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1737538376 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 150px;
}

.custom-shape-divider-bottom-1737538376 .shape-fill {
    fill: #000000;
}


      `}</style>
    </div>
  )
}
