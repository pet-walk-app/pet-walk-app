import NoStatusBarView from "../components/NoStatusBarView";
import CaregiverFound from "../components/CaregiverFound";

import { useEffect } from "react";
import { ScrollView } from "react-native";

export default function CaregiversFound({ route, navigation }) {
  const { applications } = route.params.walkData || {};

  useEffect(() => {
    console.log("CaregiversFound view has been loaded");
    console.log(applications[0]);
  }, []);

  return (
    <NoStatusBarView padding={20}>
      <ScrollView>
        {applications?.map((application) => {
          const { caregiver, id } = application;
          return (
            <CaregiverFound
              key={id}
              caregiverName={caregiver.name || "Nieznane imię"}
              phone={caregiver.phone} 
              navigation={navigation}
              img={caregiver.caregiver.images?.[0]?.url || null}
              caregiverId
            />
          );
        })}
      </ScrollView>
    </NoStatusBarView>
  );
}
