document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const toggleBtn = document.getElementById('darkToggle');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
      toggleBtn.textContent = 'Light Mode';
    } else {
      toggleBtn.textContent = 'Dark Mode';
    }
  });

  // Canvas background animation
  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let circles = [];

  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    circles = [];
    const circleCount = 30; // number of circles

    for (let i = 0; i < circleCount; i++) {
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 10 + Math.random() * 20,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        color: `rgba(233, 78, 119, ${0.1 + Math.random() * 0.3})`, // pinkish transparent
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    circles.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();

      // Move
      c.x += c.dx;
      c.y += c.dy;

      // Bounce off edges
      if (c.x < c.radius || c.x > width - c.radius) c.dx = -c.dx;
      if (c.y < c.radius || c.y > height - c.radius) c.dy = -c.dy;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    initCanvas();
  });

  initCanvas();
  draw();

  // View Project toggle functionality
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (target.style.display === "none" || target.style.display === "") {
        target.style.display = "block";
        btn.textContent = "Hide Project";
      } else {
        target.style.display = "none";
        btn.textContent = "View Project";
      }
    });
  });
});
