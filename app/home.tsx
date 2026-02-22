import { supabase } from "@/services/supabase";
import { CoffeeShop } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  //สร้าง state เพื่อเก็บข้อมูลที่ดึงมาจาก Supabase
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  //ดึงข้อมูลจาก Supabase  ตอนหน้าจอเปิดขึ้นมา
  useEffect(() => {
    //ฟังก์ชันสำหรับดึงข้อมูลจาก Supabase
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        Alert.alert(
          "คำเตือน",
          "พบปัญหาในการดึงข้อมูลจากฐานข้อมูล กรุณาตรวจสอบ Internet และลองใหม่อีกครั้ง",
        );
      } else {
        setCoffeeShops(data);
      }
    };
    //เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล Supabase ให้ทำงาน
    fetchCoffeeShops();
  }, []);

  //function สำหรับรูปร่างหน้าตาของเเต่ละรายการทีจะเเสดงผลใน Flatlist
  const showRenderItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.itemShow}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            district: item.district,
            image_url: item.image_url,
            phone: item.phone,
            latitude: item.latitude,
            longitude: item.longitude,
            description: item.description,
          },
        })
      }
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <View style={{ padding: 15, flex: 1, justifyContent: "center" }}>
        <Text style={{ fontFamily: "KanitSemiBold" }}>{item.name}</Text>
        <Text>{item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={coffeeShops} //ข้อมูลใน state ที่เก็บค่าที่ดึงมาจาก Supabase
        renderItem={showRenderItem} //รูปร่างหน้าตาในเเต่ละรายการที่จะแสดงผลใน FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemShow: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#b5b5b5",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    padding: 10,
    alignItems: "center",
  },
});
