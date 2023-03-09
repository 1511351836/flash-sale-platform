import {VStack, Heading, Box} from 'native-base';
import React, {Component, useState} from 'react';
import CartList from '../components/CartList';
import {getCart} from '../service/orderService';
import {withRouter} from "react-router";

let w = window.innerWidth * 0.5;
let h = window.innerHeight;

export class CartViewWrapper extends React.Component{
  render() {
    const { groupId, userId } = this.props.location.state || {};
    console.log('CartView screen wrapper props: ', groupId);
    console.log('CartView screen wrapper userId: ', userId);
    return(
        <CartView groupId={groupId} userId={userId}/>
    );
  }
}
export function CartView({groupId, userId}) {
  const [cart, setCart] = useState([]);
  const cartCallback = data => {
    // console.log('cartCallback:', data);
    setCart(data.data);
  };
  const onGetCart = () => {
    const data = {groupId: groupId, userId: userId};
    getCart(data, cartCallback);
  };

  React.useEffect(() => {
    onGetCart();
  }, []);
  // console.log('CartView props:', cart);
  return (
    <Box maxW={w} marginLeft={0.5 * w} backgroundColor={'gray.50'}>
      {/* <View style={styles.container}> */}
      {/*<ScrollView>*/}
      <VStack w="100%" space={3} alignSelf="center">
        <Heading fontSize="md" alignSelf={'center'} style={{
          marginTop: 20,
          marginBottom: 0,
        }}>
          我的购物车
        </Heading>
      </VStack>
      {/*</ScrollView>*/}
        <CartList props={cart.cartItems} />
    </Box>
  );
}

export default withRouter(CartViewWrapper);
