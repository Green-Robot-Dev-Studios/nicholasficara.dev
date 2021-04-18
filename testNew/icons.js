//<img src="https://img.shields.io/badge/Python-306998?&logo=Python&logoColor=fff&style=for-the-badge" />

let overlay = document.querySelector("#overlayL");
let skills = [
    { skill: "Python", color: "306998" },
    { skill: "Node.js", color: "339933" },
    { skill: "JavaScript", color: "F7DF1E" },
    { skill: "ArchLinux", color: "1793D1" }
];

skills.forEach((i)=> {
    var img = document.createElement("img");
    img.src = `https://img.shields.io/badge/${i.skill}-${i.color}?&logo=${i.skill}&logoColor=fff&style=for-the-badge`;
    overlay.appendChild(img);
});
