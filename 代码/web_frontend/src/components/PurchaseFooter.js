import React, {Component, useState} from 'react';
import {
  Box,
  Text,
  Button,
  Icon,
  HStack,
  Image,
  Center,
  Pressable,
} from 'native-base';
import {judgeTime} from '../utils/judgeTime';
import {Link} from 'react-router-dom';
import {getGroupById} from '../service/groupService';
import {ShoppingCartOutlined} from "@ant-design/icons";

// 获得屏幕的宽度和高度，便于确定元素的大小，适配不同大小的屏幕
let w = window.innerWidth * 0.5;
let h = window.innerHeight;

export default function PurchaseFooter({groupId, userId}) {
  const [status, setStatus] = useState(1);
  const defaultAddress = {
    addressId: 0,
    location: '',
    phone: '',
    receiver: '',
    region: '',
  };
  const callback = data => {
    console.log("callback data: ", data);
    if (data.status === 1) {
      setStatus(judgeTime(data.data));
      console.log('status: ', status);
    }
  };
  React.useEffect(() => {
    const data = parseInt(groupId);
    getGroupById(parseInt(groupId), callback);
  }, []);
  // console.log('PurchaseFooter:', groupId, userId);
  // TODO： 这里footer和上面有一定距离？为啥？
  return (
    <Box
      // flex={1}
      width="100%"
      height="10%"
      position="absolute"
      bottom="0"

        mt={-0.01 * h}
      alignSelf="center">
      <Center flex={1} />
      <HStack
        alignItems="stretch"
        borderTopWidth={'3'}
        borderTopColor={'gray.100'}
        safeAreaBottom
        space={3}
        w={w}
        padding={3}>
        <Center>
          {/*<Link*/}
          {/*  to={{*/}
          {/*    screen: 'Cart',*/}
          {/*    initial: false,*/}
          {/*    params: {groupId: groupId, userId: userId},*/}
          {/*  }}>*/}
          <Link to={{ pathname: '/cart', state: {groupId: groupId, userId: userId}}}>
          <ShoppingCartOutlined style={{ fontSize: '150%', color:'#fb7185'}}/>
          </Link>
          <Text color="light.800" fontSize="14">
            购物车
          </Text>
        </Center>
        <Center>
          {status === 1 ? (
            <Button
              size="sm"
              ml={0.7 * w}
              colorScheme="danger"
              // ml={0.1 * w}
              // mt={0.005 * h}
              // color="danger.800"
            >
              {/*<Link*/}
              {/*  to={{*/}
              {/*    screen: 'PaymentDetail',*/}
              {/*    initial: false,*/}
              {/*    params: {*/}
              {/*      groupId: groupId,*/}
              {/*      userId: userId,*/}
              {/*      address: defaultAddress,*/}
              {/*    },*/}
              {/*  }}>*/}
              <Link to={{ pathname: '/paymentDetail', state: {groupId: groupId, userId: userId, address: defaultAddress}}}>
                <Text color={'white'}>
                  一键开团
                </Text>
              </Link>
            </Button>
          ) : (
            <Button
              size="sm"
              ml={0.5 * w}
              colorScheme="danger"
              opacity={'0.5'}
              // ml={0.1 * w}
              // mt={0.005 * h}
              // color="danger.800"
            >
              {status === 2 ? '团购已结束' : '团购未开始'}
            </Button>
          )}
        </Center>
      </HStack>
    </Box>
  );
}
