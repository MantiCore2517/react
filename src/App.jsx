import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

const stepsClassName = (index, step) => {
	let classNameOfLi;
	switch (true) {
		case index === step:
			classNameOfLi =
				styles["steps-item"] + " " + styles.done + " " + styles.active;
			break;

		case index < step:
			classNameOfLi = styles["steps-item"] + " " + styles.done;
			break;

		default:
			classNameOfLi = styles["steps-item"];
			break;
	}
	return classNameOfLi;
};

export const App = () => {
	const [step, setStep] = useState(0);

	const steps = data.map(({ id, title }, index) => (
		<li className={stepsClassName(index, step)} key={id}>
			<button
				name={index}
				className={styles["steps-item-button"]}
				onClick={onClickIndex}
			>
				{index + 1}
			</button>
			{title}
		</li>
	));

	const isLastStep = step === steps.length - 1;

	function onClickIndex(event) {
		event.preventDefault;
		const index = Number(event.target.name);
		setStep(index);
	}

	const onClickButtons = (event) => {
		event.preventDefault;
		const { target } = event;
		switch (target.name) {
			case "prev":
				setStep((step) => step - 1);
				break;
			case "next":
				setStep((step) => step + 1);
				break;
			case "start":
				setStep(0);
				break;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>{data[step].content}</div>
					<ul className={styles["steps-list"]}>{steps}</ul>
					<div className={styles["buttons-container"]}>
						<button
							name={"prev"}
							className={styles.button}
							onClick={onClickButtons}
							disabled={step === 0}
						>
							Назад
						</button>
						<button
							name={!isLastStep ? "next" : "start"}
							className={styles.button}
							onClick={onClickButtons}
						>
							{!isLastStep ? "Далее" : "В начало"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
