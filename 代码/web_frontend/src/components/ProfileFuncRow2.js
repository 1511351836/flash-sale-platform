import { View, Dimensions } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Text,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  VStack,
  Pressable,
  Spacer,
} from "native-base";
import {message} from "antd";
// import {Link} from '@react-navigation/native';
import { Link } from "react-router-dom";

import { useEffect } from "react";

let w = window.innerWidth ;
let h = window.innerHeight;

// 团长功能
const AdminOptions = ({ userId, props }) => {
  console.log('AdminOptions ---userId: ', userId)
  console.log('AdminOptions ---props: ', props)
  return (
    <>
      <Pressable py="3" flex={1} alignItems="center">
        <Image
          mb="5%"
          opacity={0.5}
          source={require("../image/group.png")}
          size="30px"
          alt="delivery"
        />
        {/* <Link
          to={{
            screen: 'AdminGroupList',
            initial: false,
            params: {userId: userId},
          }}> */}
        <Link to={{ pathname: "/AdminGroupList", state: { userId: userId } }}>
          <Text fontSize="xs">团购管理</Text>
        </Link>
        {/*<Text fontSize="xs">配送地址</Text>*/}
      </Pressable>

      <Pressable
        py="3"
        flex={1}
        alignItems="center"
        /*onPress={() => navigation.replace('QrCodeScanner')}*/
      >
        <Image
          mb="5%"
          opacity={0.5}
          source={require("../image/qrscan.png")}
          size="30px"
          alt="refresh"
        />
        {/*<Link to={{ screen: "QrCodeScanner", initial: false }}>*/}
          <Pressable onPress={()=>{message.warning("目前web端不支持扫码功能，请下载手机APP获得更佳体验！")}}>
          <Text fontSize="xs">扫码</Text>
          </Pressable>
          {/*</Link>*/}
      </Pressable>

      {/*董云鹏*/}
      <Pressable
        py="3"
        flex={1}
        alignItems="center"
        /*onPress={() => navigation.replace('QrCodeScanner')}*/
      >
        <Image
          mb="5%"
          opacity={0.5}
          source={require("../image/script.png")}
          size="30px"
          alt="refresh"
        />
        {/* <Link to={{ screen: "OrderView", initial: false }}>
          <Text fontSize="xs">订单统计</Text>
        </Link> */}
        <Link to={{ pathname: '/StatisticView', state: {props: props, userId: userId}}}>
          <Text fontSize="xs">订单统计</Text>
          </Link>
      </Pressable>

      {/*<Pressable py="3" flex={1} alignItems="center">*/}
      {/*  /!*<Image*!/*/}
      {/*  /!*    mb="5%"*!/*/}
      {/*  /!*    opacity={0.5}*!/*/}
      {/*  /!*    source={require('../image/script.png')}*!/*/}
      {/*  /!*    size="30px"*!/*/}
      {/*  /!*    alt="feedback"*!/*/}
      {/*  /!*>/*/}
      {/*  /!*<Link to={{screen: 'AdminOrderList', initial: false}}>*!/*/}
      {/*  /!*  <Text fontSize="xs">订单管理</Text>*!/*/}
      {/*  /!*</Link>*!/*/}
      {/*</Pressable>*/}

      <Pressable py="3" flex={1} alignItems="center">
        {/* <Image
          mb="5%"
          opacity={0.5}
          source={require('../image/location.png')}
          size="30px"
          alt="address"
        />
        <Link to={{screen: 'AdminGroupList', initial: false}}>
        <Text fontSize="xs">收货地址</Text>
        </Link> */}
      </Pressable>
    </>
  );
};

