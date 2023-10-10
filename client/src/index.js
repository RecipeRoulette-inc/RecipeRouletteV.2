import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// JC Imports: 
import { store } from './store'
import { Provider } from 'react-redux'

const BrowserRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
]); 

const root = createRoot(document.getElementById('root'))

// JC: Wrapped App in the Provider, giving it access to the store
root.render(
    <Provider store={store}>
        <RouterProvider router={BrowserRouter} />
    </Provider>
);