// import {Dimensions, View} from 'react-native';
import React from 'react';
import {
  Box,
  Button,
  Icon,
  Image,
  NativeBaseProvider,
  Stack,
    View,
  Text,
  VStack,
} from 'native-base';
import {history} from "../utils/history";
import {withRouter} from "react-router";
import {PaymentDetailsWrapper} from "./PaymentDetailsView";
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Link} from '@react-navigation/native';
let w = window.innerWidth;
let h = window.innerHeight;


const PaymentDoneView = () => {
    const onPressDone = () => {
        history.push("/home");
    }
  return (
    <NativeBaseProvider >
        <Box ml={0.25 * w} >
          <Button size="30px" m="3" bg="transparent">
            <Image
              mb="5%"
              opacity={0.4}
              source={require('../image/arrowL.png')}
              size="30px"
              alt="arrowL"
            />
          </Button>
          <Box height={0.7 * h} bg={"gray.100"} m="7" borderRadius="30" w={0.5 * w}>
            <VStack>
              <Image
                mb="5%"
                opacity={0.6}
                source={require('../image/done.png')}
                size="100px"
                alt="done"
                alignSelf={'center'}
                //   justifyItems="center"
                mt="120"
              />
              <Text alignSelf={'center'}>付款成功！</Text>
            </VStack>
            <Stack
              mb="2.5"
              mt="20"
              direction={{
                base: 'column',
                md: 'row',
              }}
              space={2}
              mx={{
                base: 'auto',
                md: '0',
              }}>
              <Button
                size="sm"
                // variant="outline"
                colorScheme="danger"
                width={0.25 * w}
                ml={0.125 * w}
                onPress={onPressDone}>
                回到主页
              </Button>
            </Stack>
          </Box>
        </Box>
    </NativeBaseProvider>
  );
};

// export default PaymentDoneView;
export default withRouter(PaymentDoneView);
