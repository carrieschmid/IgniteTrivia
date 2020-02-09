import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Text } from "../../components/text/text"
import { Screen } from "../../components/screen/screen"
import { color, spacing } from "../../theme"
import { NavigationInjectedProps } from "react-navigation"

export interface QuestionScreenProps extends NavigationInjectedProps<{}> {}

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  backgroundColor: color.background,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.medium,
}

// @inject("mobxstuff")
@observer
export class QuestionScreen extends React.Component<QuestionScreenProps, {}> {
  render() {
    return (
      <Screen style={ROOT} preset="scroll">
        <View style={HEADER_CONTAINER}>
          <Text preset="header" tx="questionScreen.header" />
        </View>
      </Screen>
    )
  }
}
