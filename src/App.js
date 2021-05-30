import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import Alert from "./components/Alert";

const App = () => {
	const [alert, setAlert] = useState({
		message: '',
		type: ''
	});
	return (
		<>
			<div className="container">
				<main className="main">
					<h1 className="main__title">
						Formulario de Registro{" "}
						<span className="main__title-logo">Yummy</span>
					</h1>
					<p className="main__warning">Todos los campos son obligatorios</p>
					<RegisterForm setAlert={setAlert} />
				</main>
			</div>
			{alert.message && <Alert alert={alert} />}
		</>
	);
}

export default App;
