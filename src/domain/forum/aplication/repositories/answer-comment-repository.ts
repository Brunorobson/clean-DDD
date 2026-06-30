import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  create(AnswerComment: AnswerComment): Promise<void>
}
