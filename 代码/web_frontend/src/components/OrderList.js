import React, {useEffect, useState} from 'react';
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    Center,
    NativeBaseProvider,
    Image, Pressable,
} from 'native-base';
import {message} from "antd";
let w = window.innerWidth * 0.5;
let h = window.innerHeight;

const OrderList = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const userId = props.userId;
  useEffect(() => {
    console.log("order list userId: ", userId)
    setDataSource(props.data);
  }, [props.data]);

  // console.log('dataSource:', dataSource);
  return (
    <Box>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <Box
            bg={'white'}
            borderRadius="15"
            height="auto"
            width={0.95 * w}
            mt="3"
            ml="2"
            mr="2"
            pb="2">
            <HStack>
              <Heading fontSize="15" ml="4" mt="4" mb="3" color={'muted.600'}>
                订单号: {item.orderId}
              </Heading>
              <Heading
                fontSize="15"
                ml={0.6 * w}
                mt="4"
                mb="3"
                color={'muted.600'}>
                {item.state === 1 ? <Text>已支付</Text> : <Text>已退款</Text>}
              </Heading>
            </HStack>
            <Box
              borderTopWidth="1"
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2">
              <HStack space={3} justifyContent="flex-start">
                <Image
                  size="100px"
                  borderRadius={5}
                  alignSelf="center"
                  source={{
                    uri: item.orderItems[0].picture,
                  }}
                  alt={'image'}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    // flex={1}
                    width="90%"
                    fontSize={'lg'}
                    bold>
                    {/*<Link*/}
                    {/*  to={{*/}
                    {/*    screen: 'OrderDetail',*/}
                    {/*    initial: false,*/}
                    {/*    params: {*/}
                    {/*      userId: userId,*/}
                    {/*      data: item,*/}
                    {/*      changeFresh: props.changeFresh,*/}
                    {/*      navigation: props.navigation,*/}
                    {/*    },*/}
                    {/*  }}>*/}
                      <Pressable onPress={()=>{message.warning("web端目前不支持查看订单详情及退款，请下载手机APP获取更好体验！");}}>
                      {item.groupTitle}
                      </Pressable>
                    {/*</Link>*/}
                  </Text>
                  <Text
                    color="coolGray.600"
                    paddingBottom={3}
                    width={0.5 * w}
                    numberOfLines={1}
                    fontSize={'sm'}
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    团长: {item.headerName}
                  </Text>
                  <Text
                    color="danger.500"
                    fontSize={'md'}
                    _dark={{
                      color: 'danger.500',
                    }}>
                    ￥ {item.orderPrice.toFixed(2)}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
        )}
        keyExtractor={item => item.orderId}
      />
    </Box>
  );
};

export default OrderList;

