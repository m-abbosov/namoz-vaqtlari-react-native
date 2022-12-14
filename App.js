import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { FlatGrid } from "react-native-super-grid";

import TongIcon from "./assets/images/Tong.png";
import SunIcon from "./assets/images/Quyosh.png";
import PeshinIcon from "./assets/images/Peshin.png";
import AsrIcon from "./assets/images/Asr.png";
import ShomIcon from "./assets/images/Shom.png";
import XuftonIcon from "./assets/images/Xufton.png";

export default function App() {
  const [city, setCity] = useState("Toshkent");
  const [data, setData] = useState([]);
  const [time, setTime] = useState(
    `${
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : new Date().getHours()
    }:${
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes()
    }:${
      new Date().getSeconds() < 10
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds()
    }`
  );
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "April",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  let weekDays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];

  const countries = [
    "Andijon",
    "Buxoro",
    "Farg'оna",
    "Guliston",
    "Jizzax",
    "Namangan",
    "Navoiy",
    "Nukus",
    "Qarshi",
    "Samarqand",
    "Termiz",
    "Toshkent",
    "Xiva",
  ];
  useEffect(() => {
    setInterval(() => {
      setTime(
        `${
          new Date().getHours() < 10
            ? `0${new Date().getHours()}`
            : new Date().getHours()
        }:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }:${
          new Date().getSeconds() < 10
            ? `0${new Date().getSeconds()}`
            : new Date().getSeconds()
        }`
      );
    }, 1000);

    axios
      .get(`https://islomapi.uz/api/present/day?region=${city}`)
      .then((res) => {
        setData([
          {
            id: 0,
            title: "Bomdod",
            icon: TongIcon,
            time: res.data.times.tong_saharlik,
          },
          {
            id: 1,
            title: "Quyosh",
            icon: SunIcon,
            time: res.data.times.quyosh,
          },
          {
            id: 2,
            title: "Peshin",
            icon: PeshinIcon,
            time: res.data.times.peshin,
          },
          {
            id: 3,
            title: "Asr",
            icon: AsrIcon,
            time: res.data.times.asr,
          },
          {
            id: 4,
            title: "Shom",
            icon: ShomIcon,
            time: res.data.times.shom_iftor,
          },
          {
            id: 5,
            title: "Xufton",
            icon: XuftonIcon,
            time: res.data.times.hufton,
          },
        ]);
      });
  }, [city]);

  const renderItem = (item) => {
    return (
      <View
        style={
          item.time.split(":")[0] >= new Date().getHours() &&
          item.time.split(":")[1] >= new Date().getMinutes()
            ? styles.activeCard
            : styles.card
        }
        key={("card-", item.id)}
      >
        <Text
          style={{
            fontSize: 20,
            color:
              item.time.split(":")[0] >= new Date().getHours() &&
              item.time.split(":")[1] >= new Date().getMinutes()
                ? "#008653"
                : "white",
            fontWeight: "600",
          }}
        >
          {item.title}
        </Text>
        <Image source={item.icon} style={{ width: 50, height: 50 }} />
        <Text
          style={{
            fontSize: 20,
            color:
              item.time.split(":")[0] >= new Date().getHours() &&
              item.time.split(":")[1] >= new Date().getMinutes()
                ? "#008653"
                : "white",
            fontWeight: "600",
          }}
        >
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("./assets/images/back-img.jpg")}
      style={styles.container}
    >
      <Text style={styles.pageTitle}>Namoz Vaqtlari</Text>
      <View style={styles.line} />
      <View style={styles.regions}>
        <Text style={styles.regionsTitle}>Hududni tanlang:</Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem) => {
            setCity(selectedItem);
          }}
          defaultValue={city}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.box}>
        <View style={styles.cityBox}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: "white",
            }}
          >
            Mintaqa: <Text style={{ color: "#ffc700" }}>{city} shahri</Text>
          </Text>
        </View>

        <View style={styles.timeBox}>
          <Image
            source={require("./assets/images/calendar.png")}
            style={{ width: 50, height: 50 }}
          />
          <View style={styles.dayBox}>
            <Text
              style={{
                fontSize: 14,
                color: "#ffc700",
                fontWeight: "600",
              }}
            >
              {weekDays[new Date().getDay()]}, {new Date().getDate()}-
              {months[new Date().getMonth()]}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {new Date().getFullYear()}-yil
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontWeight: "600",
              width: 95,
            }}
          >
            {time}
          </Text>
        </View>
      </View>
      <View style={{ height: 300 }}></View>
      <FlatGrid
        itemDimension={100}
        data={data}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => renderItem(item)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 15,
  },
  pageTitle: {
    fontSize: 36,
    color: "white",
    fontWeight: "600",
  },
  line: {
    height: 3,
    backgroundColor: "white",
    width: "60%",
    marginVertical: 20,
  },
  regions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  regionsTitle: {
    fontSize: 18,
    color: "white",
  },
  box: {
    alignItems: "center",
    marginBottom: 25,
  },
  cityBox: {
    marginVertical: 20,
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayBox: {
    marginHorizontal: 10,
  },
  gridView: {
    position: "absolute",
    bottom: 100,
  },
  card: {
    alignItems: "center",
    backgroundColor: " rgba(255, 255, 255, 0.4)",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeCard: {
    backgroundColor: " rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
