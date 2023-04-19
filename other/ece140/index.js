let problems = {
    5: [
        "0505",
        "0507",
        "0509",
        "0513",
        "0515",
        "0520",
        "0527",
        "0531",
        "0537",
        "0544",
        "0545",
        "0553",
        "0554",
        "0557",
        "0558",
        "0569",
        "0583",
        "0587",
        "0591",
    ],
    6: [
        "0601",
        "0602",
        "0606",
        "0607",
        "0608",
        "0609",
        "0611",
        "0613",
        "0617",
        "0625",
        "0632",
        "0637",
        "0639",
        "0642",
        "0647",
        "0651",
        "0657",
        "0661",
        "0662",
        "0665",
        "0668",
        "0671",
        "0676",
    ],
    7: [
        "0701",
        "0702",
        "0706",
        "0707",
        "0708",
        "0711",
        "0713",
        "0718",
        "0719",
        "0721",
        "0723",
        "0739",
        "0743",
        "0750",
        "0753",
        "0783",
        "0785",
        "0787",
    ],
    9: [
        "0903",
        "0906",
        "0908",
        "0911",
        "0918",
        "0919",
        "0927",
        "0931",
        "0934",
        "0937",
        "0942",
        "0950",
        "0951",
        "0954",
        "0955",
        "0961",
        "0962",
        "0968",
        "0978",
        "0980",
        "0982",
        "0984",
    ],
    10: [
        "1003",
        "1009",
        "1017",
        "1019",
        "1025",
        "1033",
        "1043",
        "1044",
        "1052",
        "1058",
        "1066",
        "1073",
        "1089",
        "1091",
    ],
    11: [
        "1105",
        "1115",
        "1120",
        "1128",
        "1136",
        "1141",
        "1147",
        "1148",
        "1152",
        "1162",
    ]
}

let positions = {5:0, 6:0, 7:0, 9:0, 10:0, 11:0};

console.log(problems)

const main = document.getElementById("main");
let loadQuestion = () => {
    let chapter = document.getElementById("chapter").value;

    let question = problems[chapter][[positions[chapter]]];
    positions[chapter]++;

    let questionDiv = document.createElement("div");
    questionDiv.className = "question";

    let questionObj = document.createElement("object");
    questionObj.data = `bucket/Prob${question}.pdf`;
    questionDiv.append(questionObj);

    let questionButton = document.createElement("button");
    questionButton.innerHTML = "Flip Problem/Solution";
    questionButton.onclick = () => {
        if (questionObj.data.includes("Prob"))
            questionObj.data = `bucket/Soln${question}.pdf`;
        else
            questionObj.data = `bucket/Prob${question}.pdf`;
    }
    questionDiv.append(questionButton);
    
    main.append(questionDiv);

    questionDiv.scrollIntoView({ behavior: "smooth" });
};

let run = () => {
    let chapter = document.getElementById("chapter").value;
    document.getElementById("problemNo").innerHTML = "";

    problems[chapter].forEach((problem) => {
        let option = document.createElement("option");
        option.value = problem;
        option.innerHTML = problem;
        document.getElementById("problemNo").append(option);
    })

    document.getElementById("problemNo").value = problems[chapter][positions[chapter]];

    loadQuestion();
}

document.getElementById("chapter").onchange = run;
run();

document.getElementById("problemNo").onchange = () => {
    let chapter = document.getElementById("chapter").value;
    let problem = document.getElementById("problemNo").value;

    positions[chapter] = problems[chapter].indexOf(problem);
    loadQuestion();
}
