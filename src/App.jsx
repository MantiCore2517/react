import { useState } from "react";
import data from "./data.json";
import styles from "./App.module.css";

const getClassName = (type, value, id) => {
	let divClassName;
	type === "number"
		? (divClassName = styles[`${type}${value}`])
		: (divClassName = styles[`${type}${id}`]);
	return divClassName;
};

const getResult = (operators, operands, lastOperand) => {
	let sum = 0;
	operators.unshift("+");
	operands.push(lastOperand);
	operators.forEach((element, index) => {
		if (element === "+") {
			sum = sum + operands[index];
		} else {
			sum = sum - operands[index];
		}
	});
	return String(sum);
};

export const App = () => {
	const [output, setOutput] = useState("");
	const [operand, setOperand] = useState("");
	const [operands, setOperands] = useState([]);
	const [operators, setOperators] = useState([]);
	const [lastType, setlastType] = useState("");
	const [result, setResult] = useState("");

	const buttons = data.map(({ id, value, type }) => (
		<div
			className={getClassName(type, value, id)}
			key={id}
			data-type={type}
			data-value={String(value)}
		>
			<button className={styles.number} onClick={onClick}>
				{value}
			</button>
		</div>
	));

	function onClick(event) {
		event.preventDefault;
		const target = event.target.closest("div");
		const type = target.dataset.type;
		const value = target.dataset.value;

		if (type === "number") {
			setOperand((a) => Number(a + value));
			setOutput((a) => a + value);
			setlastType(type);
		} else if (value === "C") {
			setOperand("");
			setOperands([]);
			setOperators([]);
			setResult("");
			setOutput("");
			setlastType("");
		} else if (type === "operator" && lastType != type) {
			switch (value) {
				case "+":
					setOperands((a) => [...a, operand === "" ? 0 : operand]);
					setOperators((a) => [...a, value]);
					setOperand("");
					setOutput((a) => a + value);
					setlastType(type);
					break;
				case "-":
					setOperands((a) => [...a, operand === "" ? 0 : operand]);
					setOperators((a) => [...a, value]);
					setOperand("");
					setOutput((a) => a + value);
					setlastType(type);
					break;
				case "=":
					setOperands((a) => [...a, operand]);
					setOperand("");
					setlastType(type);

					setResult(getResult(operators, operands, operand));
					console.log(operands);
					break;
			}
		}
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.output}>{output}</div>
				<div className={styles.result}>{result}</div>

				{buttons}
			</div>
		</>
	);
};
