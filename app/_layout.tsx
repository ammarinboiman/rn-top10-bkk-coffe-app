import {
  Kanit_400Regular,
  Kanit_600SemiBold,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as splashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  //---Loading Fonts==--
  const [fontsLoaded] = useFonts({
    KanitRegular: Kanit_400Regular,
    KanitBold: Kanit_700Bold,
    KanitSemiBold: Kanit_600SemiBold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      splashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "Top10 Bangkok Coffee",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "KanitBold", color: "#ffffff" },
          headerTintColor: "#4A3B32",
          headerStyle: { backgroundColor: "#683c21" },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดร้าน",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontFamily: "KanitRegular", color: "#ffffff" },
          headerTintColor: "#ffff",
          headerStyle: { backgroundColor: "#683c21" },
        }}
      />
    </Stack>
  );
}
