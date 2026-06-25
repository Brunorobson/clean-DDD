import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}
interface FetchRecentQuestionsUseCaseResponse {
  question: Question[]
}
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findManyRecent({ page })

    if (!question) {
      throw new Error('Question not found.')
    }
    return {
      question,
    }
  }
}
