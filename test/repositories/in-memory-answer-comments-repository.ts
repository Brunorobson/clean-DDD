import { AnswerCommentRepository } from '@/domain/forum/aplication/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = []

  async findById(id: string) {
    const asnwerComment = this.items.find((item) => item.id.toString() === id)

    if (!asnwerComment) {
      return null
    }
    return asnwerComment
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(asnwerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === asnwerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
