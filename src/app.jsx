import React from 'react';
import { render } from 'react-dom';
import { renderRoutes } from 'client/routes/routes'
import 'react-select/dist/react-select.css';

render(renderRoutes(), document.getElementById('app-root'));
