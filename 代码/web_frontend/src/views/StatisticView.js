import React, {useState} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {getOrderInfo} from '../service/orderService';
import {
  Box,
  Center,
  Heading,
  Image,
  VStack,
  Text,
  ScrollView,
  HStack,
} from 'native-base';
import {getCollectedGroups} from '../service/groupService';
import { withRouter } from 'react-router';

let w = window.innerWidth ;
let h = window.innerHeight;

const StatisticView = () => {
  const [dataSource, setDataSource] = useState([]);
  const [userId, setUserId] = useState(0);
  const [totalSale, setTotalSale] = useState(-1);
  const [totalRefund, setTotalRefund] = useState(-1);
  const [customers, setCustomers] = useState(-1);
  const [orderCount, setOrderCount] = useState(-1);
  const [orderList, setOrderList] = useState([]);
  const [refundList, setRefundList] = useState([]);

  const callback = data => {
    // console.log('getOrders callback: ', data);
    if (data.status === 1) {
      setUserId(userId);
      setDataSource(data.data);
      setTotalSale(data.data[2].data[2].value);
      setTotalRefund(data.data[2].data[3].value);
      setCustomers(data.data[2].data[1].value);
      setOrderCount(data.data[2].data[0].value);
      setOrderList(data.data[0].data);
      setRefundList(data.data[1].data);
      // console.log('dataSource: ', data.data);
    }
  };

  // React.useEffect(() => {
  //   storage.load('userId', userId => {
  //     const UserId = {userId: userId};
  //     console.log('get here!!!!!');
  //     getOrderInfo(UserId, getOrders);
  //   });
  //   // console.log(1);
  // });
  React.useEffect(() => {
    // storage.load('userId', data => {
      // console.log('userID:', data);
    //   const UserId = {userId: data};
      // console.log('get here!!!!!');
      let user = localStorage.getItem('userId');
      let user_json = JSON.parse(user);
      setUserId(parseInt(user_json));
      const request = {userId: parseInt(user_json)};

      getOrderInfo(request, callback);
    // });
  }, []);
  if (dataSource != []) {
    return (
      // <Box>
      // </Box>
      <ScrollView>
        <Box width={0.5 *w} ml={0.25 * w} >

        <VStack  space={3} alignSelf="center">
          <Heading fontSize="md" alignSelf={'center'} mt={0.015 * h}>
            团长统计
          </Heading>
          {/* 团长销售总金额和退款总金额 */}

          <Box
            bg={'white'}
            // bg={'primary.400'}
            borderRadius="15"
            // height={0.3 * h}
            // w={0.95 * w}
            ml="2"
            mr="2"
            pb="2">
            <Center mt={0.02 * h} space={3}>
              <Image
                source={require('../image/calculate.png')}
                h={0.25 * h}
                w={0.15 * w}
                alt={'image'}
              />
              <Text fontSize="md" fontWeight={500} mt={0.01 * h}>
                总 销 售 金 额
              </Text>
              <Heading fontSize={'4xl'}>￥{totalSale.toFixed(2)}</Heading>
            </Center>
          </Box>
          {/* 下单人数&总订单数 */}
          <HStack  alignSelf="center">
            <Box
              bg={'white'}
              // bg={'primary.400'}
              borderRadius="15"
              height={0.2 * h}
              w={0.46 * w}
              ml="2"
              pb="2">
              <Center>
                <Image
                  source={require('../image/order_num.png')}
                  h={0.1 * h}
                  w={0.1 * h}
                  alt={'image'}
                />
                <Text fontSize="sm" fontWeight={500} mt={0.01 * h}>
                  订单总数
                </Text>
                <Heading fontSize={'xl'}>{orderCount}</Heading>
              </Center>
            </Box>
            <Box
              bg={'white'}
              // bg={'primary.400'}
              borderRadius="15"
              height={0.2 * h}
              w={0.46 * w}
              mr="2"
              pb="2">
              <Center>
                <Image
                  source={require('../image/sales.png')}
                  h={0.1 * h}
                  w={0.1 * h}
                  alt={'image'}
                />
                <Text fontSize="sm" fontWeight={500} mt={0.01 * h}>
                  下单人数
                </Text>
                <Heading fontSize={'xl'}>{customers}</Heading>
              </Center>
            </Box>
          </HStack>
          {/* 销售订单 */}
          <Box
            bg={'white'}
            // bg={'primary.400'}
            borderRadius="15"
            height={0.38 * h}
            // w={0.5 * w}
            ml="10"
            mr="10"
            pl="2"
            pb="2">
            <FlatList
              data={orderList}
              ListHeaderComponent={
                <Heading fontSize="md" alignSelf={'center'} mt={0.01 * h}>
                  销售订单
                </Heading>
              }
              renderItem={({item}) => (
                <HStack >
                  <Box w={0.5 * w} h={0.05 * h} >
                    <Center>
                    <Text>{item.groupTitle}</Text>
                    </Center>
                  </Box>
                  <Box w={0.5 * w} h={0.05 * h}>
                    <Center>
                    <Text color={'danger.600'}>
                      ￥ {item.orderPrice.toFixed(2)}
                    </Text>
                    </Center>
                  </Box>
                </HStack>
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        </VStack>
        <VStack space={3} alignSelf="center">
          <Heading fontSize="md" alignSelf={'center'} mt={0.015 * h}>
            团长统计
          </Heading>
          {/* 团长销售总金额和退款总金额 */}
          <Box
            bg={'white'}
            // bg={'primary.400'}
            borderRadius="15"
            // height={0.3 * h}
            // w={0.95 * w}
            ml="2"
            mr="2"
            pb="2">
            <Center mt={0.02 * h} space={3}>
              <Image
                source={require('../image/calculate.png')}
                h={0.25 * h}
                w={0.15 * w}
                alt={'image'}
              />
              <Text fontSize="md" fontWeight={500} mt={0.01 * h}>
                总 退 款 金 额
              </Text>
              <Heading fontSize={'4xl'}>￥{totalRefund.toFixed(2)}</Heading>
            </Center>
          </Box>

          {/* 下单人数&总订单数 */}
          {/* <HStack space={3} w={w} h={0.2 * h} alignSelf="center"> */}
          <HStack alignSelf="center">
            <Box
              bg={'white'}
              // bg={'primary.400'}
              borderRadius="15"
              height={0.2 * h}
              w={0.46 * w}
              ml="2"
              pb="2">
              <Center>
                <Image
                  source={require('../image/order_num.png')}
                  h={0.1 * h}
                  w={0.1 * h}
                  alt={'image'}
                />
                <Text fontSize="sm" fontWeight={500} mt={0.01 * h}>
                  订单总数
                </Text>
                <Heading fontSize={'xl'}>{orderCount}</Heading>
              </Center>
            </Box>
            <Box
              bg={'white'}
              // bg={'primary.400'}
              borderRadius="15"
              height={0.2 * h}
              w={0.46 * w}
              mr="2"
              pb="2">
              <Center>
                <Image
                  source={require('../image/sales.png')}
                  h={0.1 * h}
                  w={0.1 * h}
                  alt={'image'}
                />
                <Text fontSize="sm" fontWeight={500} mt={0.01 * h}>
                  下单人数
                </Text>
                <Heading fontSize={'xl'}>{customers}</Heading>
              </Center>
            </Box>
          </HStack>
          {/* 退款订单 */}
          <Box
            bg={'white'}
            // bg={'primary.400'}
            borderRadius="15"
            height={0.38 * h}
            // w={0.95 * w}
            ml="10"
            mr="10"
            pl="2"
            pb="2">
            <FlatList
              data={refundList}
              ListHeaderComponent={
                <Heading fontSize="md" alignSelf={'center'} mt={0.01 * h}>
                  退款订单
                </Heading>
              }
              renderItem={({item}) => (
                // <HStack space={1}>
                <HStack >
                  <Box w={0.5 * w} h={0.05 * h}>
                  <Center>
                    <Text>{item.groupTitle}</Text>
                    </Center>
                  </Box>
                  <Box w={0.5 * w} h={0.05 * h}>
                    <Center>
                    <Text color={'danger.600'}>
                      ￥ {item.orderPrice.toFixed(2)}
                    </Text>
                    </Center>
                  </Box>
                </HStack>
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        </VStack>
        </Box>
      </ScrollView>
    );
  } else {
    return (
      <Center>
        <Image
          source={require('../image/fail.png')}
          size={'lg'}
          alt={'image'}
        />
      </Center>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  input: {
    height: 45,
    padding: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 0,
  },
});

export default withRouter(StatisticView);
