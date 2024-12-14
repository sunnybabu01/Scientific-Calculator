document.addEventListener("DOMContentLoaded", () => {
    const result = document.getElementById("result");
    let currentExpression = "";
    let isRadians = true;

    const updateDisplay = (value) => {
        result.value = value;
    };

    document.querySelectorAll(".buttons button").forEach((button) => {
        button.addEventListener("click", () => {
            const text = button.textContent;

            if (text === "AC") {
                currentExpression = "";
                updateDisplay("");
            } else if (text === "⌫") {
                currentExpression = currentExpression.slice(0, -1);
                updateDisplay(currentExpression);
            } else if (text === "=") {
                try {
                    // Convert mathematical functions
                    let exp = currentExpression
                        .replace(/÷/g, "/")
                        .replace(/×/g, "*")
                        .replace(/√/g, "Math.sqrt")
                        .replace(/π/g, "Math.PI")
                        .replace(/e/g, "Math.E")
                        .replace(/sin/g, `Math.sin(${isRadians ? "" : "Math.PI/180*"} `)
                        .replace(/cos/g, `Math.cos(${isRadians ? "" : "Math.PI/180*"} `)
                        .replace(/tan/g, `Math.tan(${isRadians ? "" : "Math.PI/180*"} `)
                        .replace(/log/g, "Math.log10")
                        .replace(/ln/g, "Math.log")
                        .replace(/\^/g, "");

                    currentExpression = eval(exp).toString();
                    updateDisplay(currentExpression);
                } catch {
                    updateDisplay("Error");
                    currentExpression = "";
                }
            } else if (text === "RAD") {
                isRadians = !isRadians;
                button.classList.toggle("active");
                button.textContent = isRadians ? "RAD" : "DEG";
            } else {
                currentExpression += text;
                updateDisplay(currentExpression);
            }
        });
    });
});