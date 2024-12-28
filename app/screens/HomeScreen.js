import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { colors, parameters } from '../global/styles';
import Findridenav from '../navs/Findridenav';
import Createridenav from '../navs/Createridenav';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon1}>
          <Icon type="material-community" name="menu" size={40} />
        </View>
      </View>
      
      <View style={styles.herosec}>
        <Image style={styles.image1} source={require('../assets/group.jpg')} />
        <View style={styles.caption}>
          <Text style={styles.captionText}>Make your travelling affordable</Text>
          <Text style={styles.captionText}>Find someone who wants to share</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Findridenav')}>
        <Text style={styles.buttonText}>Find a Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Createridenav')}>
        <Text style={styles.buttonText}>Create a Ride</Text>
      </TouchableOpacity>
      
      <View style={styles.view5}>
        <View style={styles.view6}>
          <View style={styles.view7}>
            <Icon type="material-community" name="map-marker" color={colors.black} size={22} />
          </View>
          <View>
            <Text style={{ fontSize: 18, color: colors.black }}>32 Olivia Rd</Text>
            <Text style={{ color: colors.grey3 }}>Klipfontein 83-Ir, Boksburg</Text>
          </View>
        </View>
        <Icon type="material-community" name="chevron-right" color={colors.grey} size={26} />
      </View>
      
      <View style={{ ...styles.view5, borderBottomWidth: 0 }}>
        <View style={styles.view6}>
          <View style={styles.view7}>
            <Icon type="material-community" name="map-marker" color={colors.black} size={22} />
          </View>
          <View>
            <Text style={{ fontSize: 18, color: colors.black }}>32 Olivia Rd</Text>
            <Text style={{ color: colors.grey3 }}>Klipfontein 83-Ir, Boksburg</Text>
          </View>
        </View>
        <Icon type="material-community" name="chevron-right" color={colors.grey} size={26} />
      </View>  
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.white,
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },
  icon1: {
    marginLeft: 10,
    marginTop: 5,
  },
  herosec: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image1: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  caption: {
    marginTop: 0,
    alignSelf: 'center',
  },
  captionText: {
    color: colors.black,
    fontSize: 16,
    alignSelf:'center',
  },
  button1: {
    marginTop: 20,
    backgroundColor: colors.black,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  button2: {
    marginTop: 10,
    backgroundColor: colors.grey,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  view5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
  },
  view6: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
});
