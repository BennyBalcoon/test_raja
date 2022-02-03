const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const fetchRandomColor = () => {
  return fetch("data.json")
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      let randomColor = data[Math.floor(Math.random() * data.length)].color;
      return randomColor;
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawCircle = (n) => {
  const colorsPromises = [];
  for (let i = 0; i <= n; i++) {
    colorsPromises.push(fetchRandomColor());
  }

  Promise.all(colorsPromises).then((colors) => {
    clearCanvas();
    for (let i = 0; i < n; i++) {
      const randomColor = colors[i];
      ctx.fillStyle = randomColor;
      ctx.beginPath();
      ctx.arc(100 * i, 80, 40, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  });
};

const drawSquare = (n) => {
  const colorsPromises = [];
  for (let i = 0; i <= n; i++) {
    colorsPromises.push(fetchRandomColor());
  }

  Promise.all(colorsPromises).then((colors) => {
    clearCanvas();
    for (let i = 0; i < n; i++) {
      const randomColor = colors[i];
      ctx.fillStyle = randomColor;
      ctx.fillRect(10 * (i * 10), 10, 80, 80);
    }
  });
};

const getValue = () => {
  let select = document.getElementById("form");
  let option = select.options[select.selectedIndex];
  let value = option.value;

  if (value % 2 === 0) {
    drawCircle(value);
  } else if (value % 2 === 1) {
    drawSquare(value);
  } else {
    return;
  }
};
