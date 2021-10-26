import React from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";

import { routes } from "./routes";
import "./App.css";

export const App = () => <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
