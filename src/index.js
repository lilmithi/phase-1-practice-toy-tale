let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const container = document.querySelector("div#toy-collection");

  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((toys) => {
      toys.forEach((toy) => {
        const toyCard = document.createElement("div");
        const toyHeading = document.createElement("h2");
        const imgTag = document.createElement("img");
        const p = document.createElement("p");
        const span = document.createElement("span");
        const likeBtn = document.createElement("button");
        toyHeading.append(toy.name);
        imgTag.src = toy.image;
        imgTag.className = "toy-avatar";
        span.append(toy.likes);
        p.append(span);
        p.append(` Likes`);
        likeBtn.textContent = "like";
        likeBtn.className = "like-btn";
        likeBtn.id = toy.id;
        toyCard.appendChild(toyHeading);
        toyCard.appendChild(imgTag);
        toyCard.appendChild(p);
        toyCard.appendChild(likeBtn);
        toyCard.className = "card";
        container.appendChild(toyCard);
        likeBtn.addEventListener("click", () => {
          toy.likes += 1;
          span.textContent = toy.likes;
          fetch(`http://localhost:3000/toys/${likeBtn.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(toy),
          })
            .then((resp) => resp.json())
            .then((obj) => obj.likes);
        });
      });
    })
    .catch(() => alert("FETCH Error!!"));

  const form = document.querySelector("form");
  const newToys = {};

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const link = e.target.image.value;
    newToys["name"] = name;
    newToys["image"] = link;
    newToys.likes = 0;
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToys),
    })
      .then((resp) => resp.json())
      .then((toy) => {
        const toyCard = document.createElement("div");
        const toyHeading = document.createElement("h2");
        const imgTag = document.createElement("img");
        const p = document.createElement("p");
        const span = document.createElement("span");
        const likeBtn = document.createElement("button");
        toyHeading.append(toy.name);
        imgTag.src = toy.image;
        imgTag.className = "toy-avatar";
        span.append(toy.likes);
        p.append(span);
        p.append(` Likes`);
        likeBtn.textContent = "like";
        likeBtn.className = "like-btn";
        likeBtn.id = toy.id;
        toyCard.appendChild(toyHeading);
        toyCard.appendChild(imgTag);
        toyCard.appendChild(p);
        toyCard.appendChild(likeBtn);
        toyCard.className = "card";
        container.appendChild(toyCard);
      })
      .catch(() => alert("POST Error!!"));
    form.reset();
  });
});
