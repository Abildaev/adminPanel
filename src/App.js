import './App.css';
import Menu from "./components/menu/Menu";
import {Route} from "react-router-dom";
import Portfolio from "./pages/portfolio/Portfolio";
import FormPortfolio from "./pages/formPortfolio/FormPortfolio";
import AddWork from "./pages/addWork/AddWork";
import Services from "./pages/services/Services";
import ServiceForm from "./pages/services/ServiceForm";


function App() {
    return (
        <div id="wrapper">
            <Menu/>
            <Route component={Portfolio} exact path="/portfolio"/>
            <Route component={FormPortfolio} exact path="/portfolioDetail/:id"/>
            <Route component={AddWork} path="/portfolio/addWork"/>

            <Route component={Services} path="/services"/>
            <Route component={ServiceForm} path="/service/:id"/>
        </div>
);
}

export default App;
