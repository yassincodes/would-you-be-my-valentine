import React, { useState, useRef } from 'react';

const Valentine = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noBtnRef = useRef(null);

  const handleYesClick = () => {
    setShowSuccess(true);
    createConfetti();
  };

  const moveNoButton = () => {
    if (!noBtnRef.current) return;

    const buttonRect = noBtnRef.current.getBoundingClientRect();

    // Small random distance (80-150px)
    const distance = Math.random() * 70 + 80;
    const angle = Math.random() * Math.PI * 2;

    const newX = buttonRect.left + Math.cos(angle) * distance;
    const newY = buttonRect.top + Math.sin(angle) * distance;

    // Keep button on screen with padding
    const clampedX = Math.max(10, Math.min(newX, window.innerWidth - 120));
    const clampedY = Math.max(10, Math.min(newY, window.innerHeight - 50));

    setNoButtonPos({ x: clampedX, y: clampedY });
  };

  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';

      const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb'];
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

      document.body.appendChild(confetti);

      const duration = Math.random() * 3 + 2;
      const drift = (Math.random() - 0.5) * 400;

      confetti.animate(
        [
          { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
          {
            transform: `translateY(${window.innerHeight}px) translateX(${drift}px) rotate(720deg)`,
            opacity: 0,
          },
        ],
        {
          duration: duration * 1000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }
      );

      setTimeout(() => confetti.remove(), duration * 1000);
    }
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Quicksand:wght@400;600&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Quicksand', sans-serif;
      background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #fff5fb 100%);
      min-height: 100vh;
    }

    .valentine-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    .heart-float {
      position: fixed;
      font-size: 2rem;
      opacity: 0.3;
      animation: float 6s infinite ease-in-out;
      pointer-events: none;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
      50% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
    }

    .content-box {
      background: white;
      border-radius: 30px;
      padding: 60px;
      text-align: center;
      box-shadow: 0 20px 80px rgba(255, 105, 180, 0.15);
      max-width: 600px;
      width: 90%;
      animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      z-index: 10;
    }

    @keyframes popIn {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .title {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #ff1493;
      margin-bottom: 10px;
      letter-spacing: -1px;
    }

    .question {
      font-size: 1.8rem;
      color: #d946a6;
      margin-bottom: 40px;
      font-weight: 600;
    }

    .emoji {
      font-size: 4rem;
      margin: 30px 0;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    .buttons-container {
      display: flex;
      gap: 30px;
      justify-content: center;
      margin-top: 50px;
      flex-wrap: wrap;
      position: relative;
      z-index: 5;
    }

    .btn {
      padding: 15px 50px;
      font-size: 1.2rem;
      font-family: 'Quicksand', sans-serif;
      font-weight: 600;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .btn-yes {
      background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(255, 20, 147, 0.3);
    }

    .btn-yes:hover {
      transform: scale(1.1);
      box-shadow: 0 15px 40px rgba(255, 20, 147, 0.4);
    }

    .btn-yes:active {
      transform: scale(0.95);
    }

    .btn-no {
      background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      position: fixed;
      z-index: 20;
    }

    .btn-no:hover {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
    }

    .success-message {
      text-align: center;
    }

    .success-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      color: #ff1493;
      margin-bottom: 20px;
    }

    .success-emoji {
      font-size: 5rem;
      margin: 30px 0;
    }

    .success-text {
      font-size: 1.3rem;
      color: #666;
      margin-top: 20px;
    }

    .hidden {
      display: none !important;
    }

    .heartbeat {
      animation: heartbeat 0.6s ease-in-out;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.3); }
      50% { transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="valentine-container">
        {/* Floating hearts background */}
        <div className="heart-float" style={{ left: '10%', top: '20%', animationDelay: '0s' }}>
          ❤️
        </div>
        <div className="heart-float" style={{ left: '80%', top: '40%', animationDelay: '1s' }}>
          💕
        </div>
        <div className="heart-float" style={{ left: '20%', top: '70%', animationDelay: '2s' }}>
          💗
        </div>
        <div className="heart-float" style={{ left: '75%', top: '10%', animationDelay: '0.5s' }}>
          💖
        </div>
        <div className="heart-float" style={{ left: '50%', top: '80%', animationDelay: '1.5s' }}>
          ❤️
        </div>

        {/* Main content */}
        <div className="content-box">
          {!showSuccess ? (
            <>
              <h1 className="title">💕</h1>
              <h2 className="question">Will you be my Valentine?</h2>
              <div className="emoji">❤️</div>

              <div className="buttons-container">
                <button className="btn btn-yes" onClick={handleYesClick}>
                  Yes!
                </button>
                <button
                  ref={noBtnRef}
                  className="btn btn-no"
                  onMouseEnter={moveNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    moveNoButton();
                  }}
                  style={{
                    left: noButtonPos.x ? `${noButtonPos.x}px` : 'auto',
                    top: noButtonPos.y ? `${noButtonPos.y}px` : 'auto',
                    position: noButtonPos.x ? 'fixed' : 'relative',
                  }}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <div className="success-message">
              <h2 className="success-title">You made me the happiest! 🎉</h2>
              <div className="success-emoji">💕✨💕</div>
              <p className="success-text">I can't wait to celebrate with you!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Valentine;