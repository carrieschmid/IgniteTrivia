import * as React from "react"
import { observer, inject } from "mobx-react"
import { ViewStyle, View, FlatList, TextStyle } from "react-native"
import { Text } from "../../components/text/text"
import { Screen } from "../../components/screen/screen"
import { color, spacing } from "../../theme"
import { NavigationScreenProp } from "react-navigation"
import { QuestionStore } from "../../models/question-store"
import { Question } from "../../models/question"

export interface QuestionScreenProps extends NavigationScreenProp<{}> {
  questionStore: QuestionStore
}

export interface QuestionScreenState {
  refreshing: boolean
}

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  backgroundColor: color.background,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.medium,
}

const QUESTION: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  marginVertical: spacing.medium,
}

const QUESTION_WRAPPER: ViewStyle = {
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  paddingVertical: spacing.large,
}

const QUESTION_LIST: ViewStyle = {
  marginBottom: spacing.large,
}

const ANSWER: TextStyle = {
  fontSize: 12,
}

const ANSWER_WRAPPER: ViewStyle = {
  paddingVertical: spacing.small,
}

@inject("questionStore")
@observer
export class QuestionScreen extends React.Component<QuestionScreenProps, QuestionScreenState> {
  state = {
    refreshing: false,
  }

  componentDidMount() {
    this.fetchQuestions()
  }

  fetchQuestions = () => {
    this.setState({ refreshing: true })
    this.props.questionStore.getQuestions()
    this.setState({ refreshing: false })
  }

  renderQuestion = ({ item }) => {
    const question: Question = item
    return (
      <View style={QUESTION_WRAPPER}>
        <Text style={QUESTION} text={question.question} />
        <View>
          {question.allAnswers.map((a, index) => {
            return (
              <View key={index} style={ANSWER_WRAPPER}>
                <Text style={ANSWER} text={a} />
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  render() {
    const { questionStore } = this.props
    const { questions } = questionStore

    return (
      <Screen style={ROOT} preset="scroll">
        <View style={HEADER_CONTAINER}>
          <Text preset="header" tx="questionScreen.header" />
        </View>
        <FlatList
          style={QUESTION_LIST}
          data={questionStore.questions}
          renderItem={this.renderQuestion}
          extraData={{ extraDataForMobX: questions.length > 0 ? questions[0].question : "" }}
          keyExtractor={item => item.id}
          onRefresh={this.fetchQuestions}
          refreshing={this.state.refreshing}
        />
      </Screen>
    )
  }
}
