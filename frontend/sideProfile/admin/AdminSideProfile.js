import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { styles } from "../../components/styles";
import PrimaryButton from "../../components/PrimaryButton";
import {COLORS} from '../../constants/Theme';
import ProfilePicture from '../../components/ProfilePicture'
import profile from '../../assets/icon.png'

const AdminSideProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <ScrollView
      style={styles.sideProfileContainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderTop}>
            <ProfilePicture width={100} height={100} source={profile} />
          </View>
          <View style={styles.profileHeaderBottom}>
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

      <PrimaryButton
        width={230}
        height={50}
        text={'Sign out'}
        onPress={() => {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: "AuthLanding" }],
          });
        }}
      />
    </ScrollView>
  );
};

export default AdminSideProfile;