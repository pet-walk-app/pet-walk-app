import NoStatusBarView from "../components/NoStatusBarView";
import CaregiverFound from "../components/CaregiverFound";
import { ScrollView } from "react-native";

export default function CaregiversFound({navigation}) {
  return (
    <NoStatusBarView padding={40}>
        <ScrollView>
            <CaregiverFound
                caregiverName = {'Marian'}
                price = {'60'}
            >
            </CaregiverFound>
            <CaregiverFound
                caregiverName = {'Marian'}
                price = {'60'}
            >
            </CaregiverFound>
            <CaregiverFound
                caregiverName = {'Marian'}
                price = {'60'}
            >
            </CaregiverFound>
            <CaregiverFound
                caregiverName = {'Marian'}
                price = {'60'}
            >
            </CaregiverFound>
            <CaregiverFound
                caregiverName = {'Marian'}
                price = {'60'}
            >
            </CaregiverFound>
        </ScrollView>

    </NoStatusBarView>
  );
}