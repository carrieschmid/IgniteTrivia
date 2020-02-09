import { createStackNavigator } from "react-navigation-stack"
import { QuestionScreen } from "../screens/question-screen/question-screen"

export const PrimaryNavigator = createStackNavigator(
  {
    question: { screen: QuestionScreen },
  },
  {
    headerMode: "none",
  },
)
