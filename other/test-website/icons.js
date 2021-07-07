//<img src="https://img.shields.io/badge/Python-306998?&logo=Python&logoColor=fff&style=for-the-badge" />

let overlay = document.querySelector("#overlayL");
let skills = [
    { skill: "Python", color: "306998" },
    { skill: "Node.js", color: "339933" },
    { skill: "JavaScript", color: "F7DF1E" },
    { skill: "ArchLinux", color: "1793D1" },
    { skill: "GraphQL", color: "311C87" },
    { skill: "AdobePhoneGap", color: "27A1C5" },
    { skill: "AdobePhotoshop", color: "1793D1" },
    { skill: "Android", color: "3DDC84" },
    { skill: "AngularJS", color: "E23237" },
    { skill: "ApacheCordova", color: "E8E8E8" },
    { skill: "Arduino", color: "00979D" },
    { skill: "Atom", color: "66595C" },
    { skill: "Blender", color: "F5792A" },
    { skill: "C", color: "A8B9CC" },
    { skill: "C++", color: "00599C" },
    { skill: "Chart.JS", color: "FF6384" },
    { skill: "CSS3.JS", color: "1572B6" },
    { skill: "Dart", color: "0175C2" },
    { skill: "Dialogflow", color: "FF9800" },
    { skill: "Docker", color: "2496ED" },
    { skill: "Flutter", color: "02569B" },
    { skill: "GIMP", color: "5C5543" },
    { skill: "Git", color: "F05032" },
    { skill: "Github", color: "181717" },
    { skill: "GNUBash", color: "4EAA25" },
    { skill: "GodotEngine", color: "FF6384" },
    { skill: "HTML5", color: "E34F26" },
    { skill: "Ionic", color: "3880FF" },
    { skill: "JavaScript", color: "F7DF1E" },
    { skill: "Java", color: "007396" },
    { skill: "Neovim", color: "57A143" },
    { skill: "ngrok", color: "1F1E37" },
    { skill: "p5.js", color: "ED225D" },
    { skill: "RaspberryPi", color: "A22846" },
    { skill: "React", color: "61DAFB" },
    { skill: "TensorFlow", color: "FF6F00" },
    { skill: "THREE.js", color: "000000" },
    { skill: "TypeScript", color: "3178C6" },
    { skill: "VisualStudioCode", color: "007ACC" },
    { skill: "Vue.js", color: "4FC08D" },
];

skills.forEach((i)=> {
    var img = document.createElement("img");
    img.src = `https://img.shields.io/badge/${i.skill}-${i.color}?&logo=${i.skill}&logoColor=fff&style=for-the-badge`;
    overlay.appendChild(img);
});
