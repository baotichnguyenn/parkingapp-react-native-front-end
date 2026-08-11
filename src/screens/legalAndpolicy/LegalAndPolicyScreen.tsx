import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "@/components/global/HeaderComp";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { moderateScale } from "react-native-size-matters";

const LegalAndPolicyScreen = () => {
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  // Calculate indicator height and position
  const indicatorHeight =
    ((scrollViewHeight / contentHeight) * scrollViewHeight) / 2.5;
  const indicatorPosition =
    (scrollY / (contentHeight - scrollViewHeight)) *
    (scrollViewHeight - indicatorHeight);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Legal & Policies"
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <ScrollView
        style={{ flex: 1 }}
        onScroll={(event) => {
          setScrollY(event.nativeEvent.contentOffset.y - 30);
        }}
        scrollEventThrottle={16}
        onContentSizeChange={(w, h) => setContentHeight(h)}
        onLayout={(event) =>
          setScrollViewHeight(event.nativeEvent.layout.height)
        }
      >
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>1. Terms</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
            ratione iste debitis iure vel et fugit reprehenderit eaque! Quae
            exercitationem sunt accusamus atque eveniet porro commodi
            reprehenderit odio at, nihil illo magni voluptatem dolorum neque
            deserunt provident est voluptates non molestias sequi ex vero quam
            ipsum animi? Sapiente voluptates esse consectetur dolorum magnam
            odit, enim eum consequatur odio doloribus. Saepe beatae asperiores
            repudiandae nostrum fuga quasi a provident. Expedita, animi odit
            nisi dolores similique tempora unde quaerat sit commodi amet
            asperiores aut deserunt temporibus quisquam ea ullam doloremque
            consectetur vel dignissimos. Delectus doloribus laboriosam
            perspiciatis quos quaerat. Accusamus quod explicabo recusandae vitae
            asperiores numquam, modi necessitatibus ullam aut voluptas in soluta
            adipisci incidunt pariatur, doloribus placeat dolore minima
            dignissimos cupiditate rerum! Laudantium, necessitatibus dolorum
            dolores quisquam aliquam harum saepe at tenetur dolorem consequuntur
            dicta sapiente. Velit, quisquam distinctio. Ullam voluptas, dolorem
            optio eos exercitationem quod cum fuga iure labore officiis
            voluptate laudantium, voluptates voluptatibus similique error
            quidem. Iure ullam odio, officia cumque facilis voluptatem totam,
            cum dolorem accusantium repellendus in itaque tempora neque. Facilis
            modi excepturi repudiandae ipsam cum iure, consectetur hic unde eos
            amet eveniet ea ducimus rem maxime recusandae doloribus mollitia
            temporibus! Nesciunt perspiciatis nisi sint, tempora laudantium
            temporibus voluptatum blanditiis doloribus est eveniet voluptatem
            minus consectetur eius commodi et nobis dolores suscipit fugit
            necessitatibus magni magnam numquam ex officiis corporis? Explicabo
            sunt officia rerum libero similique, error temporibus voluptatem
            dolores laboriosam vitae, consequuntur, voluptate eos. Quos vel in
            debitis impedit reiciendis, exercitationem, fugiat aspernatur
            laboriosam sequi, quidem quis rem quod? Sapiente consequuntur,
            maiores alias odio ducimus voluptate totam atque fuga voluptatibus
            accusantium, sed quae magni aliquid nisi. Harum molestiae commodi
            quibusdam laudantium placeat voluptatem fugiat doloribus, nemo,
            quisquam inventore minima ratione fuga aliquam aliquid minus facere,
            eligendi illo id repellat voluptatum. Praesentium aperiam neque,
            deleniti doloremque minima qui nostrum placeat! Recusandae a unde
            officia cupiditate quasi tenetur cumque iste amet itaque aut minima,
            deserunt deleniti rerum tempore ut cum inventore. Aperiam suscipit
            eligendi nisi quasi incidunt blanditiis dolorem praesentium
            veritatis inventore consequuntur quam esse quisquam provident
            accusantium debitis quae ducimus ipsam nesciunt, nihil itaque magni,
            ratione ad. Dolor labore porro ullam, expedita molestiae a
            repudiandae odio non hic delectus, optio tenetur voluptatibus,
            officiis nesciunt. Omnis, facere rem temporibus cum odio accusamus
            perferendis repellendus voluptas eveniet architecto rerum ad vero
            modi ducimus voluptatibus consectetur. Ab itaque ipsum, temporibus
            odio perferendis architecto quis debitis consequatur maiores sit
            officiis sed.{" "}
          </Text>

          <Text style={styles.sectionTitle}>2. Disclaimer</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero a
            incidunt tempore eius in asperiores maxime officia eligendi ipsam
            repellat. Dignissimos porro odio atque! Ab quis ipsa modi aperiam
            sint quod inventore atque placeat libero suscipit! Sint error
            similique exercitationem sit quaerat voluptates et iste repellendus
            aliquid voluptatum dolorem, fuga ex maxime magnam, enim natus,
            ratione quo officia nesciunt repellat aspernatur. Cumque nemo
            assumenda inventore, facilis, odio veniam quos incidunt eos porro
            debitis quibusdam voluptatibus rem? Placeat consectetur mollitia
            harum deserunt suscipit facere voluptatibus quas vitae dolorum
            aliquid beatae doloremque doloribus, ab dolore voluptatem nisi
            dolores iste ipsam distinctio quae voluptates! Corrupti rerum
            perferendis pariatur, a ea modi molestias animi deleniti, maiores
            similique minima mollitia repellendus, itaque iste eveniet facilis
            inventore aut consectetur! Possimus expedita accusantium eius nam
            veniam doloribus numquam nobis temporibus eveniet asperiores,
            aliquam omnis quia, nesciunt rerum tempora reprehenderit molestias
            dolorem aut maxime. Libero consectetur velit voluptates ipsum sed
            pariatur aut ipsam sapiente officiis ab voluptatem beatae non
            ducimus, reprehenderit debitis adipisci eveniet numquam! Quos
            consectetur odio mollitia, saepe corporis nesciunt deleniti quisquam
            repudiandae vel temporibus impedit necessitatibus? Ea optio porro
            magni error impedit illo asperiores quo possimus, nostrum assumenda
            in, vel consequuntur, nihil deserunt velit provident dolore
            recusandae voluptate! Commodi libero aut neque veniam, aliquid
            repellendus id officia assumenda natus ipsa veritatis, eveniet
            corrupti reprehenderit impedit suscipit quae facilis voluptate. Odio
            ipsam laboriosam voluptatem assumenda consequatur, odit culpa
            repudiandae libero doloribus delectus at. Quasi, dolorem similique
            molestias quidem corrupti quod recusandae debitis illo odit
            voluptates laborum eos! Quam asperiores consequuntur consequatur
            delectus dolorem laboriosam unde numquam voluptatem? Quae aliquid
            sequi expedita, dolore laudantium pariatur nihil harum quod nisi
            delectus eaque odio est beatae. Ullam aliquam corporis vero, harum
            similique voluptates doloribus illum quae sapiente esse voluptate
            repellat at quis nisi vitae velit! Eligendi rem illo quibusdam?
          </Text>
        </View>
      </ScrollView>
      <View style={styles.scrollBarContainer}>
        <View
          style={[
            styles.scrollBarIndicator,
            { height: indicatorHeight, top: indicatorPosition },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginTop: 15,

    color: "white",
  },
  paragraph: {
    fontSize: moderateScale(14),
    lineHeight: 24,
    paddingTop: 20,
    fontFamily: Fonts.medium,
    color: Colors.grey100,
  },
  scrollBarContainer: {
    position: "absolute",
    right: 13,
    top: 140,
    bottom: 10,
    width: 2,
    backgroundColor: Colors.scrollbar,
    borderRadius: 2.5,
  },
  scrollBarIndicator: {
    position: "absolute",
    width: 2,
    backgroundColor: Colors.primary,
    borderRadius: 2.5,
    // bottom: 10,
  },
});

export default LegalAndPolicyScreen;
