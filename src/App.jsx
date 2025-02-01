import { useState } from "react";
import "./style.css";

export const App = () => {
	const [value, setValue] = useState(`""`);
	const [hiddenAtribute, setHiddenAttribute] = useState(true);
	const [list, setList] = useState([]);

	const onClick = (event) => {
		event.preventDefault;

		if (event.target.textContent === "Ввести новое") {
			const result = prompt("Введите значение");
			if (result && result.length >= 3) {
				setHiddenAttribute(true);
				setValue(`"${result}"`);
			} else {
				setHiddenAttribute(false);
				setValue(`""`);
			}
		} else {
			setList((a) => [
				{
					key: Math.random().toString(16).slice(2),
					value: value,
				},
				...a,
			]);
			setValue(`""`);
		}
	};

	return (
		<>
			<div className="app">
				<h1 className="page-heading">Ввод значения</h1>

				<p className="no-margin-text">
					Текущее значение <code>value</code>: {value}
				</p>

				<div className="error" hidden={hiddenAtribute}>
					Введенное значение должно содержать минимум 3 символа
				</div>

				<div className="buttons-container">
					<button className="button" onClick={onClick}>
						Ввести новое
					</button>

					{value.length >= 3 ? (
						<button className="button" onClick={onClick}>
							Добавить в список
						</button>
					) : (
						<button className="button" onClick={onClick} disabled>
							Добавить в список
						</button>
					)}
				</div>
				<div className="list-container">
					<h2 className="list-heading">Список:</h2>

					{list.length === 0 && (
						<p className="no-margin-text nolist">Нет добавленных элементов</p>
					)}

					<ul className="list">
						{list.map(({ key, value }) => (
							<li className="list-item" key={key}>
								{value}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
