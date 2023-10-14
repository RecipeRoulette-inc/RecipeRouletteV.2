import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// JC Imports: 
import { store } from './store'
import { Provider } from 'react-redux'


const root = createRoot(document.getElementById('root'))

// JC: Wrapped App in the Provider, giving it access to the store
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);