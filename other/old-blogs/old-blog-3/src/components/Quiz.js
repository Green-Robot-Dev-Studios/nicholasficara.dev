import React, { createRef, useEffect } from "react";
import Admonition from "@theme/Admonition";
import katex from "katex/dist/contrib/auto-render";

const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default ({
    question,
    answers = ["A", "B", "C", "D"],
    correct = answers[0],
    children,
}) => {
    let shuffle = true;
    if (answers[0] == "A" || answers[0] == "a") shuffle = false;

    let quiz = createRef(null);
    useEffect(() => {
        katex(quiz.current, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: true },
            ],
        });
    });

    return (
        <Admonition title="Quiz" icon="📋">
            <div id="quiz" ref={quiz}>
                <h3>{question}</h3>
                {children}
                <div id="answers">
                    {(shuffle ? shuffleArray(answers) : answers).map(
                        (answer, i) => (
                            <div key={i} className="answer">
                                <input
                                    type="radio"
                                    id={`answer-${i}`}
                                    name="answer"
                                    value={answer}
                                />
                                <label htmlFor={`answer-${i}`} id="answer">
                                    {answer}
                                </label>
                            </div>
                        )
                    )}
                </div>
                <button id="submit">Check</button>
            </div>
        </Admonition>
    );
};
