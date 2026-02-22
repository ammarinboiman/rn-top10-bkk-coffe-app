import { Text } from "@react-navigation/elements";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  //นำข้อมูลที่ส่งมาซึ่งอยู่ใน uselocalSearchParams มาเก็บไว้ในตัวแปร  เพื่อเรียกใช้งาน
  const params = useLocalSearchParams();

  //function สำหรับการกดโทรศัพท์ไปยังร้านกาแฟ
  const handleOpenPhoneApp = () => {
    const phoneNo = params.phone as string;
    const phoneUrl = `tel:${phoneNo}`;
    //เรียก app โทรศัพท์ขึ้นมาเเละส่งหมายเลขโทรศัพท์ไปให้
    Linking.openURL(phoneUrl);
  };

  //function เรียกใช้ MapView เพื่อเเสดงตำเเหน่งร้านกาแฟบนเเผนที่
  const handleOpenMapApp = () => {
    //สร้างตัวแปรเพื่อเปิด Google Maps
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longitude}`;

    //สร้างตัวแปรเพื่อเปิด Apple Maps
    const appleMap = `http://maps.apple.com/?q=${params.name}?&ll=${params.latitude},${params.longitude}`;

    //ตรวจสอบการเปิดแอป Google Maps หรือ Apple Maps โดยยึด Google Maps เป็นหลัก
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        source={{ uri: params.image_url as string }}
        style={{ width: "100%", height: 250 }}
      />
      <Text style={styles.shopName}>{params.name}</Text>
      <Text style={styles.shopDistrict}>{params.district}</Text>
      <Text style={styles.shopDescription}>{params.description}</Text>
      <TouchableOpacity style={styles.shopPhone} onPress={handleOpenPhoneApp}>
        <Text style={styles.shopPhoneText}>โทรศัพท์: {params.phone}</Text>
      </TouchableOpacity>
      <Text style={styles.shopMapText}>แผนที่ร้าน</Text>
      <View
        style={{
          padding: 15,
          paddingBottom: 30,
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <MapView
          style={styles.showMapView}
          initialRegion={{
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longitude as string),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(params.latitude as string),
              longitude: parseFloat(params.longitude as string),
            }}
            title={params.name as string}
            description={params.description as string}
            onPress={handleOpenMapApp}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  showMapView: {
    width: "100%",
    height: 300,
  },
  shopMapText: {
    fontFamily: "KanitSemiBold",
    marginLeft: 25,
    marginTop: 15,
  },
  shopPhoneText: {
    fontFamily: "KanitSemiBold",
    fontSize: 17,
    color: "#ffffff",
  },
  shopPhone: {
    padding: 15,
    borderWidth: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    borderRadius: 8,
    borderColor: "#7cf072",
    backgroundColor: "#10c000",
    alignItems: "center",
  },
  shopDescription: {
    fontFamily: "KanitRegular",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
  },
  shopDistrict: {
    fontFamily: "KanitRegular",
    marginLeft: 25,
    color: "#ABABAB",
  },
  shopName: {
    fontFamily: "KanitBold",
    fontSize: 20,
    marginLeft: 25,
    marginTop: 15,
  },
});
