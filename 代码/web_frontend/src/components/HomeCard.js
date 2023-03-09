import React, {Component} from 'react';
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    Button,
    Pressable,
} from 'native-base';
import {Link} from 'react-router-dom';

let w = window.innerWidth * 0.5;
let h = window.innerHeight;

const HomeCard = ({props, userId}) => {
    let title = props.groupTitle;
    if (props.groupTitle.length > 4) {
        title = props.groupTitle.substring(0, 4) + '...';
    }
    let storeName = props.user.userName;
    // console.log("storeName:", storeName);
    if (storeName.length > 6) {
        storeName = props.user.userName.substring(0, 6) + '...';
    }
    return (
        <Box
            alignItems="center"
            // height={0.25 * h}
            mx={0.03 * w}
            backgroundColor={'white'}
            marginBottom={0.02 * w}
            borderRadius="lg">
            <Box w={0.94 * w} rounded="lg" overflow="hidden">
                <Box>
                    <AspectRatio w="100%" ratio={16 / 6} borderRadius="lg" h={0.5 * w}>
                        <Image
                            source={{
                                uri: props.picture,
                            }}
                            alt="image"
                            borderRadius="lg"
                        />
                    </AspectRatio>
                </Box>
                <Stack height={0.1 * h}>
                    <Stack height={0.1 * h}>
                        <HStack height={0.05 * h}>
                            <Box w={0.2 * w} mt={0.02 * w}>
                                {props.state === 2 ? (
                                        // <Link to={{ pathname: '/SecKill', state: {props: props, userId: userId, addressId: -1}}}>
                                    // <Link
                                    //     to={{
                                    //         screen: 'SecKill',
                                    //         initial: false,
                                    //         params: {props: props, userId: userId, addressId: -1},
                                    //     }}>
                                        <Heading size="md" ml="0" mt={0.02 * h} color="#52525b">
                                            {title}
                                        </Heading>
                                    // </Link>
                                ) : (
                                    <Link to={{ pathname: '/Detail', state: {props: props, userId: userId}}}>
                                    {/*// <Link*/}
                                    {/*//     to={{*/}
                                    {/*//         screen: 'Detail',*/}
                                    {/*//         initial: false,*/}
                                    {/*//         params: {props: props, userId: userId},*/}
                                    {/*//     }}>*/}
                                        <Heading size="md" ml="0" mt={0.02 * h} color="#52525b">
                                            {title}
                                        </Heading>
                                    </Link>
                                )}
                            </Box>
                            <Box w={0.2 * w} mt={0.02 * w}>
                            <Text
                                fontSize="xl"
                                color="danger.600"
                                mt={0.015 * h}
                                // fontWeight="500"
                                thin>
                                ￥{props.goods[0].price.toFixed(2)}
                            </Text>
                            </Box>
                            <Box width={0.3 * w}  mt={0.02 * w}>
                                <Text
                                    fontSize="md"
                                    // ml={0.05 * w}
                                    mt={0.018 * h}
                                    color="gray.700">
                                    团长：{storeName}
                                </Text>
                            </Box>
                            <Button
                                size="lg"
                                variant="subtle"
                                colorScheme="danger"
                                ml={0.14 * w}
                                mt={0.02 * w + 0.015 * h}
                                color="danger.800">
                                订阅
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};


export default HomeCard;
