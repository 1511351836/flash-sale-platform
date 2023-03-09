import React, {Component, useState} from 'react';
import {
    Center,
    ScrollView,
    Flex,
    FlatList,
    HStack,
    VStack,
    Box,
    Divider,
    Input,
    Text,
    Select,
    useToast,
    CheckIcon,
    Image, Pressable,
} from 'native-base';
import HomeCard from '../components/HomeCard';
import {ScanOutlined, SearchOutlined} from '@ant-design/icons';
import {getCollectedGroups, getGroupById} from '../service/groupService';
import BestSellerCarousel from "../components/BestSellerCarousel";
import MyHeader from "../components/Header";
import {message} from "antd";
import {withRouter} from "react-router";
import {DetailViewWrapper} from "./DetailView";

let w = window.innerWidth;
let h = window.innerHeight;

const HomeScreen = ({navigation}) => {
    // TODO 修改接口后内容也也要有所修改
    const [groups, setGroups] = useState([]);
    const [ori, setOri] = useState([]);
    const [Id, setId] = useState(0);
    const [groupAfterFiltrated, setGroupAfterFiltrated] = useState([]);
    let [service, setService] = React.useState('');
    let [defValue, setDefValue] = React.useState('allCollectedGroups');
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [grpSelected, setGrpSelected] = useState([]);
    const toast = useToast();

    const [refreshing, setRefreshing] = useState(true);

    const getColGroups = data => {
        let user = localStorage.getItem('userId');
        let user_json = JSON.parse(user);
        setId(parseInt(user_json));
        // console.log('userId:', data);
        const request = {userId: parseInt(user_json)};
        getCollectedGroups(request, callback);
    };

    const callback = data => {
        setRefreshing(false);
        if (data.status === 0) {
            setGroups(data.data);
            setIsLoading(false);
        }
    };

    const loadData = () => {
        setIsLoading(true);
        console.log('refresh:', isLoading);
        const request = {userId: Id};
        getCollectedGroups(request, callback);
    };

    // 获取当前用户
    React.useEffect(() => {
        let user = localStorage.getItem('userId');
        let user_json = JSON.parse(user);
        setId(parseInt(user_json));
        // console.log('userId:', data);
        const request = {userId: parseInt(user_json)};
        getCollectedGroups(request, callback);
        // setGroupAfterFiltrated(groupAfterFiltrated);
    }, []);



    // 对于团购的内容进行搜索过滤,基于团长或者是团购名称
    const searchItems = searchValue => {
        // console.log('searchValue:', searchValue);
        setSearchInput(searchValue);
        // console.log('searchInput:', searchInput);
        if (searchValue !== '') {
            let filteredData = [];
            groups.forEach(group => {
                // console.log(
                //   'debug: ',
                //   group.groupTitle.indexOf(searchInput),
                //   group.groupTitle,
                // );

                if (
                    group.groupTitle.indexOf(searchValue) === -1 &&
                    group.user.userName.indexOf(searchValue) === -1
                ) {
                    // console.log('group.groupTitle:', group.groupTitle);
                    return;
                }
                filteredData.push(group);
            });
            setGroupAfterFiltrated(filteredData);
        } else {
            // console.log('get here!');
            setGroupAfterFiltrated(groups);
        }
    };

    const onPressScan = () => {
        console.log("get scan!");
        // toast.show({
        //     description: '目前web端不支持扫码功能，请下载手机APP获取更好体验！',
        //     variant: 'subtle',
        //     placement: 'top',
        // });
        message.warning('目前web端不支持扫码功能，请下载手机APP获取更好体验！');
    }


    if (groups != []) {
        // console.log('group in homeScreen :', groups);
        return (
            <>
                <MyHeader/>
                <Center ml={0.02 * w}>
                    <HStack>
                        <VStack
                            // my={0.05 * w}
                            ml={0.03 * w}
                            mt={0.05 * h}
                            h={0.1 * h}
                            space={4}
                            // backgroundColor={'pink.300'}
                            w="80%"
                            divider={
                                <Box px="2">
                                    <Divider />
                                </Box>
                            }>
                            <VStack w="100%" space={5} alignSelf="center">
                                <Input
                                    placeholder="按团长\商品名称进行查找"
                                    width="100%"
                                    borderRadius="4"
                                    // py="3"
                                    // px="1"
                                    fontSize="14"
                                    InputLeftElement={
                                        // <Icon
                                        //     m="2"
                                        //     ml="3"
                                        //     size="6"
                                        //     color="gray.400"
                                        //     as={AntDesign}
                                        //     name={'search1'}
                                        // />
                                        <SearchOutlined style={{ fontSize: '150%', color:'#9f1239'}}/>
                                    }
                                    onChangeText={text => {
                                        setSearchInput(text);
                                        searchItems(text);
                                    }}
                                />
                            </VStack>
                        </VStack>
                        <VStack
                            mt={0.05 * h}
                            space={0}
                            h={0.1 * h}
                            // backgroundColor={'primary.300'}
                        >
                            <Box>
                                <Pressable onPress={onPressScan}>
                                    <ScanOutlined style={{ fontSize: '150%', marginRight:'75%'}}/>
                                        {/*<Link to={{screen: 'QrCodeScanner', initial: false}}>*/}
                                    <Text size={'md'} color={'gray.700'} ml={'9%'}>
                                        扫码
                                    </Text>
                                </Pressable>
                            </Box>
                        </VStack>
                    </HStack>
                </Center>
                <Flex
                    direction="column"
                    // mb="2.5" mt="1.5"
                >
                    <Center width={w}>
                        {searchInput.length >= 1 ? (
                            <FlatList
                                ListFooterComponent={
                                    groupAfterFiltrated.length === 0 ? (
                                        <Center>
                                            <Image
                                                source={require('../image/empty.png')}
                                                h={0.21 * h}
                                                w={0.21 * h}
                                            />
                                            <Text color={'gray.500'}>
                                                暂时没有任何收藏团购，
                                            </Text>
                                            <Text color={'gray.500'}>
                                                去“附近拼团”逛逛吧
                                            </Text>
                                        </Center>
                                    ) : (
                                        <Box h={0.15 * h} />
                                    )
                                }
                                // data={groups}
                                data={groupAfterFiltrated}
                                renderItem={({item}) => <HomeCard props={item} userId={Id} />}
                                keyExtractor={item => item.groupId}
                                refreshing={isLoading}
                                onRefresh={loadData}
                            />
                        ) : (
                            <FlatList
                                ListFooterComponent={
                                    grpSelected.length === 0 && groups.length === 0 ? (
                                        <Center>
                                            <Image
                                                source={require('../image/empty.png')}
                                                h={0.21 * h}
                                                w={0.21 * h}
                                            />
                                            <Text color={'gray.500'}>
                                                暂时没有任何收藏团购，
                                            </Text>
                                            <Text color={'gray.500'}>
                                                去“附近拼团”逛逛吧
                                            </Text>
                                        </Center>
                                    ) : (
                                        <Box h={0.15 * h} />
                                    )
                                }
                                // data={groups}
                                // data={groupAfterFiltrated}
                                data={grpSelected.length === 0 ? groups : grpSelected}
                                renderItem={({item}) => <HomeCard props={item} userId={Id} />}
                                keyExtractor={item => item.groupId}
                                refreshing={isLoading}
                                onRefresh={loadData}
                            />
                        )}
                    </Center>
                </Flex>
            </>
        );
    } else {
        return (
            <Center>
                <Image source={require('../image/empty.png')} h={0.3 * h} w={0.3 * h} />
            </Center>
        );
    }
};

export default withRouter(HomeScreen);
