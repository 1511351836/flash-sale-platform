import React, {Component, useState} from 'react';
import {
  Box,
  Image,
  HStack,
  Heading,
  Text,
  AspectRatio,
  Stack,
  Pressable,
  ScrollView,
  FlatList,
  Flex,
  Spacer,
  VStack,
  Avatar,
  Button,
  Center,
  useToast,
  Input,
} from 'native-base';
import {timeStamp2String} from '../utils/parseTime';
import {collectGroup, judgeCollected} from '../service/groupService';
import {addToCart} from '../service/orderService';
import {FolderOpenOutlined, FolderOutlined, ScanOutlined, ShareAltOutlined} from "@ant-design/icons";
import {message} from "antd";
let w = window.innerWidth * 0.5;
let h = window.innerHeight;

const CommentCard = () => {
  const item = {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Afreen Khan',
    timeStamp: '12:47 PM',
    recentText:
      '孩子很喜欢，敏感肌也能用，已经是第二次回购了,感谢店家，物流很快',
    avatarUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  };
  return (
    <Box pl="4" pr="5" py="2">
      <HStack alignItems="center" space={3}>
        <Image
          size={0.3 * w}
          source={{
            uri: item.avatarUrl,
          }}
        />
        <VStack>
          <Text
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            bold>
            {item.fullName}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            w={0.6 * w}>
            {item.recentText}
          </Text>
        </VStack>
        {/*<Spacer />*/}
        <Text
          fontSize="xs"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          alignSelf="flex-start"
          ml={-0.15 * w}>
          {item.timeStamp}
        </Text>
      </HStack>
    </Box>
  );
};

