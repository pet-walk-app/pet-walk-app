import NoStatusBarView from "../components/NoStatusBarView";
import CaregiverFound from "../components/CaregiverFound";

import { ScrollView } from "react-native";

export default function CaregiversFound({ route, navigation }) {
  const { applications } = route.params.walkData || {};
  const { id: offerId } = route.params.walkData || {};

  return (
    <NoStatusBarView padding={20}>
      <ScrollView>
        {applications?.map((application) => {
          const { caregiver, id: applicationId } = application;
          const caregiverId = application.id;
          return (
            <CaregiverFound
              key={applicationId}
              caregiverData = {caregiver}
              navigation={navigation}
              offerId={offerId}
              caregiverId={caregiverId}
            />
          );
        })}
      </ScrollView>
    </NoStatusBarView>
  );
}
