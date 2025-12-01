import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../components/styles";
import SideProfileOption from "../../components/SideProfileOption";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import PrimaryButton from "../../components/PrimaryButton";
import GradientText from "../../components/GradientText";
import {COLORS} from '../../constants/Theme';
import { LinearGradient } from "expo-linear-gradient";

const AdminSideProfile = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.sideProfileContainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("FullProfile")}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderTop}>
            <ProfilePicture width={100} height={100} source={profile} />
            <LinearGradient 
               colors={COLORS.primary} 
               start={{x:0,y:0}}
               end={{x:1,y:0}}
               style={styles.profileCompleteNumber}>
              <Text style={styles.profileCompleteNumberText}>70%</Text>
            </LinearGradient>
          </View>
          <View style={styles.profileHeaderBottom}>
            <GradientText colors={COLORS.primary} style={styles.name} text={'Bobby Fisher'} />
            <Text style={styles.sub}>Guitarist</Text>
            <Text style={styles.location}>Guwahati, Assam</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statsPopular}>
          <View style={styles.statsFollow}>
            <Text style={styles.statsFollowText}>Followers</Text>
            <Text style={styles.statsFollowNumber}>45</Text>
          </View>
          <View style={styles.statsFollow}>
            <Text style={styles.statsFollowText}>Following</Text>
            <Text style={styles.statsFollowNumber}>54</Text>
          </View>
        </View>
        <View style={styles.statsInteraction}>
          <Text>Profile View: 345</Text>
          <Text style={{ marginBottom: 20 }}>Post Impressions: 766</Text>
        </View>
      </View>

      {/* side panel options */}
      <View style={styles.sidePanelContainer}>
        <SideProfileOption
          icon={<FontAwesome5 name="calendar-day" size={20} color="black" />}
          label="Artist Itinerary"
          onPress={() => navigation.navigate('ArtistItenerary')}
        />
        <SideProfileOption
          icon={<FontAwesome5 name="headphones" size={20} color="black" />}
          label="My sessions"
          onPress={() => navigation.navigate('MySessions')}
        />
        <SideProfileOption
          icon={<FontAwesome5 name="guitar" size={20} color="black" />}
          label="My Gigs"
          onPress={()=> navigation.navigate('MyGigs')}
        />
        {/* <SideProfileOption
          icon={<FontAwesome5 name="list" size={20} color="black" />}
          label="My SetList"
        />
        <SideProfileOption
          icon={<FontAwesome5 name="money-bill" size={20} color="black" />}
          label="Your Earnings"
        />
        <SideProfileOption
          icon={<FontAwesome5 name="box-open" size={20} color="black" />}
          label="Subscription"
        /> */}
      </View>

      <PrimaryButton width={230} height={50} text={'Sign out'} onPress={()=>{console.log('signed out')}} />
    </ScrollView>
  );
};

export default AdminSideProfile;