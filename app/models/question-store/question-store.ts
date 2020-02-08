import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { QuestionModel, QuestionSnapshot, Question } from "../question"
import { withEnvironment } from "../extensions"
import { GetQuestionsResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const QuestionStoreModel = types
  .model("QuestionStore")
  .props({
    questions: types.optional(types.array(QuestionModel), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveQuestions: (questionSnapshots: QuestionSnapshot[]) => {
      const questionModels: Question[] = questionSnapshots.map(c => QuestionModel.create(c)) // create model instances from the plain objects
      self.questions.replace(questionModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getQuestions: flow(function*() {
      const result: GetQuestionsResult = yield self.environment.api.getQuestions()

      if (result.kind === "ok") {
        self.saveQuestions(result.questions)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type QuestionStoreType = Instance<typeof QuestionStoreModel>
export interface QuestionStore extends QuestionStoreType {}
type QuestionStoreSnapshotType = SnapshotOut<typeof QuestionStoreModel>
export interface QuestionStoreSnapshot extends QuestionStoreSnapshotType {}