export const GoodsCard = ({item, userId, groupId}) => {
  const toast = useToast();
  const callback = data => {
    // console.log('callback data:', data);
    if (data.status === 1) {
      message.success('成功加入购物车');
    } else {
      message.error('请重试！');
    }
  };

  // TODO 这里假设每次只能加入一件物品
  const onAddToCart = () => {
    const data = {
      userId: parseInt(userId),
      groupId: parseInt(groupId),
      goodsId: parseInt(item.goodsId),
      goodsNumber: 1,
    };
    console.log('on add to cart:', data);
    addToCart(data, callback);
  };
  return (
    <Box padding={0.01 * w} borderRadius={'md'}
         backgroundColor={'white'}
    >
      <HStack alignItems="center" space={3}>
        <Image
          size={0.20 * h}
          source={{
            uri: item.picture,
          }}
          alt={'img'}
          borderRadius={'sm'}
        />
        <VStack>
          <HStack>
            <VStack width={0.5* w}>
              <Text
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                w={0.3 * w}
                fontSize={'lg'}
                bold>
                {item.goodsName}
              </Text>
              <Text
                color="danger.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontSize={'lg'}
              >
                ￥{item.price.toFixed(2)}
              </Text>
            </VStack>
            <Button
              size="xs"
              height={0.06 * h}
              variant="subtle"
              colorScheme="danger"
              mt={0.005 * h}
              color="danger.800"
              onPress={() => onAddToCart()}>
              加入购物车
            </Button>
          </HStack>
          <Box w={0.5 * w}>
            <Text fontWeight="400" mt={0.02 * h} fontSize={'15px'}>
              商品简介：{item.goodsInfo}
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

const DetailCard = ({props, userId, myAddressId}) => {
  // console.log('detailCard:', props);
  // console.log('detailCard userId:', userId);
  // console.log('user:', props.user.userName);
  const tmpName = props.goods[0].goodsName;
  const startTime = timeStamp2String(props.startTime);
  const [goodName, setGoodName] = React.useState(props.goods[0].goodsName);
  const [picture, setPicture] = React.useState(props.goods[0].picture);
  const [goodsInfo, setGoodsInfo] = React.useState(props.goods[0].goodsInfo);
  const [price, setPrice] = React.useState(props.goods[0].price.toFixed(2));
  const [liked, setliked] = React.useState(0);
  const [collected, setCollected] = React.useState(0);
  const toast = useToast();

  // 添加目前是否是已收藏团购的判断
  const callback = (data) => {
    if (data.status == 0) {
      setCollected(1);
    }
  };
  React.useEffect(() => {
    const data = {userId: parseInt(userId), groupId: parseInt(props.groupId)};
    judgeCollected(data, callback);
  }, []);

  const collectCallback = data => {
    console.log('collectCallback:', data);
    if (data.status === 0) {
      if (collected === 0) {
        setCollected(1);
        // toast.show({
        //   description: '收藏成功！',
        //   variant: 'subtle',
        //   placement: 'top',
        // });
        message.success('收藏成功！');
      } else {
        setCollected(0);
        message.success('取消收藏成功！');
      }
    } else {
      message.error('请重试！');
    }
  };

  const onCollectGroup = () => {
    const data = {groupId: parseInt(props.groupId), userId: parseInt(userId)};
    // console.log('collectGroup:', data);
    collectGroup(data, collectCallback);
  };

  const onPressScan = () => {
    console.log("get scan!");
    message.warning('目前web端不支持分享功能，请下载手机APP获取更好体验！');
  }

  console.log('picture:', picture);
  console.log('goodsInfo:', goodsInfo);
  return (
    <Box alignItems="center"  maxW={w}>
      <Box width="100%" overflow="hidden">
        <Box width="100%">
            <AspectRatio
              width={w}
              height={0.6 * w}
              ratio={5 / 3}
              justifyContent="center"
              borderRadius="md"
              // backgroundColor="white"
              backgroundColor="primary.300"
            >
              <Image
                source={{
                  uri: props.picture,
                }}
                alt="image"
                resizeMode="cover"
                height={0.6 * w}
              />
            </AspectRatio>
        </Box>
        <Box backgroundColor="gray.800">
          <Stack
            paddingLeft="2%"
            paddingRight={'2%'}
            paddingY={'5%'}
            space={4}
            backgroundColor="gray.50">
            <HStack
              space={2}
              paddingLeft="3%"
              w={0.95 * w}
              justifyContent="space-between"
              borderRadius={'md'}
              backgroundColor="white">
              <Stack space={1} h={0.2 * h} w={0.7 * w}>
                <Heading size="md" ml="-1" bold>
                  {props.groupTitle}
                </Heading>
                {/*<Heading color="danger.600" fontWeight="light" size={'md'}>*/}
                {/*  {goodName} ￥{price}*/}
                {/*</Heading>*/}
                <Text
                  fontSize="sm"
                  _light={{
                    color: 'danger.500',
                  }}
                  _dark={{
                    color: 'violet.400',
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1">
                  商家名称：{props.user.userName}
                </Text>
                <Text
                  fontSize="sm"
                  color="coolGray.500"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  ml="-0.5"
                  fontWeight="400">
                  团购开始时间：{startTime}
                </Text>
                <Text
                  fontSize="sm"
                  _light={{
                    color: 'gray.500',
                  }}
                  _dark={{
                    color: 'violet.400',
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1">
                  团购持续时间：{props.duration}小时
                </Text>
              </Stack>
              <VStack space={2} w={0.3 * w} mt={0.01 * h}>
                <HStack space={4}>
                  <Pressable onPress={onPressScan}>
                    <ShareAltOutlined style={{ fontSize: '150%', marginRight:'75%', color:'#fb7185'}}/>
                  </Pressable>
                  <Pressable onPress={() => onCollectGroup()}>
                    {collected === 0 ? <FolderOpenOutlined style={{ fontSize: '150%', marginRight:'75%', color:'#fb7185'}}/> : <FolderOutlined style={{ fontSize: '150%', marginRight:'75%', color:'#fb7185'}}/>}
                  </Pressable>
                </HStack>
                <HStack space={1} ml={-0.15 * w}>
                  <Button
                    size="xs"
                    variant="subtle"
                    colorScheme="danger"
                    ml={0.15 * w}
                    mt={0.005 * h}
                    color="danger.900">
                    订阅团长
                  </Button>
                </HStack>
              </VStack>
            </HStack>

            <Box
              paddingLeft="3%"
              w={0.95 * w}
              backgroundColor={'white'}
              borderRadius={'md'}>
              <Heading fontWeight={'bold'} fontSize={'lg'} mb={0.02 * h}>
                团购信息
              </Heading>
              <Box
                backgroundColor={'white'}
                w={0.9 * w}
                borderRadius={'md'}
                // padding={0.02 * w}
              >
                <VStack space={0}>
                  <Text fontWeight="400">团购开始时间: {startTime}</Text>
                  <Text fontWeight="400" mt={0.02 * h}>
                    团购持续时间: {props.duration} 小时
                  </Text>
                  <Text fontWeight="400" mt={0.02 * h}>
                    配送方式: {props.delivery}
                  </Text>
                  <Text fontWeight="400" mt={0.02 * h}>
                    团购简介: {props.groupInfo}
                  </Text>
                </VStack>
              </Box>
            </Box>
            <Box >
              <Heading
                color="danger.600"
                fontWeight={'normal'}
                fontSize="18"
                paddingLeft="3%">
                商品
              </Heading>
              <FlatList
                data={props.goods}
                renderItem={({item}) => (
                  <Box mt={0.01 * h}>
                    <GoodsCard
                      item={item}
                      userId={userId}
                      groupId={props.groupId}
                    />
                  </Box>
                )}
                keyExtractor={item => item.goodsId}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

// export const styles = StyleSheet.create({
//   baseText: {
//     fontFamily: 'Cochin',
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   changeButton: {
//     backgroundColor: 'transparent',
//   },
// });

export default DetailCard;
