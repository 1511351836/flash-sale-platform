import {
  Container,
  NativeBaseProvider,
  Content,
  List,
  ListItem,
  VStack,
  Center,
  Box,
  Heading,
  ScrollView,
  Spacer,
  Icon,
  HStack,
  SwipeListView,
  Input,
  Avatar,
  SearchIcon,
  AddIcon,
  Image,
  Divider,
  Pressable,
} from 'native-base';
import React, {Component, useState, useEffect} from 'react';
import OrderList from '../components/OrderList';
import {getOrderById} from '../service/orderService';
import {withRouter} from "react-router";
import MyHeader from "../components/Header";

let w = window.innerWidth * 0.5;
let h = window.innerHeight;


export let fresh = 1;
function OrderView() {
  const [dataSource, setDataSource] = useState([]);
  const [userId, setUserId] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [text, setText] = useState('');
  const [fresh, setFresh] = useState(false);

  const getOrders = data => {
    let user = localStorage.getItem('userId');
    let userId = JSON.parse(user);
    setUserId(userId);
    setDataSource(data.data);
    setFilterData(data.data);
  };

  React.useEffect(() => {
    let user = localStorage.getItem('userId');
    let userId = JSON.parse(user);
    const UserId = {userId: userId};
    getOrderById(UserId, getOrders);
    // console.log(1);
  }, [fresh]);

  const changeFresh = () => {
    setFresh(!fresh);
  };

  const handleChange = text => {
    console.log(text);
    let filData = [];
    if (text === '') {
      filData = dataSource;
    } else {
      dataSource.forEach(data => {
        if (data.groupTitle.indexOf(text) !== -1) {
          filData.push(data);
        } else {
          for (let i = 0; i < data.orderItems.length; ++i) {
            if (data.orderItems[i].goodsName.indexOf(text) !== -1) {
              filData.push(data);
              break;
            }
          }
        }
      });
    }
    setFilterData(filData);
  };
  return (
    <NativeBaseProvider>
      <MyHeader/>
      <VStack w="100%" space={3} alignSelf="center">
        <Pressable onPress={({navigation}) => navigation.navigate('Register')}>
          <Heading fontSize="md" alignSelf={'center'} style={{
                marginTop: 20,
                marginBottom: 0,
              }}>
            我的购买订单
          </Heading>
        </Pressable>
        <Input
          placeholder="搜索团名/商品名"
          width="45%"
          variant="rounded"
          // borderColor={'danger.600'}
          borderWidth="2"
          mb="2"
          py="3"
          px="1"
          fontSize="14"
          alignSelf={'center'}
          style={{
            height: 45,
            padding: 10,
          }}
          InputLeftElement={
            <Image
              ml="3"
              opacity={0.3}
              source={require('../image/search.png')}
              size="18px"
              alt="arrowR"
            />
          }
          onChangeText={text => {
            handleChange(text);
          }}
        />
      </VStack>
      {/*<OrderList data={dataSource} />*/}
      <NativeBaseProvider>
        <Center flex={1} mb={2}>
          <OrderList
            data={filterData}
            changeFresh={changeFresh}
            userId={userId}
          />
        </Center>
      </NativeBaseProvider>
    </NativeBaseProvider>
  );
}

export default withRouter(OrderView);
