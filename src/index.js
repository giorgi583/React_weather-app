import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

// components
import Weather from './components/Weather';

// css
import './style.css'
function App () {

    return (
        <>
        <Weather/>
        </>
    )

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StrictMode><App/></StrictMode>)