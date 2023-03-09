import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from "./utils/history";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomeView from "./views/HomeView";
import DetailViewWrapper from "./views/DetailView";
import CartViewWrapper from "./views/CartView";
import PaymentDetailsWrapper from "./views/PaymentDetailsView";
import PaymentDoneView from "./views/PaymentDoneView";
import SwitchScreen1 from "./views/SwitchScreen1";
import SwitchScreen2 from "./views/SwitchScreen2";
import SwitchScreen3 from "./views/SwitchScreen3";
import SwitchScreen4 from "./views/SwitchScreen4";
import CreateGroupScreen from "./views/CreateGroupView";
import CreateDoneView from "./views/CreateDoneView";
import OrderView from "./views/OrderView";
import MyProfileView, { MyProfileViewWrapper } from './views/MyProfileView';
import Wallet, { WalletWrapper } from './components/Wallet';
import AdminGroupList, { AdminGroupListWrapper } from './components/AdminGroupList';
import AdminOrderList, { AdminOrderListWWrapper } from './components/AdminOrderList';
import StatisticView from './views/StatisticView';

class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }


    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/register" component={RegisterForm}/>
                    <Route exact path="/" component={LoginForm}/>
                    <Route exact path="/home" component={HomeView}/>
                    <Route exact path="/detail" component={DetailViewWrapper}/>
                    <Route exact path="/cart" component={CartViewWrapper}/>
                    <Route exact path="/paymentDetail" component={PaymentDetailsWrapper} />
                    <Route exact path="/paymentDone" component={PaymentDoneView} />
                    <Route exact path="/switch1" component={SwitchScreen1}/>
                    <Route exact path="/switch2" component={SwitchScreen2}/>
                    <Route exact path="/switch3" component={SwitchScreen3}/>
                    <Route exact path="/switch4" component={SwitchScreen4}/>
                    <Route exact path="/create" component={CreateGroupScreen}/>
                    <Route exact path="/createDone" component={CreateDoneView}/>
                    <Route exact path="/order" component={OrderView}/>
                    <Route exact path="/myProfile" component={MyProfileViewWrapper} />
                    <Route exact path="/wallet" component={WalletWrapper} />
                    <Route exact path="/AdminGroupList" component={AdminGroupListWrapper} />
                    <Route exact path="/AdminOrderList" component={AdminOrderListWWrapper} />
                    <Route exact path="/StatisticView" component={StatisticView} />
                    {/*<Redirect from="/*" to="/" />*/}
                </Switch>

            </Router>
        )
    }


}

export default BasicRoute;
