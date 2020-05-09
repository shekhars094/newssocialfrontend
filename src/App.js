import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
// import "./App.css";

const App = () => (
	<Router>
		<ThemeProvider theme={theme}>
			<MainRouter />
		</ThemeProvider>
	</Router>
);
export default App;
