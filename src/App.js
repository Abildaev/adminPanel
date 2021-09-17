import './App.css';
import Menu from "./components/menu/Menu";
import {Route} from "react-router-dom";
import Portfolio from "./pages/portfolio/Portfolio";
import FormPortfolio from "./pages/formPortfolio/FormPortfolio";
import AddWork from "./pages/addWork/AddWork";
import Services from "./pages/services/Services";
import ServiceForm from "./pages/services/ServiceForm";
import AddServices from "./pages/services/AddServices";
import Slider from "./pages/slider/Slider";


function App() {
    return (
        <div id="wrapper">
            <Menu/>
            <Route component={Portfolio} exact path="/portfolio"/>
            <Route component={FormPortfolio} exact path="/portfolioDetail/:id"/>
            <Route component={AddWork} path="/portfolio/addWork"/>

            <Route component={Services}  exact path="/services"/>
            <Route component={ServiceForm} exact path="/service/:id"/>
            <Route component={AddServices} path="/services/addService"/>
            <Route component={Slider} exact path="/slider"/>
        </div>
);
}

export default App;