// 团员功能
const UserOptions = ({ userId }) => {
  return (
    <>
      <Pressable py="3" flex={1} alignItems="center">
        <Image
          mb="5%"
          opacity={0.5}
          source={require("../image/location.png")}
          size="30px"
          alt="address"
        />
          <Pressable onPress={()=>{message.warning("目前web端不支持查看历史地址，请下载手机APP获得更佳体验！")}}>
              <Text fontSize="xs">收货地址</Text>
          </Pressable>
        {/*</Link>*/}
      </Pressable>

      <Pressable
        py="3"
        flex={1}
        alignItems="center"
        /*onPress={() => navigation.replace('QrCodeScanner')}*/
      >
        <Image
          mb="5%"
          opacity={0.5}
          source={require("../image/qrscan.png")}
          size="30px"
          alt="refresh"
        />
          <Pressable onPress={()=>{message.warning("目前web端不支持扫码功能，请下载手机APP获得更佳体验！")}}>
              <Text fontSize="xs">扫码</Text>
          </Pressable>
      </Pressable>

      <Pressable py="3" flex={1} alignItems="center">
        {/* <Image
          mb="5%"
          opacity={0.5}
          source={require('../image/inbox.png')}
          size="30px"
          alt="feedback"
        />
        <Link to={{screen: 'AdminOrderList', initial: false}}>
          <Text fontSize="xs">订单管理</Text>
        </Link> */}
      </Pressable>

      <Pressable py="3" flex={1} alignItems="center">
        {/* <Image
          mb="5%"
          opacity={0.5}
          source={require('../image/script.png')}
          size="30px"
          alt="delivery"
        />
        <Link to={{screen: 'AdminGroupList', initial: false}}>
          <Text fontSize="xs">团购管理</Text>
        </Link> */}
      </Pressable>
    </>
  );
};

const ProfileFuncRow2 = ({ userId, props }) => {
  const [option, setOption] = useState(1);
  const [hint, setHint] = useState("切换团长功能");
  const [title, setTitle] = useState("团员功能");

  // 切换团长/团员功能
  const changeOption = () => {
    setOption((prevOption) => prevOption * -1);
    // console.log('checking', option);
  };

  const applyOption = () => {
    // console.log("here0")
    if (option === 1) {
      // console.log('here1');
      return <UserOptions userId={userId} />;
    } else if (option === -1) {
      return <AdminOptions userId={userId} props={props} />;
    }
  };

  const changeHintOption = () => {
    if (option === 1) {
      // console.log('here1');
      setHint("切换团员功能");
    } else if (option === -1) {
      setHint("切换团长功能");
    }
  };

  const changeOptionTitle = () => {
    if (option === 1) {
      // console.log('here1');
      setTitle("团长功能");
    } else if (option === -1) {
      setTitle("团员功能");
    }
  };

  useEffect(() => {
    // console.log('checking2', option);
  });

  return (
    <View>
      <VStack>
        <Box bg={"#fff"} mb={2}>
          <HStack>
            <Heading fontSize="14" ml="4" mt="4" opacity={0.6}>
              {title}
            </Heading>
            <Spacer />
            <Box mr="4" alignSelf={"center"}>
              <Center>
                <HStack>
                  <Pressable
                    onPress={() => {
                      changeOption();
                      changeHintOption();
                      changeOptionTitle();
                      // console.log('pressed');
                    }}
                  >
                    <Heading
                      fontSize="11"
                      ml="4"
                      mt="4"
                      // mr="4"
                      alignSelf={"center"}
                      opacity={0.4}
                    >
                      {/* 切换团长功能 */}
                      {hint}
                    </Heading>
                  </Pressable>
                  <Image
                    mt="15%"
                    opacity={0.3}
                    source={require("../image/arrowR.png")}
                    size="18px"
                    alt="arrowR"
                  />
                </HStack>
              </Center>
            </Box>
          </HStack>
          <Divider
            bg="darkText"
            thickness="2"
            alignSelf={"center"}
            // ml="4"
            // mr="10"
            mt="4"
            mb="0"
            // width={0.9 * w}
            opacity={0.1}
            orientation="horizontal"
          />
          <Box bg={"#fff"} mb={2}>
            <HStack justifyContent="space-between" mt={1}>
              {/* <UserOptions /> */}
              {applyOption()}
            </HStack>
          </Box>
        </Box>
      </VStack>
    </View>
  );
};

export default ProfileFuncRow2;
