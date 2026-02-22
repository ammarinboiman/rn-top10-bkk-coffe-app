import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const coffeeshopImg = require("@/assets/images/coffeeshop.png");

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    //  โค้ดตั้งเวลานับถอยหลัง 3วินาที.
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);
    //สั่งให้โค้ดนับถอยหลังเเละหยุดทำงาน
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={coffeeshopImg} style={styles.showImg} />
      <Text style={styles.showAppName}>Top 10 Bangkok Coffee Shops</Text>
      <Text style={styles.showAppDetail}>ที่สุดของกาแฟในกรุงเทพฯ</Text>
      <ActivityIndicator size="large" color="#683c21" />
    </View>
  );
}

const styles = StyleSheet.create({
  showAppName: {
    fontFamily: "KanitBold",
    fontSize: 26,
    marginTop: 21,
    color: "#683c21",
  },
  showAppDetail: {
    fontFamily: "KanitRegular",
    fontSize: 18,
    marginTop: 21,
    marginBottom: 21,
    color: "#999999",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  showImg: {
    width: 150,
    height: 150,
  },
});
