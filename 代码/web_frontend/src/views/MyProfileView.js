
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Box, Center, useToast, VStack} from 'native-base';
import ProfilePic from '../components/ProfilePic';
import ProfileFuncRow1 from '../components/ProfileFuncRow1';
import ProfileFuncRow2 from '../components/ProfileFuncRow2';
import ProfileFuncList from '../components/ProfileFuncList';
// import ProfileAddressScreen from './ProfileAddressScreen';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Wallet from '../components/Wallet';
// import AdminOrderList from '../components/AdminOrderList';
// import AdminGroupList from '../components/AdminGroupList';
// import EditGroupDetails from '../components/EditGroupDetails';
// import {storage} from '../utils/storage';
// import {getCollectedGroups} from '../service/groupService';
import {getUserById} from '../service/userService';
import { withRouter } from 'react-router';
import Header from '../components/Header'

let w = window.innerWidth ;
let h = window.innerHeight;

export class MyProfileViewWrapper extends React.Component{
  render() {
    const { props, userId } = this.props.location.state || {};
    console.log('profile screen wrapper props: ', props);
    console.log('profile screen wrapper userId: ', userId);
    return(
        <MyProfileView props={props}/>
    );
  }
}


const MyProfileView = ({props}) => {
  console.log('MyProfileView --- props: ', props)
  const [Id, setId] = useState(0);
  const [user, setUser] = useState({});
  const toast = useToast();
  const callback = data => {
      // console.log('user data:', data);
    if (data.status === 0) {
      setUser(data.data);
    } else {
      toast.show({
        description: '出错了，请重试！',
        variant: 'subtle',
        placement: 'top',
      });
    }
  };

  // 获取当前用户
  React.useEffect(() => {
    // storage.load('userId', data => {
    //   setId(data);
    let user = localStorage.getItem('userId');
    let user_json = JSON.parse(user);
    setId(parseInt(user_json));
      // console.log('userId::::', data);
      const request = {userId: parseInt(user_json)};
      getUserById(request, callback);
    // });
  }, []);

  return (
    <View >
      <Header/>
         {/* <Center w="80%" margin="auto"> */}
         <Box width={0.5 *w} ml={0.25 * w}>
      <ProfilePic user={user} />
      <VStack marginTop={180}>
        <ProfileFuncRow1 userId={Id} />
        <ProfileFuncRow2 userId={Id} props={props} />
        <Box height={1000} bg="#fff">
          <ProfileFuncList />
        </Box>
      </VStack>
      {/* </Center> */}
      </Box>
     </View>
  );
};

// const StackNav = createNativeStackNavigator();
// const MyProfileWrapper = createNativeStackNavigator();


// export function MyProfileViewRoute() {
//   let navigationContainer = (
//     <StackNav.Navigator screenOptions={{headerShown: false}}>
//       <StackNav.Screen
//         name="TrueMyProfile"
//         component={MyProfileView}
//         options={{headerShown: false}}
//       />
//       <StackNav.Screen
//         name="ProfileAddress"
//         component={ProfileAddressScreen}
//         options={{headerShown: false}}
//       />
//       <StackNav.Screen
//         name="Wallet"
//         component={Wallet}
//         options={{headerShown: false}}
//       />
//       <StackNav.Screen
//         name="AdminOrderList"
//         component={AdminOrderList}
//         options={{headerShown: false}}
//       />
//       <StackNav.Screen
//         name="AdminGroupList"
//         component={AdminGroupList}
//         options={{headerShown: false}}
//       />
//       <StackNav.Screen
//         name="EditGroupDetails"
//         component={EditGroupDetails}
//         options={{headerShown: false}}
//       />
//       {/*<StackNav.Screen*/}
//       {/*    name=""*/}
//       {/*    component={Wallet}*/}
//       {/*    options={{headerShown: false}}*/}
//       {/*/>*/}
//     </StackNav.Navigator>
//   );
//   return navigationContainer;
// }
// export default withRouter(MyProfileViewRoute);
export default withRouter(MyProfileViewWrapper);
