import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}
interface FetchAnswerCommentsUseCaseResponse {
  answersComments: AnswerComment[]
}
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments =
      await this.answerCommentsRepository.findManyByAnswersId(answerId, {
        page,
      })

    return {
      answersComments,
    }
  }
}
