import React, { useState } from "react";
import Map from "./Map";
import PropTypes from "prop-types";

const RegisterForm = ({ setAlert }) => {
	const [data, setData] = useState({
		idCode: "",
		name: "",
		phone: "",
	});
	const [location, setLocation] = useState({
		lat: "10.48801",
		long: "-66.87919",
	});

	const { name, phone, idCode } = data;

	/**
	 * This function change the dataForm state
	 * @returns {void}
	 */
	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	/**
	 * This function sends the form to backend
	 * @returns {void}
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name === "" || phone === "" || idCode === "") {
			setAlert({
				message: "Error: Todos los campos son obligatorios",
				type: "alert-danger",
			});
			setTimeout(() => {
				setAlert({
					message: '',
					type: ''
				});
			}, 3000);
			return;
		}

		const newData = { ...data, location };

		try {
			const res = await fetch(
				process.env.REACT_APP_BACKEND_API,
				{
					method: "POST",
					body: JSON.stringify(newData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const resJson = await res.json();
			console.log(resJson);
			setAlert({
				message: "Exito: Se enviaron los campos correctamente",
				type: "alert-success",
			});

			setTimeout(() => {
				setAlert({
					message: '',
					type: ''
				});
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit} autoComplete="off">
			<div className="form__field">
				<label>Nombre:</label>
				<input type="text" name="name" onChange={handleChange} value={name} />
			</div>
			<div className="form__field">
				<label>Teléfono:</label>
				<input type="text" name="phone" onChange={handleChange} value={phone} />
			</div>
			<div className="form__field">
				<label>Cédula:</label>
				<input
					type="text"
					name="idCode"
					onChange={handleChange}
					value={idCode}
				/>
			</div>
			<div className="form__map">
				<Map
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
					containerElement={<div style={{ height: "400px" }} />}
					mapElement={<div style={{ height: "100%" }} />}
					loadingElement={<p>Cargando...</p>}
					isMarkerShown
					setLocation={setLocation}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Enviar
			</button>
		</form>
	);
};

export default RegisterForm;

RegisterForm.propTypes = {
	setAlert: PropTypes.func.isRequired,
};
