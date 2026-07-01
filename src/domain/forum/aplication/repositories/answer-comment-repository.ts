import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswersId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  create(AnswerComment: AnswerComment): Promise<void>
  delete(AnswerComment: AnswerComment): Promise<void>
}
