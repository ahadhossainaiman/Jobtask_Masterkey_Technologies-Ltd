document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function createPartition(parent, color) {
    const partition = document.createElement("div");
    partition.classList.add("partition");
    partition.style.backgroundColor = color;
    parent.appendChild(partition);
    addControls(partition);
    return partition;
  }

  function addControls(partition) {
    const controls = document.createElement("div");
    controls.classList.add("controls");

    const vButton = document.createElement("button");
    vButton.innerText = "V";
    vButton.onclick = () => splitPartition(partition, "vertical");

    const hButton = document.createElement("button");
    hButton.innerText = "H";
    hButton.onclick = () => splitPartition(partition, "horizontal");

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "-";
    deleteButton.onclick = () => deletePartition(partition);

    controls.appendChild(vButton);
    controls.appendChild(hButton);
    controls.appendChild(deleteButton);
    partition.appendChild(controls);
  }

  function splitPartition(partition, direction) {
    const parent = partition.parentElement;
    const newPartition = createPartition(parent, getRandomColor());
    const container = document.createElement("div");

    if (direction === "vertical") {
      container.style.flexDirection = "row";
    } else if (direction === "horizontal") {
      container.style.flexDirection = "column";
    }
    container.classList.add("partition");
    container.style.flex = "1";

    partition.replaceWith(container);
    container.appendChild(partition);
    container.appendChild(newPartition);

    makeResizable(partition, direction);
    makeResizable(newPartition, direction);
  }

  function deletePartition(partition) {
    const parent = partition.parentElement;
    parent.removeChild(partition);
    if (parent.children.length === 0) {
      parent.remove();
    } else if (parent.children.length === 1) {
      const child = parent.children[0];
      parent.replaceWith(child);
    }
  }

  function makeResizable(partition, direction) {
    const resizer = document.createElement("div");
    resizer.classList.add("resizer");
    if (direction === "vertical") {
      resizer.classList.add("vertical");
    } else {
      resizer.classList.add("horizontal");
    }
    partition.appendChild(resizer);

    resizer.addEventListener(
      "mousedown",
      function (e) {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(
          document.defaultView.getComputedStyle(partition).width,
          10
        );
        const startHeight = parseInt(
          document.defaultView.getComputedStyle(partition).height,
          10
        );

        function doDrag(e) {
          if (resizer.classList.contains("vertical")) {
            const newWidth = startWidth + e.clientX - startX;
            partition.style.width = `${newWidth}px`;
          } else {
            const newHeight = startHeight + e.clientY - startY;
            partition.style.height = `${newHeight}px`;
          }
        }

        function stopDrag() {
          document.documentElement.removeEventListener(
            "mousemove",
            doDrag,
            false
          );
          document.documentElement.removeEventListener(
            "mouseup",
            stopDrag,
            false
          );
        }

        document.documentElement.addEventListener("mousemove", doDrag, false);
        document.documentElement.addEventListener("mouseup", stopDrag, false);
      },
      false
    );
  }

  createPartition(container, getRandomColor());
});
