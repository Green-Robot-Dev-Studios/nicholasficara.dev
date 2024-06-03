import React, { useEffect, useRef } from "react";
import Admonition from '@theme/Admonition';

export default ({cells}) => {
    useEffect(() => {
        const body = document.body;
        const script = document.createElement("script");
        const url = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
        script.setAttribute("src", url);
        script.onload = () => {
            const scriptBody = document.createElement("script");
            let scriptBodyText = `
                if (typeof variable === 'undefined') {
                    console.log('Desmos not loaded')
                    const elt = document.getElementById('calculator'); 
                    const calculator = Desmos.GraphingCalculator(elt);
                }
            `;

            cells && cells.forEach((cell, i) => {
                scriptBodyText += `
                    calculator.setExpression({ id: '${i}', latex: '${cell}' });
                `;
            })
            scriptBody.innerHTML = scriptBodyText;
            body.appendChild(scriptBody);
        }
        body.appendChild(script);
    }, []);

    return (
        <Admonition title="Desmos" type="tip" icon="📈">
            <div id="calculator" style={{ width: 600, height: 500 }}></div>
        </Admonition>
    );
};
