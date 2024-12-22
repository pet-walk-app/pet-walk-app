import {formStyles} from "../styles/formStyles";
import {Text} from "react-native";

export const ErrorMessage = ({ errorMessage }) => {
  return errorMessage && (
      <Text style={formStyles.errorText}>{errorMessage}</Text>
  );
};